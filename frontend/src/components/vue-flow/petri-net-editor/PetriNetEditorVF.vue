<template>
    <div class="">
        <VueFlow class="editor-canvas-ts-container editor-outter-box-shadow editor-canvas editor-cont"
            :id="PetriEditorNamespace" :class="{
                'fullscreen': fullscreen
            }" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop" fit-view-on-init
            :default-edge-options="{ type: 'arc' }" :connection-radius="30">
            <template #node-place>
                <PlaceNode></PlaceNode>
            </template>
            <template #node-transition>
                <TransitionNode></TransitionNode>
            </template>
            <template #node-token>
                <TokenNode></TokenNode>
            </template>

            <template #edge-arc="props">
                <OrthogonalEdge v-bind="props" :shape-of="petriShapeOf" style="z-index: 50;" />
            </template>
            <template #connection-line="props">
                <OrthogonalConnectionLine v-bind="props" :shape-of="petriShapeOf" style="z-index: 50;" />
            </template>

            <Controls class="top-left shadow" :key="PetriEditorNamespace">
                <template #top>
                    <ControlButton :draggable="true" @click.stop="toggleFullscreen">
                        <span class="mdi mdi-overscan text-dark"></span>
                        <v-tooltip text="Toggle Fullscreen" activator="parent" />
                    </ControlButton>
                </template>

                <template #default>
                    <ControlButton :draggable="true" @dragstart="onDragStart($event, 'place')">
                        <span class="mdi mdi-shape-circle-plus text-dark"></span>
                        <v-tooltip text="Add Place" activator="parent" />
                    </ControlButton>
                    <ControlButton :draggable="true" @dragstart="onDragStart($event, 'transition')">
                        <span class="mdi mdi-shape-rectangle-plus text-dark"></span>
                        <v-tooltip text="Add Transition" activator="parent" />
                    </ControlButton>
                    <ControlButton :disabled="isLayingOut" @click.stop="layout({ direction: 'RIGHT' })">
                        <span class="mdi mdi-sitemap mdi-rotate-270 text-dark"></span>
                        <v-tooltip text="Layout Left to Right" activator="parent" />
                    </ControlButton>
                    <ControlButton :disabled="isLayingOut" @click.stop="layout({ direction: 'DOWN' })">
                        <span class="mdi mdi-sitemap text-dark"></span>
                        <v-tooltip text="Layout Top to Bottom" activator="parent" />
                    </ControlButton>
                    <ControlButton @click.stop="importNet">
                        <span class="mdi mdi-import text-dark"></span>
                        <v-tooltip text="Import Model (.pnml)" activator="parent" />
                    </ControlButton>
                    <ControlButton @click.stop="downloadPnml()">
                        <span class="mdi mdi-export text-dark"></span>
                        <v-tooltip text="Export Model (.pnml)" activator="parent" />
                    </ControlButton>
                    <ControlButton :disabled="isExporting" @click.stop="exportImage('png')">
                        <span class="mdi mdi-file-image text-dark"></span>
                        <v-tooltip text="Export Image (.png)" activator="parent" />
                    </ControlButton>
                    <ControlButton :disabled="isExporting" @click.stop="exportImage('svg')">
                        <span class="mdi mdi-svg text-dark"></span>
                        <v-tooltip text="Export Image (.svg)" activator="parent" />
                    </ControlButton>
                </template>

            </Controls>

            <div class="drop-zone-backing text-center" :style="dropZoneStyles">
                <div class="text-content border p-1 rounded-2" v-if="isDragOver">
                    <p style="font-size: 48px" class="fw-lighter">Drop on the canvas to place</p>
                </div>
            </div>

            <HelperLines :distance="10" />
            <FiringTokenLayer />
            <FirePanel />
            <FiringHistory />
            <Background class="background-bg" variant="dots" :size="25" pattern-color="#cccccc" bg-color="#323650"
                style="z-index: -100" />

        </VueFlow>
    </div>
</template>

