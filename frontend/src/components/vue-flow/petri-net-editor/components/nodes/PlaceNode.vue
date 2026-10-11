<template>
    <PetriNetNodeToolbar/>

    <!-- visual content -->
    <div class="text-bg-light place shadow-sm border">

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
const label = "Place"

</script>

<style scoped>
.place {
    height: 50px;
    width: 50px;
    border-radius: 25px;

    .floating-label {
        text-wrap: nowrap;
        position: absolute;
        top: calc(100% + 5px);
        left: 50%;
    }
}
</style>
