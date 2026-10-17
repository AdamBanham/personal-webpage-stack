<template>

    <!-- visual content -->
    <div class="token shadow border" :class="previewed ? 'text-bg-warning' : 'text-bg-dark'">

    </div>
</template>

<script setup lang="ts">
import { useNode, useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import { PetriEditorNamespace } from '../../js';
import useFiring from '../../js/useFiring';

const node = useNode()

const { } = useVueFlow(PetriEditorNamespace)
const { onBindingPreviewed } = useFiring(PetriEditorNamespace)

// yellow while a hovered binding would consume this token
const previewed = ref(false)
onBindingPreviewed((binding) => {
    previewed.value = !!binding?.tokenIds.includes(node.id)
}, { immediate: true })
</script>

<style scoped>
.token {
    width: 7.5px;
    height: 7.5px;
    border-radius: 3.25px;
}
</style>