import { useVueFlow, type GraphNode, type XYPosition } from '@vue-flow/core'
import type { ELK, ElkExtendedEdge, ElkNode, LayoutOptions } from 'elkjs/lib/elk-api'
import { nextTick, ref } from 'vue'

export type LayoutDirection = 'RIGHT' | 'DOWN' | 'LEFT' | 'UP'

/**
 * What to do with edges' `data.waypoints` after a layout:
 *  - `clear`: drop them, so edges fall back to their default orthogonal route;
 *  - `elk`: replace them with the bend points ELK routed;
 *  - `keep`: leave them alone (they will likely be stale).
 */
export type WaypointMode = 'clear' | 'elk' | 'keep'

export interface LayoutConfig {
    direction?: LayoutDirection
    /** gap between nodes in the same layer */
    nodeSpacing?: number
    /** gap between consecutive layers */
    layerSpacing?: number
    waypoints?: WaypointMode
    /** fit everything into view once the nodes have moved */
    fit?: boolean
    /** extra ELK options, applied over the defaults */
    elkOptions?: LayoutOptions
}

export interface FitConfig {
    padding?: number
    duration?: number
}

export interface FocusConfig {
    /** defaults to the current zoom */
    zoom?: number
    duration?: number
    select?: boolean
}

const DEFAULT_LAYOUT: Required<Omit<LayoutConfig, 'elkOptions'>> = {
    direction: 'RIGHT',
    nodeSpacing: 40,
    layerSpacing: 80,
    waypoints: 'clear',
    fit: true,
}

const DEFAULT_FIT: Required<FitConfig> = { padding: 0.2, duration: 300 }

// elkjs is large; load it on first layout so it stays out of the main bundle (and SSG)
let elkInstance: Promise<ELK> | null = null
function getElk(): Promise<ELK> {
    elkInstance ??= import('elkjs/lib/elk.bundled.js').then(({ default: ELKConstructor }) => new ELKConstructor())
    return elkInstance
}

function centreOf(node: GraphNode): XYPosition {
    return {
        x: node.computedPosition.x + node.dimensions.width / 2,
        y: node.computedPosition.y + node.dimensions.height / 2,
    }
}

/**
 * Viewport fitting and automatic layout for a vue-flow editor.
 * Only top-level nodes are laid out; children (`parentNode`) move with their parent,
 * and edges touching a child are treated as touching its top-level ancestor.
 */
export default function useLayout(flowId: string) {
    const { findNode, getNodes, getEdges, updateNode, updateEdgeData, setCenter, fitView, addSelectedNodes, removeSelectedNodes, viewport } = useVueFlow(flowId)

    const isLayingOut = ref(false)

    function rootOf(id: string): GraphNode | undefined {
        let node = findNode(id)
        while (node?.parentNode) {
            node = findNode(node.parentNode)
        }
        return node
    }

    /** Fits every node into the viewport. */
    async function fitAll(config: FitConfig = {}) {
        const { padding, duration } = { ...DEFAULT_FIT, ...config }
        await fitView({ padding, duration })
    }

    /** Fits only the given nodes into the viewport. */
    async function fitNodes(ids: string[], config: FitConfig = {}) {
        const { padding, duration } = { ...DEFAULT_FIT, ...config }
        await fitView({ nodes: ids, padding, duration })
    }

    /** Centres the viewport on a node; returns false when the node does not exist. */
    async function focusNode(id: string, config: FocusConfig = {}): Promise<boolean> {
        const node = findNode(id)
        if (!node) return false

        const { x, y } = centreOf(node)
        await setCenter(x, y, {
            zoom: config.zoom ?? viewport.value.zoom,
            duration: config.duration ?? DEFAULT_FIT.duration,
        })

        if (config.select) {
            removeSelectedNodes(getNodes.value.filter((n) => n.selected))
            addSelectedNodes([node])
        }
        return true
    }

    function buildGraph(config: Required<Omit<LayoutConfig, 'elkOptions'>>, elkOptions: LayoutOptions = {}): ElkNode {
        const roots = getNodes.value.filter((n) => !n.parentNode)

        const edges: ElkExtendedEdge[] = []
        for (const edge of getEdges.value) {
            const source = rootOf(edge.source)
            const target = rootOf(edge.target)
            // edges inside a single block do not affect the layout
            if (!source || !target || source.id === target.id) continue
            edges.push({ id: edge.id, sources: [source.id], targets: [target.id] })
        }

        return {
            id: '__root__',
            layoutOptions: {
                'elk.algorithm': 'layered',
                'elk.direction': config.direction,
                'elk.edgeRouting': 'ORTHOGONAL',
                'elk.spacing.nodeNode': String(config.nodeSpacing),
                'elk.layered.spacing.nodeNodeBetweenLayers': String(config.layerSpacing),
                'elk.spacing.edgeNode': String(config.nodeSpacing / 2),
                'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
                'elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
                'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
                'elk.separateConnectedComponents': 'true',
                ...elkOptions,
            },
            children: roots.map((n) => ({
                id: n.id,
                width: n.dimensions.width,
                height: n.dimensions.height,
            })),
            edges,
        }
    }

    /**
     * Lays the top-level nodes out into aligned layers (blocks) using ELK's layered algorithm.
     * Nodes must have been measured, i.e. call this after `onNodesInitialized`.
     */
    async function layout(config: LayoutConfig = {}) {
        if (isLayingOut.value) return
        const { elkOptions, ...rest } = config
        const options = { ...DEFAULT_LAYOUT, ...rest }

        isLayingOut.value = true
        try {
            const elk = await getElk()
            const result = await elk.layout(buildGraph(options, elkOptions))

            for (const child of result.children ?? []) {
                updateNode(child.id, { position: { x: child.x ?? 0, y: child.y ?? 0 } })
            }

            if (options.waypoints !== 'keep') {
                const routed = new Map((result.edges ?? []).map((e) => [e.id, e]))
                for (const edge of getEdges.value) {
                    if (options.waypoints === 'elk' && routed.has(edge.id)) {
                        // single-section edges only, which is all a flat layered layout produces
                        const bends = routed.get(edge.id)!.sections?.[0]?.bendPoints ?? []
                        updateEdgeData(edge.id, { waypoints: bends.map(({ x, y }) => ({ x, y })) })
                    } else if (edge.data?.waypoints) {
                        updateEdgeData(edge.id, { waypoints: undefined })
                    }
                }
            }

            if (options.fit) {
                // let vue-flow recompute positions before measuring the bounds
                await nextTick()
                await fitAll()
            }
        } finally {
            isLayingOut.value = false
        }
    }

    return {
        isLayingOut,
        layout,
        fitAll,
        fitNodes,
        focusNode,
    }
}
