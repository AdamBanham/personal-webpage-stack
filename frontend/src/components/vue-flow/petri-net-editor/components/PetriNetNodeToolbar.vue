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
                <div class="col-2 ms-1" v-if="nodeType === 'transition'">
                    <button class="btn btn-light p-1" :disabled="!canFire" @click.stop="triggerFire()"
                        @mouseenter="previewBinding(firstBinding)" @mouseleave="previewBinding(null)">
                        <span class="mdi mdi-play"></span>
                    </button>
                    <!-- disabled buttons swallow hover, so the tooltip hangs off the wrapper -->
                    <v-tooltip :text="canFire ? 'Fire (F)' : 'Fire (F) — no bindings'" activator="parent"
                        location="bottom"></v-tooltip>
                </div>
                <div class="col-2 ms-1" v-if="nodeType === 'place'">
                    <button class="btn btn-light p-1" @click.stop="triggerAddToken()">
                        <span class="mdi mdi-circle-double"></span>
                        <v-tooltip text="Add Token (k)" activator="parent" location="bottom"></v-tooltip>
                    </button>
                </div>
                <div class="col-2 ms-1" v-if="nodeType === 'place'">
                    <button class="btn btn-light p-1" @click.stop="triggerClearTokens()">
                        <span class="mdi mdi-close-circle-multiple-outline"></span>
                        <v-tooltip text="Clear Tokens (s)" activator="parent" location="bottom"></v-tooltip>
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
                <div class="col-2">
                    <button class="btn btn-light p-1" @click.stop>
                        <span class="mdi mdi-palette"></span>
                        <v-tooltip text="Background Colour" activator="parent" location="bottom"></v-tooltip>
                        <v-menu activator="parent" :close-on-content-click="false" location="right"
                            :transition="false">
                            <v-card class="colour-picker nodrag nowheel" @click.stop @mousedown.stop>
                                <v-color-picker v-model="backgroundColor" mode="hex" :modes="['hex', 'rgb', 'hsl']"
                                    :swatches="swatches" show-swatches elevation="0" width="210"
                                    canvas-height="105"></v-color-picker>
                                <v-card-actions>
                                    <v-btn size="small" variant="text" :ripple="false" :disabled="!data.color"
                                        @click="backgroundColor = null">Reset</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn size="small" variant="text" :ripple="false" :disabled="isDefaultColor"
                                        @click="makeDefaultColor">
                                        Set default
                                        <v-tooltip :text="`Use this colour for new ${nodeType}s`" activator="parent"
                                            location="bottom"></v-tooltip>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
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
import { computed, nextTick, onMounted, onUnmounted, toValue } from 'vue'
import useIdentities from '../js/useIdentities'
import useFiring from '../js/useFiring'
import useLayout from '../../base/js/useLayout'
import useNodeDefaults from '../js/useNodeDefaults'

const node = useNode()
const data = node.node.data
const nodeType = node.node.type as NodeTypes
const position = computed(() => node.node.position)

const { 
    connectionStartHandle, removeNodes, addNodes, 
    addEdges, nodes, addSelectedNodes, findNode, onPaneReady 
} = useVueFlow(PetriEditorNamespace)
const {
    focusNode
} = useLayout(PetriEditorNamespace)

const { getNext } = useIdentities()
const { bindingsFor, isFiring, fire, previewBinding } = useFiring(PetriEditorNamespace)

// each inner array is one swatch column
const swatches = [
    ['#E53935', '#FFFFFF'],
    ['#FDD835', '#9E9E9E'],
    ['#1E88E5', '#212121'],
    ['#43A047', '#FB8C00'],
]
const { defaultColorFor, setDefaultColor, defaultDataFor } = useNodeDefaults()
const isDefaultColor = computed(() => defaultColorFor(nodeType) === data.color)
function makeDefaultColor() {
    if (nodeType === 'token') return
    setDefaultColor(nodeType, data.color)
}
const backgroundColor = computed<string | null>({
    get: () => data.color ?? '#FFFFFF',
    set: (value) => { data.color = value ?? undefined },
})

const firstBinding = computed(() => (nodeType === 'transition' ? bindingsFor(node.id)[0] ?? null : null))
const canFire = computed(() => !!firstBinding.value && !isFiring.value)

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

function triggerFire() {
    if (!canFire.value) return
    fire(node.id, firstBinding.value!)
}

function triggerDelete() {
    removeNodes(node.id)
}

function triggerAddToken() {
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
function triggerClearTokens() {
    const innerTokens = nodes.value.filter(
        el => el.type === 'token'
    ).filter(
        el => el.parentNode === node.id
    )

    removeNodes(innerTokens)
}

function triggerAdd(type: NodeTypes) {
    const pos = toValue(position)

    let yOffset = 0
    switch (type) {
        case ('place'):
            yOffset = 7.5
            break
        case ('transition'):
            yOffset = -7.5
            break;
    }

    const newNode = {
        id: getNext(type),
        type: type,
        data: defaultDataFor(type),
        position: {
            x: pos.x + 100,
            y: pos.y + yOffset
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

    const { off } = onPaneReady((instance) => {
        instance.fitView()
        off()
    })

    nextTick(
        () => {
            addSelectedNodes([findNode(newNode.id)])
            focusNode(newNode.id)
        }
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
            if (nodeType == 'place') {
                triggerAddToken()
            }
            break
        case ('s'):
            if (nodeType == 'place') {
                triggerClearTokens()
            }
            break
        case ('f'):
            if (nodeType == 'transition' && canFire.value) {
                triggerFire()
                event.preventDefault()
            }
            break
    }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

</script>

<style scoped>
/* shrink the text to match the narrower picker; the picker itself is sized through its props,
   since scaling it with css throws off the canvas's pointer maths */
.colour-picker {
    font-size: 0.8rem;
}

.colour-picker :deep(.v-btn) {
    font-size: 0.7rem;
}
</style>