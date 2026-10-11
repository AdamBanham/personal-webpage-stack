import type { GraphNode, XYPosition } from '@vue-flow/core'

/**
 * Pure helpers for floating orthogonal (manhattan) edge routing.
 * Edges are routed between node shapes rather than fixed handles: each end docks on the
 * node outline (plus a small gap) wherever the neighbouring segment meets it.
 * A route is the full polyline: [sourceDock, ...bends, targetDock].
 */

export type Orientation = 'h' | 'v' | 'none'

export type NodeShapeKind = { kind: 'ellipse' } | { kind: 'rect', radius?: number }
export type ShapeResolver = (node: GraphNode) => NodeShapeKind

export interface Shape {
    cx: number
    cy: number
    w: number
    h: number
    outline: NodeShapeKind
}

/** distance kept between the edge end and the node outline */
export const DOCK_GAP = 6
const EPS = 0.5
const LOOP_CLEARANCE = 30
/** keeps docking away from the exact tangent where a segment would only graze the outline */
const DOCK_MARGIN = 3

export const rectShape: ShapeResolver = () => ({ kind: 'rect' })

export function shapeOfNode(node: GraphNode, resolve: ShapeResolver = rectShape): Shape {
    const { width, height } = node.dimensions
    return {
        cx: node.computedPosition.x + width / 2,
        cy: node.computedPosition.y + height / 2,
        w: width,
        h: height,
        outline: resolve(node),
    }
}

/** A zero-size shape, e.g. the pointer while a connection is being drawn. */
export function pointShape(p: XYPosition): Shape {
    return { cx: p.x, cy: p.y, w: 0, h: 0, outline: { kind: 'rect' } }
}

function same(a: XYPosition, b: XYPosition): boolean {
    return Math.abs(a.x - b.x) < EPS && Math.abs(a.y - b.y) < EPS
}

export function orientation(a: XYPosition, b: XYPosition): Orientation {
    const dx = Math.abs(a.x - b.x)
    const dy = Math.abs(a.y - b.y)
    if (dx < EPS && dy < EPS) return 'none'
    if (dy < EPS) return 'h'
    if (dx < EPS) return 'v'
    return 'none'
}

function aligned(a: XYPosition, b: XYPosition): boolean {
    return Math.abs(a.x - b.x) < EPS || Math.abs(a.y - b.y) < EPS
}

function clamp(v: number, lo: number, hi: number): number {
    return Math.min(hi, Math.max(lo, v))
}

function inside(s: Shape, p: XYPosition): boolean {
    return Math.abs(p.x - s.cx) < s.w / 2 && Math.abs(p.y - s.cy) < s.h / 2
}

/**
 * Half the shape's extent along one axis, measured at `offset` from the centre on the other axis.
 * e.g. for a horizontal line at y = cy + offset, how far left/right of cx the outline sits.
 */
function halfExtentAt(half: number, crossHalf: number, offset: number, outline: NodeShapeKind): number {
    if (half <= 0) return 0
    const t = Math.min(1, Math.abs(offset) / Math.max(crossHalf, EPS))
    if (outline.kind === 'ellipse') return half * Math.sqrt(1 - t * t)

    const r = Math.min(outline.radius ?? 0, half, crossHalf)
    const intoCorner = Math.abs(offset) - (crossHalf - r)
    if (r <= 0 || intoCorner <= 0) return half
    return half - r + Math.sqrt(Math.max(0, r * r - intoCorner * intoCorner))
}

/**
 * For a diagonal dock, whether to leave `s` horizontally (then turn into `toward`) or vertically.
 * `toward` is reached perpendicular to the segment that follows it, so it reads as a corner.
 * When what follows is diagonal too (e.g. a lone waypoint, followed by the other node), a point
 * beyond both ends on one axis sits on a crossing segment: above both nodes means a horizontal
 * run over the top, so leave vertically. Without this both ends rise to it and form a spike.
 */
function exitsHorizontally(s: Shape, toward: XYPosition, after: XYPosition): boolean {
    const next = orientation(toward, after)
    if (next !== 'none') return next === 'h'

    const beyondY = toward.y < Math.min(s.cy, after.y) || toward.y > Math.max(s.cy, after.y)
    const beyondX = toward.x < Math.min(s.cx, after.x) || toward.x > Math.max(s.cx, after.x)
    if (beyondY !== beyondX) return beyondX
    return Math.abs(toward.x - s.cx) >= Math.abs(toward.y - s.cy)
}

