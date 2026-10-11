<template>
    <div>
        <NodeToolbar :is-visible="data.toolbarVisible" :position="Position.Right">
            <div class="row">
                <div class="col-2 me-1">
                    <button class="btn btn-light p-1" @click.stop="triggerConnect">
                        <span class="mdi mdi-arrow-right"></span>
                        <v-tooltip text="Connect (C)" activator="parent" location="bottom"></v-tooltip>
                    </button>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-2">
                    <button class="btn btn-light p-1" v-if="nodeType === 'place'"
                        @click.stop="triggerAdd('transition')">
                        <span class="mdi mdi-shape-rectangle-plus"></span>
                        <v-tooltip text="Add Transition (T)" activator="parent" location="bottom"></v-tooltip>
                    </button>
                    <button class="btn btn-light p-1" v-if="nodeType === 'transition'"
                        @click.stop="triggerAdd('place')">
                        <span class="mdi mdi-shape-circle-plus"></span>
                        <v-tooltip text="Add Place (P)" activator="parent" location="bottom"></v-tooltip>
                    </button>
                </div>
                <div class="col-2 ms-1" v-if="nodeType === 'place'">
                    <button class="btn btn-light p-1"
                        @click.stop="triggerAddToken()">
                        <span class="mdi mdi-circle-double"></span>
                        <v-tooltip text="Add Token (k)" activator="parent" location="bottom"></v-tooltip>
                    </button>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-2 me-1">
                    <button class="btn btn-light p-1" @click.stop="triggerDelete">
                        <span class="mdi mdi-delete-empty"></span>
                        <v-tooltip text="Delete (del)" activator="parent" location="bottom"></v-tooltip>
                    </button>
                </div>
            </div>
        </NodeToolbar>
    </div>
</template>

<script setup lang="ts">
import { Node, Position, useNode, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeTypes, PetriEditorNamespace } from '../js'
import { computed, onMounted, onUnmounted, toValue } from 'vue'
import useIdentities from '../js/useIdentities'

const node = useNode()
const data = node.node.data
const nodeType = node.node.type as NodeTypes
const position = computed(() => node.node.position)

const { connectionStartHandle, removeNodes, addNodes, addEdges } = useVueFlow(PetriEditorNamespace)
const { getNext } = useIdentities()

function triggerConnect() {
    if (connectionStartHandle.value || !node.node.selected) return

    const el = node.nodeEl.value.querySelector(
        `.vue-flow__node[data-id="${node.id}"] .vue-flow__handle.source`
    )

    if (!el) return

    const { left, top } = el.getBoundingClientRect()
    console.log("triggering connect for ", node.id)

    el.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: false, cancelable: true, button: 0,
        clientX: left + 1, clientY: top + 1,
    }))
}

function triggerDelete() {
    removeNodes(node.id)
}

function triggerAddToken(){
    const pos = toValue(position)
    const newNode = {
        type: 'token',
        id: getNext('token'),
        parentNode: node.id,
        extent: 'parent',
        position: {
            x: 10 + Math.random() * (node.node.dimensions.width - 20),
            y: 10 + Math.random() * (node.node.dimensions.height - 20),
        }
    } as Node

    addNodes(newNode)
}

function triggerAdd(type: NodeTypes) {
    const pos = toValue(position)

    const newNode = {
        id: getNext(type),
        type: type,
        position: {
            x: pos.x + 100,
            y: pos.y
        }
    }
    addNodes(
        newNode
    )

    const newEdge = {
        source: node.id,
        target: newNode.id
    }
    addEdges(
        newEdge
    )

}

// keyboard handles
function onKeydown(event: KeyboardEvent) {
    if (
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !node.node.selected
    ) {
        return
    }

    const target = event.target
    if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    ) {
        return
    }

    switch (event.key.toLowerCase()) {
        case ('c'):
            triggerConnect()
            event.preventDefault()
            break;
        case ('t'):
            if (nodeType == 'place') {
                triggerAdd('transition')
                event.preventDefault()
            }
            break
        case ('p'):
            if (nodeType == 'transition') {
                triggerAdd('place')
                event.preventDefault()
            }
            break
        case ('k'):
            if (nodeType == 'place'){
                triggerAddToken()
            }
    }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

</script>

<style scoped></style>