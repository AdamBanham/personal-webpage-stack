<template>
    <VueFlow class="rounded-2 editor-cont" :id="PetriEditorNamespace" @dragover="onDragOver" @dragleave="onDragLeave"
        @drop="onDrop">

        <template #node-place>
            <PlaceNode></PlaceNode>
        </template>
        <template #node-transition>
            <TransitionNode></TransitionNode>
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

        <Background variant="dots" pattern-color="#323650" :size="1" bg-color="#323650" style="z-index: -100"/>

    </VueFlow>
</template>

<script setup lang="ts">
import { Node, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls, ControlButton } from '@vue-flow/controls'
import TransitionNode from './components/nodes/TransitionNode.vue'
import PlaceNode from './components/nodes/PlaceNode.vue'
import useDragAndDrop from '../base/js/useDragAndDrop.ts'

// import default controls styles
import '@vue-flow/controls/dist/style.css'
import { computed, useTemplateRef } from 'vue'

const PetriEditorNamespace = "petri-net-editor"

const { setNodes, onConnect, addEdges } = useVueFlow(PetriEditorNamespace)
const { onDragLeave, onDragOver, onDragStart, isDragOver, onDrop } = useDragAndDrop(PetriEditorNamespace)

const dropZoneStyles = computed(
    () => {
        return {
            backgroundColor: isDragOver.value ? '#074355' : 'transparent',
        }
    }
)

const nodes: Node[] = [
    {
        id: '1',
        type: 'place',
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        type: 'transition',
        position: { x: 450, y: 5 },
    },
]

setNodes(nodes)
onConnect(addEdges)


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


</style>