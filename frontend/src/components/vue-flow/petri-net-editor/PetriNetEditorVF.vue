<template>
    <VueFlow class="rounded-2 editor-cont" :id="PetriEditorNamespace" @dragover="onDragOver" @dragleave="onDragLeave"
        @drop="onDrop" fit-view-on-init :default-edge-options="{ type: 'arc' }" :connection-radius="30">

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
            <OrthogonalEdge v-bind="props" :shape-of="petriShapeOf" />
        </template>
        <template #connection-line="props">
            <OrthogonalConnectionLine v-bind="props" :shape-of="petriShapeOf" />
        </template>

        <Controls class="top-left shadow" :key="PetriEditorNamespace">
            <ControlButton :draggable="true" @dragstart="onDragStart($event, 'place')">
                <span class="mdi mdi-shape-circle-plus text-dark"></span>
                <v-tooltip text="Add Place" activator="parent" />
            </ControlButton>
            <ControlButton :draggable="true" @dragstart="onDragStart($event, 'transition')">
                <span class="mdi mdi-shape-rectangle-plus text-dark"></span>
                <v-tooltip text="Add Transition" activator="parent" />
            </ControlButton>
        </Controls>

        <div class="drop-zone-backing text-center" :style="dropZoneStyles">
            <div class="text-content border p-1 rounded-2" v-if="isDragOver">
                <p style="font-size: 48px" class="fw-lighter">Drop on the canvas to place</p>
            </div>
        </div>

        <HelperLines :distance="10" />
        <Background variant="dots" pattern-color="#323650" :size="1" bg-color="#323650" style="z-index: -100" />

    </VueFlow>
</template>

<script setup lang="ts">
import { Edge, EdgeMarker, MarkerType, Node, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls, ControlButton } from '@vue-flow/controls'
import TransitionNode from './components/nodes/TransitionNode.vue'
import PlaceNode from './components/nodes/PlaceNode.vue'
import useDragAndDrop from '../base/js/useDragAndDrop.ts'

// import default controls styles
import '@vue-flow/controls/dist/style.css'
import { computed } from 'vue'
import HelperLines from '../base/components/HelperLines.vue'
import OrthogonalEdge from '../base/components/OrthogonalEdge.vue'
import OrthogonalConnectionLine from '../base/components/OrthogonalConnectionLine.vue'
import type { ShapeResolver } from '../base/js/orthogonalRouting.ts'
import useIdentities from './js/useIdentities.ts'
import TokenNode from './components/nodes/TokenNode.vue'

const PetriEditorNamespace = "petri-net-editor"

// arcs dock onto these outlines; transitions match bootstrap's rounded-2 corners
const petriShapeOf: ShapeResolver = (node) =>
    node.type === 'place' ? { kind: 'ellipse' } : { kind: 'rect', radius: 6 }

const { setNodes, onConnect, addEdges, onNodesChange, onEdgesChange, findEdge, applyEdgeChanges } = useVueFlow(PetriEditorNamespace)
const { freeIdentity, getNextPlace, getNextTransition, getNext } = useIdentities()
const { onDragLeave, onDragOver, onDragStart, isDragOver, onDrop } = useDragAndDrop(PetriEditorNamespace, getNext)


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
        position: { x: 250, y: 5 },
    },
    {
        id: getNextTransition(),
        type: 'transition',
        position: { x: 450, y: 5 },
    },
]

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

// removal of identities
onNodesChange(
    (changes) => {
        for (const change of changes) {
            if (change.type === 'remove') {
                freeIdentity(change.id)
            }
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
.editor-canvas-ts-container
  --editor-primary: #2222f8
  --editor-secondary: #074355
  --editor-scence-bg: #323650
  --petri-net-connection-fill: #000000

$editor-scene-bg: #323650

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