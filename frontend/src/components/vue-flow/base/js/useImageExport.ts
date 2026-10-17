import { useVueFlow } from '@vue-flow/core'
import { toPng, toSvg } from 'html-to-image'
import { nextTick, ref } from 'vue'

/**
 * Export of the flow's nodes and edges as an image, as they are rendered on the canvas.
 *
 * Only the transformation pane is captured, so the background, controls and panels (all siblings
 * of the pane) are left out. The pane is re-rendered at zoom 1 and cropped to the drawing, whatever
 * the current viewport. The image has a transparent background.
 */

export type ImageFormat = 'png' | 'svg'

export interface ImageExportOptions {
    /** the extension is added when missing */
    filename?: string
    /** space around the drawing, in flow units */
    padding?: number
    /** png only: output pixels per flow unit */
    pixelRatio?: number
}

// editing chrome that lives among the nodes and edges but is not part of the drawing
const EXCLUDED_CLASSES = [
    'vue-flow__handle',
    'vue-flow__node-toolbar',
    'vue-flow__edge-interaction',
    'orthogonal-edge-grip',
    'orthogonal-edge-bend',
    'firing-token',
]
const EXCLUDED_SELECTOR = EXCLUDED_CLASSES.map((c) => `.${c}`).join(',')

// html-to-image also hands text nodes to the filter, which have no classList
const keep = (node: HTMLElement) => !EXCLUDED_CLASSES.some((c) => node.classList?.contains(c))

const SVG_STYLE_PROPERTIES = [
    'fill', 'fill-opacity', 'fill-rule',
    'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'stroke-dashoffset',
    'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
    'opacity', 'visibility',
]

/**
 * html-to-image copies an `<svg>` whole without walking into it, so the elements inside keep their
 * attributes but lose whatever stylesheets gave them (an arc's stroke, for one). Writes their computed
 * paint inline for the capture; the returned function puts the original inline styles back.
 */
function inlineSvgStyles(pane: HTMLElement) {
    const restore: (() => void)[] = []
    for (const el of pane.querySelectorAll<SVGElement>('svg *')) {
        // marker definitions are not rendered in place and carry their own paint
        if (el.closest('defs, marker')) continue
        const computed = getComputedStyle(el)
        const original = el.getAttribute('style')
        for (const name of SVG_STYLE_PROPERTIES) {
            el.style.setProperty(name, computed.getPropertyValue(name))
        }
        restore.push(() => original === null ? el.removeAttribute('style') : el.setAttribute('style', original))
    }
    return () => restore.forEach((r) => r())
}

/** the drawing's bounds in flow coordinates, measured from the dom so overflowing labels and arc bends count */
function drawingBounds(pane: HTMLElement, zoom: number) {
    // the pane is transformed from its top-left corner, so its client rect starts at the flow origin
    const origin = pane.getBoundingClientRect()
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    for (const el of pane.querySelectorAll('.vue-flow__node, .vue-flow__node *, .vue-flow__edge-path')) {
        if (el.closest(EXCLUDED_SELECTOR)) continue
        const r = el.getBoundingClientRect()
        if (!r.width && !r.height) continue
        minX = Math.min(minX, r.left)
        minY = Math.min(minY, r.top)
        maxX = Math.max(maxX, r.right)
        maxY = Math.max(maxY, r.bottom)
    }
    if (minX === Infinity) return null

    return {
        x: (minX - origin.left) / zoom,
        y: (minY - origin.top) / zoom,
        width: (maxX - minX) / zoom,
        height: (maxY - minY) / zoom,
    }
}

export default function useImageExport(id: string) {
    const { vueFlowRef, viewport, getSelectedNodes, getSelectedEdges, removeSelectedElements, addSelectedElements } = useVueFlow(id)
    const isExporting = ref(false)

    /** Renders the drawing and resolves to a data url; rejects when there is nothing to draw. */
    async function renderImage(format: ImageFormat, { padding = 20, pixelRatio = 2 }: ImageExportOptions = {}) {
        const pane = vueFlowRef.value?.querySelector<HTMLElement>('.vue-flow__transformationpane')
        if (!pane) throw new Error('The editor is not mounted')

        // selection outlines and colours are editor state, not part of the net
        const selected = [...getSelectedNodes.value, ...getSelectedEdges.value]
        if (selected.length) {
            removeSelectedElements()
            await nextTick()
        }

        try {
            const bounds = drawingBounds(pane, viewport.value.zoom)
            if (!bounds) throw new Error('There is nothing to export')

            const width = Math.ceil(bounds.width + 2 * padding)
            const height = Math.ceil(bounds.height + 2 * padding)
            const options = {
                width,
                height,
                filter: keep,
                style: {
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `translate(${padding - bounds.x}px, ${padding - bounds.y}px) scale(1)`,
                },
            }
            const restoreSvgStyles = inlineSvgStyles(pane)
            try {
                return format === 'png' ? await toPng(pane, { ...options, pixelRatio }) : await toSvg(pane, options)
            } finally {
                restoreSvgStyles()
            }
        } finally {
            if (selected.length) addSelectedElements(selected)
        }
    }

    /** Renders the drawing and downloads it. */
    async function downloadImage(format: ImageFormat, options: ImageExportOptions = {}) {
        if (isExporting.value) return
        isExporting.value = true
        try {
            const filename = options.filename ?? 'petri_net'
            const a = document.createElement('a')
            a.href = await renderImage(format, options)
            a.download = filename.endsWith(`.${format}`) ? filename : `${filename}.${format}`
            a.click()
            a.remove()
        } finally {
            isExporting.value = false
        }
    }

    return {
        renderImage,
        downloadImage,
        isExporting,
    }
}
