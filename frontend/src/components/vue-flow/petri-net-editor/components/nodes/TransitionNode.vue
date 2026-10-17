<template>
    <PetriNetNodeToolbar/>

    <!-- visual content -->
    <div class="text-bg-light transition rounded-2 shadow-sm border" :style="{ '--flash-duration': `${flashDuration}ms` }"
        :class="flashing ? 'flashing' : { enabled: isEnabled(node.id) }">

        <!-- times fired -->
        <span v-if="firedCount(node.id)" class="fired-count badge rounded-pill text-bg-dark">{{ firedCount(node.id) }}</span>


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
import { computed } from 'vue'
import PetriNetNodeToolbar from '../PetriNetNodeToolbar.vue'
import useFiring from '../../js/useFiring'


const { } = useVueFlow(PetriEditorNamespace)

const node = useNode()
const data = node.node.data
const label = "Transition"

const { isEnabled, firedCount, flashingTransition, flashDuration } = useFiring(PetriEditorNamespace)
const flashing = computed(() => flashingTransition.value === node.id)

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

    .fired-count {
        position: absolute;
        top: -6px;
        right: -6px;
        font-size: 7px;
        padding: 2px 4px;
    }
}

.transition.flashing::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    /*
     * 225deg runs top-right to bottom-left: green leads, yellow trails, and a thin white stripe sits between them.
     * The node only ever shows a third of this, so the stripe has to stay narrow to read as one diagonal edge
     */
    background: linear-gradient(225deg,
            var(--bs-success) 0% 44%, var(--bs-white) 48% 52%, var(--bs-warning) 56% 100%);
    background-size: 300% 300%;
    animation: transition-swipe var(--flash-duration) ease-in-out both;
}

/* the window starts on the yellow end and slides to the green end, so the green front
   sweeps in from the top-right corner to the bottom-left */
@keyframes transition-swipe {
    0% {
        opacity: 0;
        background-position: 0% 100%;
    }

    15% {
        opacity: 1;
        background-position: 0% 100%;
    }

    75% {
        opacity: 1;
        background-position: 100% 0%;
    }

    100% {
        opacity: 0;
        background-position: 100% 0%;
    }
}

.transition.enabled {
    box-shadow: 0 0 0 2px #2f7454, 0 0 8px 2px rgba(47, 116, 84, 0.6) !important;
}
</style>