<script setup lang="ts">
import { Edge, EdgeMarker, MarkerType, Node, VueFlow, useVueFlow } from '@vue-flow/core'
import Background from '../base/components/Background.vue'
import { Controls, ControlButton } from '@vue-flow/controls'
import TransitionNode from './components/nodes/TransitionNode.vue'
import PlaceNode from './components/nodes/PlaceNode.vue'
import useDragAndDrop from '../base/js/useDragAndDrop.ts'
import useNodeDefaults from './js/useNodeDefaults'
import useLayout from '../base/js/useLayout.ts'
import useImageExport, { type ImageFormat } from '../base/js/useImageExport.ts'

// import default controls styles
import '@vue-flow/controls/dist/style.css'
import { computed, ref, toValue } from 'vue'
import HelperLines from '../base/components/HelperLines.vue'
import OrthogonalEdge from '../base/components/OrthogonalEdge.vue'
import OrthogonalConnectionLine from '../base/components/OrthogonalConnectionLine.vue'
import type { ShapeResolver } from '../base/js/orthogonalRouting.ts'
import useIdentities from './js/useIdentities.ts'
import useConnectMode from './js/useConnectMode.ts'
import usePnml from './js/usePnml.ts'
import TokenNode from './components/nodes/TokenNode.vue'
import FiringTokenLayer from './components/firing/FiringTokenLayer.vue'
import FirePanel from './components/firing/FirePanel.vue'
import FiringHistory from './components/firing/FiringHistory.vue'

const PetriEditorNamespace = "petri-net-editor"

// arcs dock onto these outlines; transitions match bootstrap's rounded-2 corners
const petriShapeOf: ShapeResolver = (node) =>
    node.type === 'place' ? { kind: 'ellipse' } : { kind: 'rect', radius: 6 }

const { setNodes, onConnect, addEdges, removeNodes, getNodes, onNodesChange, onEdgesChange, findEdge, applyEdgeChanges } = useVueFlow(PetriEditorNamespace)
const { freeIdentity, getNextPlace, getNextTransition, getNext } = useIdentities()
const { defaultDataFor } = useNodeDefaults()
useConnectMode(PetriEditorNamespace)
const { onDragLeave, onDragOver, onDragStart, isDragOver, onDrop } = useDragAndDrop(PetriEditorNamespace, getNext, defaultDataFor)
const { layout, isLayingOut } = useLayout(PetriEditorNamespace)
const { openPnml, downloadPnml } = usePnml(PetriEditorNamespace)
const { downloadImage, isExporting } = useImageExport(PetriEditorNamespace)

async function exportImage(format: ImageFormat) {
    try {
        await downloadImage(format)
    } catch (error) {
        alert(`Failed to export the image :: ${error instanceof Error ? error.message : error}`)
    }
}

async function importNet() {
    try {
        const result = await openPnml()
        if (result?.skippedArcs) {
            console.warn(`Skipped ${result.skippedArcs} arc(s) with unknown ends or joining two nodes of the same kind`)
        }
    } catch (error) {
        alert(`Failed to import the model :: ${error instanceof Error ? error.message : error}`)
    }
}


const dropZoneStyles = computed(
    () => {
        return {
            backgroundColor: isDragOver.value ? '#074355' : 'transparent',
        }
    }
)

const nodes: Node[] = [
    {
        id: getNextPlace(),
        type: 'place',
        position: { x: 250, y: 15 },
        data: {
            ...defaultDataFor('place'),
            label: "start",
        }
    },
    {
        id: getNextTransition(),
        type: 'transition',
        position: { x: 450, y: 7.5 },
        data: {
            ...defaultDataFor('transition'),
            label: "begin work"
        }
    },
]

const fullscreen = ref(false)
function toggleFullscreen() {
    fullscreen.value = !toValue(fullscreen)
}

// keep in sync with $arc-colour / $arc-selected-colour in the style block below
const ARC_COLOUR = '#2c2e3a'
const ARC_SELECTED_COLOUR = '#2f7454'

function arcMarker(selected = false): EdgeMarker {
    return {
        type: MarkerType.ArrowClosed,
        height: 14,
        width: 14,
        strokeWidth: 1.5,
        color: selected ? ARC_SELECTED_COLOUR : ARC_COLOUR,
    }
}