/**
 * Points from the outline of `s` up to (not including) `toward`, all axis aligned.
 * If `toward` lines up with the shape on one axis the edge leaves straight from that side.
 * Otherwise it leaves from a side centre and turns once, picking the exit so it meets
 * `toward` perpendicular to the segment that follows (`after`), never doubling back.
 */
function dock(s: Shape, toward: XYPosition, after: XYPosition, gap: number): XYPosition[] {
    const hw = s.w / 2
    const hh = s.h / 2
    const dx = toward.x - s.cx
    const dy = toward.y - s.cy

    if (Math.abs(dy) < hh - DOCK_MARGIN) {
        const side = Math.sign(dx) || 1
        return [{ x: s.cx + side * (halfExtentAt(hw, hh, dy, s.outline) + gap), y: toward.y }]
    }
    if (Math.abs(dx) < hw - DOCK_MARGIN) {
        const side = Math.sign(dy) || 1
        return [{ x: toward.x, y: s.cy + side * (halfExtentAt(hh, hw, dx, s.outline) + gap) }]
    }
    if (exitsHorizontally(s, toward, after)) {
        const side = Math.sign(dx) || 1
        return [{ x: s.cx + side * (hw + gap), y: s.cy }, { x: toward.x, y: s.cy }]
    }
    const side = Math.sign(dy) || 1
    return [{ x: s.cx, y: s.cy + side * (hh + gap) }, { x: s.cx, y: toward.y }]
}

/** Range along one axis a straight segment may dock within. */
function span(centre: number, size: number): [number, number] {
    if (size <= 0) return [centre, centre]
    return [centre - size / 2 + DOCK_MARGIN, centre + size / 2 - DOCK_MARGIN]
}

/** Interior bend points for an edge without user waypoints. */
export function defaultRoute(src: Shape, tgt: Shape): XYPosition[] {
    if (src.cx === tgt.cx && src.cy === tgt.cy && src.w > 0) {
        // self loop: out the right, over the top, back in on the left
        const top = src.cy - src.h / 2 - LOOP_CLEARANCE
        const right = src.cx + src.w / 2 + LOOP_CLEARANCE
        const left = src.cx - src.w / 2 - LOOP_CLEARANCE
        return [{ x: right, y: src.cy - src.h / 4 }, { x: right, y: top }, { x: left, y: top }, { x: left, y: src.cy - src.h / 4 }]
    }

    const midX = (src.cx + tgt.cx) / 2
    const midY = (src.cy + tgt.cy) / 2

    // shapes overlap on one axis: a single straight segment between them
    const [syLo, syHi] = span(src.cy, src.h)
    const [tyLo, tyHi] = span(tgt.cy, tgt.h)
    const yLo = Math.max(syLo, tyLo)
    const yHi = Math.min(syHi, tyHi)
    if (yLo <= yHi) return [{ x: midX, y: clamp(midY, yLo, yHi) }]
    const [sxLo, sxHi] = span(src.cx, src.w)
    const [txLo, txHi] = span(tgt.cx, tgt.w)
    const xLo = Math.max(sxLo, txLo)
    const xHi = Math.min(sxHi, txHi)
    if (xLo <= xHi) return [{ x: clamp(midX, xLo, xHi), y: midY }]

    return Math.abs(tgt.cx - src.cx) >= Math.abs(tgt.cy - src.cy)
        ? [{ x: midX, y: src.cy }, { x: midX, y: tgt.cy }]
        : [{ x: src.cx, y: midY }, { x: tgt.cx, y: midY }]
}

/** Inserts a corner wherever two consecutive points are not axis aligned, alternating orientation. */
export function orthogonalize(points: XYPosition[]): XYPosition[] {
    if (points.length < 2) return points.slice()
    const out: XYPosition[] = [points[0]]
    for (let i = 1; i < points.length; i++) {
        const b = points[i]
        const a = out[out.length - 1]
        if (!aligned(a, b)) {
            const horizontalFirst = out.length < 2 || orientation(out[out.length - 2], a) !== 'h'
            out.push(horizontalFirst ? { x: b.x, y: a.y } : { x: a.x, y: b.y })
        }
        out.push(b)
    }
    return out
}

