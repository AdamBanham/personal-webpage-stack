<template>
    <Panel position="bottom-center" class="fire-panel nodrag nopan">
        <div v-if="fireableSelection.length || candidateBindings.length"
            class="text-bg-light border rounded-2 shadow p-2">
            <!-- the selected tokens are exactly a binding: fire it -->
            <div v-if="fireableSelection.length" class="d-flex flex-wrap gap-1"
                :class="{ 'mb-2': showSelector }">
                <button v-for="binding in fireableSelection" :key="binding.key" class="btn btn-success btn-sm"
                    :disabled="isFiring" @click="fire(binding.transitionId, binding)"
                    @mouseenter="previewBinding(binding)" @mouseleave="previewBinding(null)">
                    <span class="mdi mdi-play"></span> Fire {{ binding.transitionId }}
                    <v-tooltip :text="shortcutBinding?.key === binding.key ? 'Fire (F)' : 'Fire'" activator="parent"
                        location="top" />
                </button>
            </div>

            <!-- otherwise, or as alternatives: pick from the bindings in play -->
            <BindingSelector v-if="showSelector" :bindings="candidateBindings" :active-key="fireableSelection[0]?.key"
                :truncated="truncated" :disabled="isFiring" @select="selectBinding" @preview="previewBinding"
                @fire="(b) => fire(b.transitionId, b)" />
        </div>
    </Panel>
</template>

<script setup lang="ts">
import { Panel } from '@vue-flow/core'
import { computed, onMounted, onUnmounted } from 'vue'
import { PetriEditorNamespace } from '../../js'
import useFiring from '../../js/useFiring'
import BindingSelector from './BindingSelector.vue'

const {
    fireableSelection, candidateBindings, selectedTransitionIds, isFiring, fire, selectBinding, previewBinding,
    isTruncated,
} = useFiring(PetriEditorNamespace)

// the picker only adds something when there is a choice beyond the exact match
const showSelector = computed(() =>
    candidateBindings.value.some((b) => !fireableSelection.value.some((f) => f.key === b.key)),
)

const truncated = computed(() => candidateBindings.value.some((b) => isTruncated(b.transitionId)))

/**
 * What F fires from here: the selected tokens, when they are exactly one binding.
 * With a transition selected, F belongs to that transition's toolbar instead.
 */
const shortcutBinding = computed(() =>
    // ambiguous when the same tokens enable more than one transition
    !selectedTransitionIds.value.length && fireableSelection.value.length === 1 ? fireableSelection.value[0] : null,
)

function onKeydown(event: KeyboardEvent) {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.key.toLowerCase() !== 'f') return

    const target = event.target
    if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    ) {
        return
    }

    const binding = shortcutBinding.value
    if (binding) {
        fire(binding.transitionId, binding)
        event.preventDefault()
    }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.fire-panel {
    max-width: min(520px, 90%);
}
</style>
