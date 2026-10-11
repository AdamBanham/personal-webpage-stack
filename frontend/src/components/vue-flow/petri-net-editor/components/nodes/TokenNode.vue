<template>

    <!-- visual content -->
    <div class="token text-bg-success shadow border">

    </div>
</template>

<script setup lang="ts">
import { useNode, useVueFlow } from '@vue-flow/core';
import { PetriEditorNamespace } from '../../js';

const node = useNode()

const { } = useVueFlow(PetriEditorNamespace)
</script>

<style scoped>
.token {
    width: 7.5px;
    height: 7.5px;
    border-radius: 3.25px;
}
</style>