import { useVueFlow, type Edge, type GraphNode, type Node, type XYPosition } from '@vue-flow/core'
import useIdentities from './useIdentities'
import useFiring, { arcWeight, randomTokenPosition } from './useFiring'
import useLayout from '../../base/js/useLayout'
import useNodeDefaults from './useNodeDefaults'
import { nextTick } from 'vue'

/**
 * Import and export of the editor's net as PNML (ISO/IEC 15909-2).
 *
 * The structure follows the core model (https://www.pnml.org/version-2009/grammar/pnmlcoremodel.rng):
 * places, transitions and arcs with names and graphics. Tokens and arc weights are not part of the
 * core model, so a net that has either is written as a P/T net, whose grammar adds `initialMarking`
 * and `inscription` on top of the core model. Both are read back on import, whatever the net's type.
 */

export const PNML_NAMESPACE = 'http://www.pnml.org/version-2009/grammar/pnml'
export const PNML_CORE_TYPE = 'http://www.pnml.org/version-2009/grammar/pnmlcoremodel'
export const PNML_PTNET_TYPE = 'http://www.pnml.org/version-2009/grammar/ptnet'

// rendered sizes of PlaceNode and TransitionNode, used before the nodes have been measured
const NODE_SIZE = {
    place: { width: 35, height: 35 },
    transition: { width: 50, height: 50 },
} as const

type NetNodeType = keyof typeof NODE_SIZE

export interface PnmlExportOptions {
    /** written as the net's id and name */
    name?: string
}

export interface PnmlImportResult {
    places: number
    transitions: number
    arcs: number
    tokens: number
    /** arcs left out: unknown ends, or joining two nodes of the same kind */
    skippedArcs: number
}

export class PnmlError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'PnmlError'
    }
}

const XML_ESCAPES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
}

