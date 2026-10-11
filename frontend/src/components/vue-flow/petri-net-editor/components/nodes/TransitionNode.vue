<template>
    <PetriNetNodeToolbar/>

    <!-- visual content -->
    <div class="text-bg-light transition rounded-2 shadow-sm border">


        <!-- label -->
        <div class="floating-label text-center">
            <p class="fw-lighter small" style="font-size: 6px; width: fit-content;">
                ({{ node.id }})
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


const { } = useVueFlow(PetriEditorNamespace)

const node = useNode()
const data = node.node.data
const label = "Transition"

</script>

<style scoped>
.transition {
    height: 50px;
    width: 50px;

    .floating-label {
        position: absolute;
        top: calc(100% + 5px);
        left: 50%;
        width: fit-content;
        text-wrap: nowrap;
    }
}
</style>
