import { useVueFlow } from '@vue-flow/core'
import { onBeforeUnmount, onMounted } from 'vue'

// far outside any viewport, so no handle is ever "close" to the pointer
const OFF_SCREEN = -100000

/**
 * Connect mode (toolbar / "C") starts a connection from a synthetic mousedown on the
 * source handle, and vue-flow finishes it on the next document mouseup. Two things get in the way:
 *  - pressing the mouse on a node body starts a d3 drag gesture, which swallows the mouseup,
 *    so the connection never finishes and its preview sticks around;
 *  - nothing listens for Escape.
 * This guard makes the next press only finish the connection, and lets Escape cancel it.
 */
export default function useConnectMode(flowId: string) {
    const { connectionStartHandle, viewport, setViewport } = useVueFlow(flowId)

    // capture phase on window: runs before node drag and pane pan see the press
    function onMouseDown(event: MouseEvent) {
        if (connectionStartHandle.value) {
            event.stopPropagation()
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        if (event.key !== 'Escape' || !connectionStartHandle.value) return

        // vue-flow only drops its pending connection from its mouseup handler, which connects to
        // whatever handle the pointer last neared; move away from everything before releasing
        const before = { ...viewport.value }
        for (const type of ['mousemove', 'mouseup']) {
            document.dispatchEvent(new MouseEvent(type, { clientX: OFF_SCREEN, clientY: OFF_SCREEN, bubbles: true }))
        }
        // the off-screen move would otherwise nudge the canvas through auto-pan
        setViewport(before)
        event.preventDefault()
    }

    onMounted(() => {
        window.addEventListener('mousedown', onMouseDown, true)
        window.addEventListener('keydown', onKeyDown)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('mousedown', onMouseDown, true)
        window.removeEventListener('keydown', onKeyDown)
    })
}