const escapeXml = (text: string) => text.replace(/[&<>"']/g, (c) => XML_ESCAPES[c])

/** PNML positions are decimals; two places is plenty for screen coordinates */
const num = (value: number) => String(Math.round(value * 100) / 100)

/** `<text>` labels: a node's name, a place's marking, an arc's inscription */
const textLabel = (tag: string, text: string, indent: string) =>
    `${indent}<${tag}>\n${indent}  <text>${escapeXml(text)}</text>\n${indent}</${tag}>`

// --- reading helpers; matched on local names so files with or without the PNML namespace both load

const childrenNamed = (el: Element, name: string) => Array.from(el.children).filter((c) => c.localName === name)

const childNamed = (el: Element, name: string) => childrenNamed(el, name)[0]

/** the `<text>` of a label element such as `<name>` or `<initialMarking>` */
function labelText(el: Element, label: string): string | undefined {
    const text = childNamed(el, label) && childNamed(childNamed(el, label), 'text')
    return text?.textContent?.trim()
}

function readPoint(el: Element | undefined): XYPosition | undefined {
    const x = parseFloat(el?.getAttribute('x') ?? '')
    const y = parseFloat(el?.getAttribute('y') ?? '')
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : undefined
}

function readCount(el: Element, label: string, fallback: number): number {
    const value = parseInt(labelText(el, label) ?? '', 10)
    return Number.isFinite(value) && value >= 0 ? value : fallback
}

/** every element of a kind on a page and its sub-pages, in document order */
function collect(page: Element, name: string): Element[] {
    return Array.from(page.children).flatMap((c) =>
        c.localName === name ? [c] : c.localName === 'page' ? collect(c, name) : [],
    )
}

/**
 * Exports the current net to PNML, and replaces it with a net read from PNML.
 * Call from inside the editor (or with its flow id) so it acts on the same flow.
 */
export default function usePnml(flowId: string) {
    const { getNodes, getEdges, setNodes, setEdges, addNodes, addEdges, onNodesInitialized } = useVueFlow(flowId)
    const { resetIdentities, getNext } = useIdentities()
    const { clearHistory, isFiring } = useFiring(flowId)
    const { fitAll } = useLayout(flowId)
    const { defaultDataFor } = useNodeDefaults()

    const sizeOf = (node: GraphNode) =>
        node.dimensions.width && node.dimensions.height ? node.dimensions : NODE_SIZE[node.type as NetNodeType]

    const tokensIn = (placeId: string) => getNodes.value.filter((n) => n.type === 'token' && n.parentNode === placeId).length

    // ------------------------------------------------------------------ export

    /** PNML positions a node by its centre */
    function nodeGraphics(node: GraphNode, indent: string): string {
        const { width, height } = sizeOf(node)
        const { x, y } = node.computedPosition
        return [
            `${indent}<graphics>`,
            `${indent}  <position x="${num(x + width / 2)}" y="${num(y + height / 2)}"/>`,
            `${indent}  <dimension x="${num(width)}" y="${num(height)}"/>`,
            `${indent}</graphics>`,
        ].join('\n')
    }

    function serialiseNode(node: GraphNode, indent: string): string {
        const tag = node.type as NetNodeType
        const inner = indent + '  '
        const parts = [
            `${indent}<${tag} id="${escapeXml(node.id)}">`,
            textLabel('name', String(node.data?.label ?? node.id), inner),
            nodeGraphics(node, inner),
        ]
        if (tag === 'place') {
            const tokens = tokensIn(node.id)
            if (tokens > 0) parts.push(textLabel('initialMarking', String(tokens), inner))
        }
        parts.push(`${indent}</${tag}>`)
        return parts.join('\n')
    }

    function serialiseArc(edge: Edge, indent: string): string {
        const inner = indent + '  '
        const waypoints = (edge.data?.waypoints as XYPosition[] | undefined) ?? []
        const parts = [`${indent}<arc id="${escapeXml(edge.id)}" source="${escapeXml(edge.source)}" target="${escapeXml(edge.target)}">`]
        if (waypoints.length) {
            parts.push(
                `${inner}<graphics>`,
                ...waypoints.map((p) => `${inner}  <position x="${num(p.x)}" y="${num(p.y)}"/>`),
                `${inner}</graphics>`,
            )
        }
        const weight = arcWeight(edge)
        if (weight !== 1) parts.push(textLabel('inscription', String(weight), inner))
        if (parts.length === 1) return parts[0].replace(/>$/, '/>')
        parts.push(`${indent}</arc>`)
        return parts.join('\n')
    }

    /** The current net as a PNML document. */
    function exportPnml(options: PnmlExportOptions = {}): string {
        const name = options.name ?? 'Generated by Petri Net Editor'
        const places = getNodes.value.filter((n) => n.type === 'place')
        const transitions = getNodes.value.filter((n) => n.type === 'transition')
        const netIds = new Set([...places, ...transitions].map((n) => n.id))
        // arcs only join places and transitions
        const arcs = getEdges.value.filter((e) => netIds.has(e.source) && netIds.has(e.target))

        const isPtNet = places.some((p) => tokensIn(p.id) > 0) || arcs.some((e) => arcWeight(e) !== 1)
        const indent = '      '

        return [
            '<?xml version="1.0" encoding="UTF-8"?>',
            `<pnml xmlns="${PNML_NAMESPACE}">`,
            `  <net id="net-1" type="${isPtNet ? PNML_PTNET_TYPE : PNML_CORE_TYPE}">`,
            textLabel('name', name, '    '),
            '    <page id="page-1">',
            ...places.map((n) => serialiseNode(n, indent)),
            ...transitions.map((n) => serialiseNode(n, indent)),
            ...arcs.map((e) => serialiseArc(e, indent)),
            '    </page>',
            '  </net>',
            '</pnml>',
            '',
        ].join('\n')
    }

    /** Saves the current net as a `.pnml` file through the browser. */
    function downloadPnml(filename = 'petri_net.pnml', options: PnmlExportOptions = {}) {
        const blob = new Blob([exportPnml(options)], { type: 'application/xml' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename.endsWith('.pnml') ? filename : `${filename}.pnml`
        a.click()
        URL.revokeObjectURL(url)
        a.remove()
    }

    // ------------------------------------------------------------------ import

    function parse(text: string): Element {
        const doc = new DOMParser().parseFromString(text, 'application/xml')
        const error = doc.getElementsByTagName('parsererror')[0]
        if (error) throw new PnmlError(`Failed to parse XML: ${error.textContent?.trim()}`)
        if (doc.documentElement.localName !== 'pnml') throw new PnmlError('Not a PNML document: the root element is not <pnml>')

        const net = childNamed(doc.documentElement, 'net')
        if (!net) throw new PnmlError('The PNML document holds no <net>')
        return net
    }

    /**
     * Replaces the current net with the first net of a PNML document. Nodes are given fresh editor
     * identities, keeping the document's names as labels. Rejects while a transition is firing.
     */
    async function importPnml(text: string): Promise<PnmlImportResult> {
        if (isFiring.value) throw new PnmlError('Cannot import while a transition is firing')
        const net = parse(text)
        const pages = childrenNamed(net, 'page')

        // document id -> editor id; reference nodes resolve to the node they stand for
        const ids = new Map<string, string>()
        const kinds = new Map<string, NetNodeType>()
        const nodes: Node[] = []
        const tokens: Node[] = []
        const bounds = new Map<string, { x: number, y: number, width: number, height: number }>()

        // clear the flow before any new identities are handed out, so nothing of the old net
        // (or a late change handler freeing its identities) can collide with the imported one
        clearHistory()
        setEdges([])
        setNodes([])
        resetIdentities()
        // let the old nodes unmount: the new net reuses their ids, so in the same tick vue would patch
        // their elements in place, the resize observer would never fire and the new nodes would
        // stay unmeasured (0x0), docking every arc onto a node's top-left corner
        await nextTick()

        let fallback = 0
        for (const type of ['place', 'transition'] as const) {
            for (const el of pages.flatMap((p) => collect(p, type))) {
                const docId = el.getAttribute('id')
                if (!docId) continue

                const id = getNext(type)
                const graphics = childNamed(el, 'graphics')
                const dimension = graphics && readPoint(childNamed(graphics, 'dimension'))
                const size = NODE_SIZE[type]
                const centre = (graphics && readPoint(childNamed(graphics, 'position')))
                    // no layout in the file: lay out a row, the user can run a layout afterwards
                    ?? { x: 100 * ++fallback, y: type === 'place' ? 0 : 100 }
                const position = { x: centre.x - size.width / 2, y: centre.y - size.height / 2 }

                ids.set(docId, id)
                kinds.set(docId, type)
                // the file's own node size is what its arc bend points were drawn around
                const width = dimension?.x ?? size.width
                const height = dimension?.y ?? size.height
                bounds.set(id, { x: centre.x - width / 2, y: centre.y - height / 2, width, height })
                nodes.push({ id, type, position, data: { ...defaultDataFor(type), label: labelText(el, 'name') ?? docId } })

                if (type === 'place') {
                    const count = readCount(el, 'initialMarking', 0)
                    for (let i = 0; i < count; i++) {
                        tokens.push({
                            id: getNext('token'),
                            type: 'token',
                            parentNode: id,
                            extent: 'parent',
                            position: randomTokenPosition({ dimensions: size } as GraphNode),
                        })
                    }
                }
            }
        }

        for (const type of ['place', 'transition'] as const) {
            const tag = type === 'place' ? 'referencePlace' : 'referenceTransition'
            const refs = pages.flatMap((p) => collect(p, tag))
            // a reference may point at another reference, so resolve until nothing changes
            let resolved = true
            while (resolved) {
                resolved = false
                for (const el of refs) {
                    const docId = el.getAttribute('id')
                    const target = ids.get(el.getAttribute('ref') ?? '')
                    if (docId && target && !ids.has(docId)) {
                        ids.set(docId, target)
                        kinds.set(docId, type)
                        resolved = true
                    }
                }
            }
        }

        // bend points drawn inside either end are the old exporter's docked ends, not bends
        const inside = (p: XYPosition, id: string) => {
            const b = bounds.get(id)!
            return p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height
        }

        const edges: Edge[] = []
        let skippedArcs = 0
        for (const el of pages.flatMap((p) => collect(p, 'arc'))) {
            const src = el.getAttribute('source') ?? ''
            const tgt = el.getAttribute('target') ?? ''
            const source = ids.get(src)
            const target = ids.get(tgt)
            if (!source || !target || kinds.get(src) === kinds.get(tgt)) {
                skippedArcs++
                continue
            }

            const graphics = childNamed(el, 'graphics')
            const waypoints = (graphics ? childrenNamed(graphics, 'position') : [])
                .map(readPoint)
                .filter((p): p is XYPosition => !!p && !inside(p, source) && !inside(p, target))
            const weight = Math.max(readCount(el, 'inscription', 1), 1)

            edges.push({
                id: `e${source}-${target}-${edges.length}`,
                type: 'arc',
                source,
                target,
                data: weight === 1 ? { waypoints } : { waypoints, weight },
            })
        }

        // nodes and edges go in through add* so the editor's change handlers see them
        addNodes([...nodes, ...tokens])
        addEdges(edges)

        const { off } = onNodesInitialized(() => {
            off()
            fitAll()
        })

        return {
            places: nodes.filter((n) => n.type === 'place').length,
            transitions: nodes.filter((n) => n.type === 'transition').length,
            arcs: edges.length,
            tokens: tokens.length,
            skippedArcs,
        }
    }

    /** Asks the user for a `.pnml` file and imports it; resolves to null if none was chosen. */
    function openPnml(): Promise<PnmlImportResult | null> {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.pnml,.xml,application/xml,text/xml'
            input.addEventListener('change', async () => {
                const file = input.files?.[0]
                if (!file) return resolve(null)
                try {
                    resolve(await importPnml(await file.text()))
                } catch (error) {
                    reject(error)
                }
            })
            input.addEventListener('cancel', () => resolve(null))
            input.click()
        })
    }

    return {
        exportPnml,
        downloadPnml,
        importPnml,
        openPnml,
    }
}