setNodes(nodes)
onConnect((conn: Edge) => {
    conn.type = 'arc'
    conn.data = { waypoints: [] }
    conn.markerEnd = arcMarker()
    addEdges(conn)
})

// removal of identities, and of the tokens held by a removed place
onNodesChange(
    (changes) => {
        const removed = new Set(changes.filter((c) => c.type === 'remove').map((c) => c.id))
        const orphans = getNodes.value.filter((n) => n.parentNode && removed.has(n.parentNode) && !removed.has(n.id))

        for (const change of changes) {
            if (change.type === 'remove') {
                freeIdentity(change.id)
            }
        }

        if (orphans.length) {
            removeNodes(orphans, false, true)
        }
    }
)

onEdgesChange((changes) => {
    for (const ch of changes) {
        if (ch.type === 'select') {
            const e = findEdge(ch.id)
            if (e) e.markerEnd = arcMarker(ch.selected)
        }
        if (ch.type === 'add') {
            ch.item.markerEnd = arcMarker()

            // applyEdgeChanges([ch])
        }
    }
})


</script>

<style scoped lang="sass">
@use "@/styles/content.sass"

.editor-canvas-ts-container
  --editor-primary: #2222f8
  --editor-secondary: #074355
  --editor-scence-bg: #323650
  --petri-net-connection-fill: #000000
  height: 1080px;

$editor-scene-bg: #323650

.editor-canvas-ts-container.editor-cont.fullscreen
    position: absolute
    top: calc(0% + 64px)
    left: 0%
    width: 100vw
    height: calc(100vh - 64px)

.editor-cont .top-left
    left: calc(100% - 55px)
    top: 5px
    height: fit-content
    position: relative


.drop-zone-backing
    top: 0%
    left: 0%
    height: 100%
    width: 100%
    position: absolute
    transition: background-color 0.2s ease
    z-index: 1
    
    
    .text-content 
        margin: 0px
        margin-top: calc(25% - 36px)
        margin-left: auto 
        margin-right: auto 
        height: fit-content
        width: fit-content
        opacity: 0.5
        z-index: 100

        p
            margin: 0 
            padding: 0

.editor-cont.vue-flow 
    .vue-flow__node.selected 
        outline: 2px dotted blue;
        outline-offset: 4px;

.editor-cont.vue-flow 
    .vue-flow__node.selected 
        outline: 2px dotted blue;
        outline-offset: 4px;
</style>

<style lang="sass">
@use "@/styles/coloursAnt.sass" as c

$arc-colour: #2c2e3a
$arc-selected-colour: c.$green-3

.editor-cont.vue-flow .vue-flow__edge-path 
    stroke: $arc-colour
    stroke-width: 2px
    stroke-linecap: round
    stroke-linejoin: round


// arcs float on the node outline, so both handles sit on the node centre:
// the source shows as a small grab dot on hover, the target is found via connection-radius
.editor-cont.vue-flow .vue-flow__node .vue-flow__handle
    top: 50%
    left: 50%
    right: auto
    bottom: auto
    transform: translate(-50%, -50%)
    width: 10px
    height: 10px
    border: 1.5px solid #fff
    background: #555
    opacity: 0
    transition: opacity 0.15s ease

.editor-cont.vue-flow .vue-flow__node .vue-flow__handle.target
    pointer-events: none

.editor-cont.vue-flow .vue-flow__node:hover .vue-flow__handle.source,
.editor-cont.vue-flow .vue-flow__node.selected .vue-flow__handle.source
    opacity: 1

.editor-cont.vue-flow .vue-flow__connection-path 
    stroke: rgb(173, 202, 222)
    stroke-width: 2px
    stroke-linecap: round
    stroke-linejoin: round
    stroke-dasharray: 4 6


.editor-cont.vue-flow .vue-flow__node.selected 
    outline: 2px dotted rgba(153, 153, 218, 0.504)
    border-radius: 5px
    outline-offset: 4px


.editor-cont.vue-flow 
    .vue-flow__edge.selected 
        .vue-flow__edge-path 
            stroke: $arc-selected-colour
            color: $arc-selected-colour

</style>