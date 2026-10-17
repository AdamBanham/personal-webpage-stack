<template>
    <div class="binding-selector">
        <p class="small fw-light mb-1">
            {{ bindings.length }} binding{{ bindings.length === 1 ? '' : 's' }}{{ truncated ? '+' : '' }}
        </p>
        <ul class="list-unstyled m-0">
            <li v-for="binding in bindings" :key="binding.key" class="binding d-flex align-items-center rounded-2 px-1"
                :class="{ active: binding.key === activeKey }" @mouseenter="emit('preview', binding)"
                @mouseleave="emit('preview', null)">
                <button class="btn btn-sm btn-link text-start text-decoration-none flex-grow-1 p-0" :disabled="disabled"
                    @click="emit('select', binding)">
                    <span class="fw-semibold">{{ binding.transitionId }}</span>
                    <span v-if="!binding.inputs.length" class="text-muted"> · no input tokens</span>
                    <span v-for="input in binding.inputs" :key="input.edgeId" class="ms-2">
                        <span class="text-muted">{{ input.placeId }}:</span>
                        {{ input.tokenIds.map(short).join(', ') }}
                    </span>
                    <v-tooltip text="Select these tokens" activator="parent" location="top" />
                </button>
                <button class="btn btn-sm btn-success py-0 px-1 ms-2" :disabled="disabled" @click="emit('fire', binding)">
                    <span class="mdi mdi-play"></span>
                    <v-tooltip text="Fire with this binding" activator="parent" location="top" />
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Binding } from '../../js/useFiring'

withDefaults(defineProps<{
    bindings: Binding[]
    /** binding to mark as current, e.g. the one matching the selection */
    activeKey?: string
    truncated?: boolean
    disabled?: boolean
}>(), { activeKey: undefined, truncated: false, disabled: false })

const emit = defineEmits<{
    select: [binding: Binding]
    fire: [binding: Binding]
    preview: [binding: Binding | null]
}>()

const short = (tokenId: string) => `#${tokenId.replace(/^token-/, '')}`
</script>

<style scoped>
.binding-selector ul {
    max-height: 160px;
    overflow-y: auto;
}

.binding {
    font-size: 12px;
    gap: 4px;
}

.binding:hover,
.binding.active {
    background: rgba(47, 116, 84, 0.12);
}

.binding .btn-link {
    font-size: 12px;
    color: inherit;
}
</style>
