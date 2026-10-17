<template>
    <PetriNetNodeToolbar/>

    <!-- visual content -->
    <div class="text-bg-light place shadow-sm border" @dblclick="toggleEditLabel">

        <!-- identity -->
        <div class="floating-identity text-end">
            <p class="fw-lighter small" style="font-size: 6px; width: fit-content;">
                (p<sub>
                    {{ parseInt(node.id.split("-")[1], 10) }}
                </sub>)
            </p>
        </div>
        <!-- label -->
        <div class="floating-label text-start">
            <p class="fw-lighter small"
               v-if="!editingLabel" 
               style="font-size: 6px; width: fit-content;">
                {{ label }}
            </p>
        </div>
    </div>

    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
</template>

<script lang="ts" setup>
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { PetriEditorNamespace } from '../../js'
import PetriNetNodeToolbar from '../PetriNetNodeToolbar.vue'
import { computed, ref, toValue } from 'vue'


const { } = useVueFlow(PetriEditorNamespace)

const node = useNode()
const data = node.node.data
const label = computed(
    () => data.label ? data.label : "missing"
)


const editingLabel = ref(false)
function toggleEditLabel(){
    editingLabel.value = !toValue(editingLabel)
}
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
        top: calc(100%);
        left: calc(100% - 5px);
        z-index: -1;
    }

    .floating-label {
        text-wrap: nowrap;
        position: absolute;
        top: calc(-10% - 5px);
        left: 0%;
        z-index: -1;
    }
}
</style>
