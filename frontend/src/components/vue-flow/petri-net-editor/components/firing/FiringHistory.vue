<template>
    <Panel position="top-left" class="firing-history nodrag nopan">
        <div class="text-bg-light border rounded-2 shadow-sm px-2 py-1">
            <div class="d-flex align-items-center gap-1">
                <button class="btn btn-link text-start text-decoration-none flex-grow-1 p-0 header"
                    @click="collapsed = !collapsed">
                    <span class="mdi" :class="collapsed ? 'mdi-chevron-right' : 'mdi-chevron-down'"></span>
                    History <span class="text-muted">({{ history.length }})</span>
                </button>
                <button v-if="history.length" class="btn btn-link p-0 header" :disabled="isFiring"
                    @click="clearHistory()">
                    <span class="mdi mdi-delete-sweep"></span>
                    <v-tooltip text="Clear history" activator="parent" location="top" />
                </button>
            </div>

            <template v-if="!collapsed">
                <p v-if="!history.length" class="fw-light text-muted m-0">No firings yet.</p>

                <!-- newest first, so the latest firing is always in view; click to select what it produced -->
                <ol v-else ref="list" class="list-unstyled m-0">
                    <li v-for="record in newestFirst" :key="record.step"
                        class="record d-flex align-items-center flex-wrap rounded-1 px-1"
                        :class="{ latest: record.step === history.length, live: remaining(record).length }"
                        @click="selectProduced(record)">
                        <span class="step text-muted">{{ record.step }}</span>
                        <span class="fw-semibold">{{ letter(record.transitionId) }}<sub>{{ index(record.transitionId) }}</sub></span>

                        <span v-for="input in record.consumed" :key="input.edgeId" class="group">
                            <span class="text-muted">{{ letter(input.placeId) }}<sub>{{ index(input.placeId) }}</sub></span>
                            <span v-for="id in input.tokenIds" :key="id" class="token">
                                <span class="dot consumed"></span>k<sub>{{ index(id) }}</sub>
                            </span>
                        </span>

                        <span class="mdi mdi-arrow-right text-muted"></span>

                        <span v-if="!record.produced.length" class="text-muted">∅</span>
                        <span v-for="output in record.produced" :key="output.edgeId" class="group">
                            <span class="text-muted">{{ letter(output.placeId) }}<sub>{{ index(output.placeId) }}</sub></span>
                            <span v-for="id in output.tokenIds" :key="id" class="token">
                                <span class="dot produced"></span>k<sub>{{ index(id) }}</sub>
                            </span>
                        </span>
                    </li>
                </ol>
            </template>
        </div>
    </Panel>
</template>

<script setup lang="ts">
import { Panel, useVueFlow, type GraphNode } from '@vue-flow/core'
import { computed, nextTick, ref, watch } from 'vue'
import { PetriEditorNamespace } from '../../js'
import useFiring, { type FiringRecord } from '../../js/useFiring'

const { history, isFiring, clearHistory } = useFiring(PetriEditorNamespace)
const { findNode, getSelectedNodes, addSelectedNodes, removeSelectedNodes } = useVueFlow(PetriEditorNamespace)

const collapsed = ref(false)
const list = ref<HTMLElement | null>(null)

const newestFirst = computed(() => [...history.value].reverse())

// bring each new firing into view
watch(
    () => history.value.length,
    async () => {
        await nextTick()
        list.value?.scrollTo({ top: 0, behavior: 'smooth' })
    },
)

// shorthand as drawn on the nodes: place-0001 -> p₁, transition-0002 -> t₂, token-0003 -> k₃
const LETTERS: Record<string, string> = { place: 'p', transition: 't', token: 'k' }
const letter = (id: string) => LETTERS[id.split('-')[0]] ?? id
const index = (id: string) => parseInt(id.split('-')[1], 10)

/** produced tokens still on the net; later firings may have consumed them */
function remaining(record: FiringRecord): GraphNode[] {
    return record.produced
        .flatMap((p) => p.tokenIds)
        .map((id) => findNode(id))
        .filter((n): n is GraphNode => !!n)
}

function selectProduced(record: FiringRecord) {
    const tokens = remaining(record)
    if (!tokens.length) return
    removeSelectedNodes(getSelectedNodes.value)
    addSelectedNodes(tokens)
}
</script>

<style scoped>
.firing-history {
    width: min(220px, 35%);
    font-size: 10px;
    opacity: 0.85;
    transition: opacity 0.15s ease;
}

.firing-history:hover {
    opacity: 1;
}

.header {
    font-size: 15px;
    color: inherit;
}

ol {
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 transparent;
}

ol::-webkit-scrollbar {
    width: 6px;
}

ol::-webkit-scrollbar-track {
    background: transparent;
}

ol::-webkit-scrollbar-thumb {
    background: #d0d0d0;
    border-radius: 3px;
}

.record {
    gap: 2px 6px;
    line-height: 1.6;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.record + .record {
    margin-top: 2px;
}

.record.latest {
    background: rgba(47, 116, 84, 0.1);
}

.record.live {
    cursor: pointer;
}

.record.live:hover {
    background: rgba(47, 116, 84, 0.18);
}

.step {
    min-width: 1.6em;
    padding: 0 3px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    line-height: 1.3;
}

.group {
    display: inline-flex;
    align-items: center;
    gap: 3px;
}

.token {
    display: inline-flex;
    align-items: center;
    gap: 1px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

/* match the token colours: amber while being consumed, green once produced */
.dot.consumed {
    background: var(--bs-warning, #ffc107);
}

.dot.produced {
    background: var(--bs-success, #198754);
}
</style>