/** Drops consecutive duplicate points. Keeps collinear points (user bendpoints). */
export function dedupe(points: XYPosition[]): XYPosition[] {
    const out: XYPosition[] = []
    for (const p of points) {
        if (!out.length || !same(out[out.length - 1], p)) out.push(p)
    }
    return out
}

/** Drops duplicates and collinear middle points, keeping the endpoints. */
export function simplify(points: XYPosition[]): XYPosition[] {
    const pts = dedupe(points)
    if (pts.length < 3) return pts
    const out: XYPosition[] = [pts[0]]
    for (let i = 1; i < pts.length - 1; i++) {
        const a = out[out.length - 1]
        const b = pts[i]
        const c = pts[i + 1]
        const collinear = (Math.abs(a.x - b.x) < EPS && Math.abs(b.x - c.x) < EPS)
            || (Math.abs(a.y - b.y) < EPS && Math.abs(b.y - c.y) < EPS)
        if (!collinear) out.push(b)
    }
    out.push(pts[pts.length - 1])
    return out
}

/**
 * Full route for rendering. Stored waypoints are kept as-is (only repaired), so a
 * user bendpoint on a straight run survives; the default route is simplified.
 */
export function buildRoute(src: Shape, tgt: Shape, waypoints: XYPosition[] = [], gap = DOCK_GAP): XYPosition[] {
    // bends swallowed by a node would make the edge double back across it
    let interior = waypoints.filter((p) => !inside(src, p) && !inside(tgt, p))
    const custom = interior.length > 0
    if (!custom) interior = defaultRoute(src, tgt)

    const last = interior.length - 1
    const start = dock(src, interior[0], interior[1] ?? { x: tgt.cx, y: tgt.cy }, gap)
    const end = dock(tgt, interior[last], interior[last - 1] ?? { x: src.cx, y: src.cy }, tgt.w > 0 ? gap : 0).reverse()
    const route = dedupe(orthogonalize([...start, ...interior, ...end]))
    return custom ? route : simplify(route)
}

/** SVG path with lightly rounded corners. */
export function toSvgPath(points: XYPosition[], radius = 4): string {
    if (!points.length) return ''
    let d = `M${points[0].x},${points[0].y}`
    for (let i = 1; i < points.length - 1; i++) {
        const a = points[i - 1]
        const b = points[i]
        const c = points[i + 1]
        const lenIn = Math.hypot(b.x - a.x, b.y - a.y)
        const lenOut = Math.hypot(c.x - b.x, c.y - b.y)
        const r = Math.min(radius, lenIn / 2, lenOut / 2)
        if (r < EPS || orientation(a, b) === orientation(b, c)) {
            d += ` L${b.x},${b.y}`
            continue
        }
        const inX = b.x - ((b.x - a.x) / lenIn) * r
        const inY = b.y - ((b.y - a.y) / lenIn) * r
        const outX = b.x + ((c.x - b.x) / lenOut) * r
        const outY = b.y + ((c.y - b.y) / lenOut) * r
        d += ` L${inX},${inY} Q${b.x},${b.y} ${outX},${outY}`
    }
    const end = points[points.length - 1]
    return `${d} L${end.x},${end.y}`
}

export interface SegmentHit {
    index: number
    orientation: Orientation
    projected: XYPosition
    distance: number
}

/** Segment `index` runs from points[index] to points[index + 1]. */
export function nearestSegment(points: XYPosition[], p: XYPosition): SegmentHit | null {
    let best: SegmentHit | null = null
    for (let i = 0; i < points.length - 1; i++) {
        const a = points[i]
        const b = points[i + 1]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const lenSq = dx * dx + dy * dy
        const t = lenSq === 0 ? 0 : clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq, 0, 1)
        const projected = { x: a.x + t * dx, y: a.y + t * dy }
        const distance = Math.hypot(p.x - projected.x, p.y - projected.y)
        if (!best || distance < best.distance) {
            best = { index: i, orientation: orientation(a, b), projected, distance }
        }
    }
    return best
}

export function midpoint(a: XYPosition, b: XYPosition): XYPosition {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

/** Snaps `value` to the closest candidate within `threshold`. */
export function snapValue(value: number, candidates: number[], threshold: number): number {
    let best = value
    let bestDist = threshold
    for (const c of candidates) {
        const d = Math.abs(c - value)
        if (d <= bestDist) {
            best = c
            bestDist = d
        }
    }
    return best
}
