<template>
    <PetriNetNodeToolbar />

    <!-- visual content -->
    <div :class="{ 'text-bg-light': !data.color }" :style="{ backgroundColor: data.color }"
        class="place shadow-sm border"
        @dblclick="startEditLabel"
    >

        <!-- identity -->
        <div class="floating-identity text-end">
            <p class="fw-lighter" style="width: fit-content;">
                (p<sub>
                    {{ parseInt(node.id.split("-")[1], 10) }}
                </sub>)
            </p>
        </div>
        <!-- label -->
        <div class="floating-label text-start">
            <p class="fw-lighter" v-if="!editingLabel" style="width: fit-content;">
                {{ label }}
            </p>
            <NodeLabelEditor
                v-model:show="editingLabel"
                v-model:label="newLabel"
                @save="updateLabel"
                @cancel="cancelEditLabel"
            ></NodeLabelEditor>
        </div>
    </div>

    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
</template>

<script lang="ts" setup>
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { PetriEditorNamespace } from '../../js'
import PetriNetNodeToolbar from '../PetriNetNodeToolbar.vue'
import { computed, nextTick, onMounted, onUnmounted, ref, toValue, useTemplateRef, watch } from 'vue'
import NodeLabelEditor from './NodeLabelEditor.vue'


const { updateNodeInternals } = useVueFlow(PetriEditorNamespace)

const node = useNode()
const data = computed(
    () => node.node.data
)
const label = computed(
    () => toValue(data).label ? toValue(data).label : "missing"
)

const editingLabel = ref(false)
const newLabel = ref("")
function startEditLabel() {
    if (toValue(editingLabel)) return
    newLabel.value = label.value
    editingLabel.value = true
}
function cancelEditLabel() {
    editingLabel.value = false
}
function updateLabel(){
    node.node.data.label = newLabel.value
    editingLabel.value = false
    updateNodeInternals([node.id])
}

const selected = computed(
    () => node.node.selected
)
watch( 
    selected,
    (newVal) => {
        if (!newVal){
            editingLabel.value = false;
        }
    }
)

// keyboard handles
function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.repeat || !node.node.selected) return
    const target = event.target
    if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    ) {
        return
    }
    event.preventDefault()
    startEditLabel()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

</script>

<style scoped>
.place {
    height: 35px;
    width: 35px;
    border-radius: 17.5px;
    border: 1px solid black;

    .floating-identity {
        text-wrap: nowrap;
        position: absolute;
        top: calc(90% + 8px);
        left: calc(100% - 8px);
        z-index: -1;
        p {
            font-size: 8px;
        }
    }

    .floating-label {
        text-wrap: nowrap;
        position: absolute;
        top: calc(-10% - 8px);
        left: calc(0% - 8px);
        z-index: -1;
        p {
            font-size: 8px;
        }
    }

    .editing-label-box {
        position: absolute;
        width: 100px;
        height: 25px;
        font-size: 10px;
        top: calc(0% - 50px);
        left: calc(0% - 25px);
        z-index: 500;
    }
}
</style>
