import { useVueFlow, type EdgeProps, type XYPosition } from '@vue-flow/core'
import { shallowRef, type ComputedRef } from 'vue'
import {
    dedupe, midpoint, nearestSegment, orientation, simplify, snapValue, type Orientation,
} from './orthogonalRouting'
import useHelperLineState from './helperLineState'

export interface ArcData {
    waypoints?: XYPosition[]
}

export interface SegmentGrip {
    index: number
    orientation: Exclude<Orientation, 'none'>
    at: XYPosition
}

interface DragSession {
    /** returns the edge's interior waypoints; the docked ends are rebuilt from them */
    update: (current: XYPosition, start: XYPosition) => XYPosition[]
}

const SNAP_PX = 8
const PATH_DRAG_THRESHOLD_PX = 3

/**
 * Interactive editing of an orthogonal edge's bendpoints.
 * `route` is the rendered polyline (docked ends included); `build` turns interior waypoints into one.
 * While dragging, the edge renders from a local `draft` of waypoints so the store is only written once on release.
 * The ends are re-docked from the waypoints every frame, so they slide around the node outlines.
 */
export default function useEdgeWaypoints(
    props: EdgeProps<ArcData>,
    route: ComputedRef<XYPosition[]>,
    build: (waypoints: XYPosition[]) => XYPosition[],
) {
    const { id: flowId, screenToFlowCoordinate, updateEdgeData, viewport, nodes, edges } = useVueFlow()
    const guides = useHelperLineState(flowId)

    const draft = shallowRef<XYPosition[] | null>(null)
    /** Segment mover: shown under the pointer while hovering or dragging a segment. */
    const grip = shallowRef<SegmentGrip | null>(null)
    let dragging = false

    function copyRoute(): XYPosition[] {
        return route.value.map((p) => ({ ...p }))
    }

    function snapThreshold(): number {
        return SNAP_PX / viewport.value.zoom
    }

    /** Alignment targets outside this edge: node centres and other edges' waypoints. */
    function externalTargets(): XYPosition[] {
        const centres = nodes.value.map((n) => ({
            x: n.computedPosition.x + n.dimensions.width / 2,
            y: n.computedPosition.y + n.dimensions.height / 2,
        }))
        const waypoints = edges.value
            .filter((e) => e.id !== props.id)
            .flatMap((e) => (e.data?.waypoints as XYPosition[] | undefined) ?? [])
        return [...centres, ...waypoints]
    }

    /** Snaps one axis and shows the matching helper line when it lands on a target. */
    function snapAxis(raw: number, axis: 'x' | 'y', candidates: number[]): number {
        const value = snapValue(raw, candidates, snapThreshold())
        const guide = value !== raw ? value : undefined
        if (axis === 'x') guides.vertical.value = guide
        else guides.horizontal.value = guide
        return value
    }

    function clearGuides() {
        guides.horizontal.value = undefined
        guides.vertical.value = undefined
    }

    function commit(waypoints: XYPosition[], keepCollinear = false) {
        let cleaned = dedupe(waypoints)
        if (!keepCollinear) {
            const route = simplify(build(waypoints))
            // a straight run slid off its default position still needs one point to hold it there
            cleaned = route.length > 2 || !waypoints.length ? route.slice(1, -1) : [midpoint(route[0], route[1])]
        }
        updateEdgeData<ArcData>(props.id, { waypoints: cleaned.map((p) => ({ x: p.x, y: p.y })) })
    }

    function toFlow(evt: PointerEvent | MouseEvent): XYPosition {
        return screenToFlowCoordinate({ x: evt.clientX, y: evt.clientY })
    }

    /** Window-level drag loop, coalesced to one draft update per animation frame. */
    function beginDrag(evt: PointerEvent, prepare: () => DragSession | null, threshold = 0) {
        if (evt.button !== 0) return
        evt.stopPropagation()
        dragging = true

        const startScreen = { x: evt.clientX, y: evt.clientY }
        const start = toFlow(evt)
        let session: DragSession | null = null
        let latest: PointerEvent | null = null
        let frame = 0

        const flush = () => {
            frame = 0
            if (session && latest) draft.value = session.update(toFlow(latest), start)
        }
        const onMove = (e: PointerEvent) => {
            if (!session) {
                if (Math.hypot(e.clientX - startScreen.x, e.clientY - startScreen.y) < threshold) return
                session = prepare()
                if (!session) return cleanup()
            }
            latest = e
            if (!frame) frame = requestAnimationFrame(flush)
        }
        const onUp = (e: PointerEvent) => {
            cleanup()
            if (session) {
                latest = e
                flush()
                if (draft.value) commit(draft.value)
            }
            draft.value = null
            grip.value = null
            dragging = false
            clearGuides()
        }
        const cleanup = () => {
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointercancel', onUp)
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onUp)
    }

    /** Shifts segment `index` perpendicular to its direction; neighbours stretch to follow. */
    function segmentSession(index: number): DragSession | null {
        const pts = copyRoute()
        const axis = orientation(pts[index], pts[index + 1])
        if (axis === 'none') return null

        // route[k] is waypoint k - 1; docked ends aren't waypoints and simply follow
        let waypoints = pts.slice(1, -1)
        let moved = [index - 1, index].filter((k) => k >= 0 && k < waypoints.length)
        if (!moved.length) {
            // a single straight segment: give it a waypoint so it can slide
            waypoints = [midpoint(pts[0], pts[1])]
            moved = [0]
        }

        const key = axis === 'h' ? 'y' : 'x'
        const along = axis === 'h' ? 'x' : 'y'
        const base = pts[index][key]
        const candidates = [...pts.filter((_, k) => k !== index && k !== index + 1), ...externalTargets()].map((p) => p[key])
        const lo = Math.min(pts[index][along], pts[index + 1][along])
        const hi = Math.max(pts[index][along], pts[index + 1][along])

        return {
            update(current, start) {
                const value = snapAxis(base + current[key] - start[key], key, candidates)
                const next = waypoints.map((p) => ({ ...p }))
                for (const k of moved) next[k][key] = value
                const slide = Math.min(hi, Math.max(lo, current[along]))
                grip.value = { index, orientation: axis, at: axis === 'h' ? { x: slide, y: value } : { x: value, y: slide } }
                return next
            },
        }
    }

    /** Moves a bendpoint; at a corner both adjacent segments follow it. */
    function bendSession(index: number): DragSession | null {
        const pts = copyRoute()
        const last = pts.length - 1
        if (index <= 0 || index >= last) return null

        const inAxis = orientation(pts[index - 1], pts[index])
        const outAxis = orientation(pts[index], pts[index + 1])
        const isCorner = inAxis !== 'none' && outAxis !== 'none' && inAxis !== outAxis
        const others = [...pts.filter((_, k) => k !== index), ...externalTargets()]
        const xs = others.map((p) => p.x)
        const ys = others.map((p) => p.y)

        return {
            update(current, start) {
                const p = {
                    x: snapAxis(pts[index].x + current.x - start.x, 'x', xs),
                    y: snapAxis(pts[index].y + current.y - start.y, 'y', ys),
                }
                const next = pts.map((q) => ({ ...q }))
                next[index] = p
                if (isCorner) {
                    for (const [n, axis] of [[index - 1, inAxis], [index + 1, outAxis]] as const) {
                        if (n === 0 || n === last) continue
                        if (axis === 'h') next[n].y = p.y
                        else next[n].x = p.x
                    }
                }
                return next.slice(1, -1)
            },
        }
    }

    function startBendDrag(index: number, evt: PointerEvent) {
        beginDrag(evt, () => bendSession(index))
    }

    /** Dragging anywhere on the edge path shifts the segment under the pointer. */
    function onPathPointerDown(evt: PointerEvent) {
        const hit = nearestSegment(route.value, toFlow(evt))
        if (!hit) return
        beginDrag(evt, () => segmentSession(hit.index), PATH_DRAG_THRESHOLD_PX)
    }

    /** Keeps the segment mover under the pointer while hovering the path. */
    function onPathPointerMove(evt: PointerEvent) {
        if (dragging) return
        const hit = nearestSegment(route.value, toFlow(evt))
        grip.value = hit && hit.orientation !== 'none'
            ? { index: hit.index, orientation: hit.orientation, at: hit.projected }
            : null
    }

    function onPathPointerLeave() {
        if (!dragging) grip.value = null
    }

    function insertBendpoint(evt: MouseEvent) {
        const hit = nearestSegment(route.value, toFlow(evt))
        if (!hit) return
        const pts = copyRoute()
        pts.splice(hit.index + 1, 0, hit.projected)
        commit(pts.slice(1, -1), true)
    }

    function removeBendpoint(index: number) {
        const pts = copyRoute()
        if (index <= 0 || index >= pts.length - 1) return
        const [removed] = pts.splice(index, 1)
        const a = pts[index - 1]
        const b = pts[index]
        if (orientation(a, b) === 'none' && (a.x !== b.x || a.y !== b.y)) {
            // reconnect through the opposite corner, otherwise orthogonalize would recreate the removed one
            const c1 = { x: a.x, y: b.y }
            const c2 = { x: b.x, y: a.y }
            const reuse = c1.x === removed.x && c1.y === removed.y
            pts.splice(index, 0, reuse ? c2 : c1)
        }
        commit(pts.slice(1, -1))
    }

    return {
        draft, grip,
        startBendDrag, onPathPointerDown, onPathPointerMove, onPathPointerLeave, insertBendpoint, removeBendpoint,
    }
}
