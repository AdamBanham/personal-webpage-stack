<template>
    <NodeToolbar :is-visible="data.toolbarVisible" :position="Position.Right">
        <div class="row g-5">
            <div class="col-2">
                <button class="btn btn-light">D</button>
            </div>
            <div class="col-2">
                <button class="btn btn-light">C</button>
            </div>
            <div class="col-2">
                <button class="btn btn-light">E</button>
            </div>
        </div>
    </NodeToolbar>

    <!-- visual content -->
    <div class="text-bg-light place shadow-sm">

        <!-- label -->
        <div class="floating-label">
            <p>
                {{ label }}
            </p>
        </div>
    </div>

    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
</template>

<script lang="ts" setup>
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { PetriEditorNamespace } from '../../js'


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
        position: absolute;
        top: 100%;
        left: 50%;
    }
}
</style>
