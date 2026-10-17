<template>
    <PetriNetNodeToolbar />

    <!-- visual content -->
    <div class="transition rounded-2 shadow-sm border"
        :style="{ '--flash-duration': `${flashDuration}ms`, backgroundColor: data.color }"
        :class="[{ 'text-bg-light': !data.color }, flashing ? 'flashing' : { enabled: isEnabled(node.id) }]"
        @dblclick="startEditLabel">

        <!-- times fired -->
        <span v-if="firedCount(node.id)" class="fired-count badge rounded-pill text-bg-dark">
            {{ firedCount(node.id) }}
        </span>


        <!-- identity -->
        <div class="floating-identity text-end">
            <p class="fw-lighter" style="width: fit-content;">
                (t<sub>
                    {{ parseInt(node.id.split("-")[1], 10) }}
                </sub>)
            </p>
        </div>
        <!-- label -->
        <div class="floating-label text-start">
            <p class="fw-lighter" v-if="!editingLabel" style="width: fit-content;">
                {{ label }}
            </p>
            <div class="text-bg-light editing-label-box nodrag nowheel" v-else>
                <v-form @submit.prevent.stop="updateLabel" @dblclick.stop @keydown.esc="cancelEditLabel">
                    <v-text-field label="New Label" v-model="newLabel" variant="outlined" density="compact" hide-details
                        ref="editingTextField">

                    </v-text-field>
                </v-form>
            </div>
        </div>
    </div>


    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
</template>

<script lang="ts" setup>
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { PetriEditorNamespace } from '../../js'
import { computed, nextTick, onMounted, onUnmounted, ref, toValue, useTemplateRef, watch } from 'vue'
import PetriNetNodeToolbar from '../PetriNetNodeToolbar.vue'
import useFiring from '../../js/useFiring'


const { updateNodeInternals } = useVueFlow(PetriEditorNamespace)

const node = useNode()
const data = computed(
    () => node.node.data
)
const label = computed(
    () => toValue(data).label ? toValue(data).label : "missing"
)
const editingTextField = useTemplateRef('editingTextField')

const editingLabel = ref(false)
const newLabel = ref("")
function startEditLabel() {
    if (toValue(editingLabel)) return
    newLabel.value = label.value
    editingLabel.value = true
    nextTick(
        () => editingTextField.value.focus()
    )
}
function cancelEditLabel() {
    editingLabel.value = false
}
function updateLabel() {
    node.node.data.label = newLabel.value
    editingLabel.value = false
    updateNodeInternals([node.id])
}

const selected = computed(
    () => node.node.selected
)
watch(
    selected,
    (newVal) => {
        if (!newVal) {
            editingLabel.value = false;
        }
    }
)

const { isEnabled, firedCount, flashingTransition, flashDuration } = useFiring(PetriEditorNamespace)
const flashing = computed(() => flashingTransition.value === node.id)

// keyboard handles
function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.repeat || !node.node.selected) return
    const target = event.target
    if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    ) {
        return
    }
    event.preventDefault()
    startEditLabel()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

</script>

<style scoped>
.transition {
    height: 50px;
    width: 50px;

    .floating-identity {
        text-wrap: nowrap;
        position: absolute;
        top: calc(90% + 8px);
        left: calc(100% - 8px);
        z-index: -1;
        p {
            font-size: 8px;
        }
    }

    .floating-label {
        text-wrap: nowrap;
        position: absolute;
        top: calc(-10% - 8px);
        left: calc(0% - 8px);
        z-index: -1;
        p {
            font-size: 8px;
        }
    }

    .editing-label-box {
        position: absolute;
        width: 100px;
        height: 25px;
        font-size: 10px;
        top: calc(0% - 50px);
        left: calc(0% - 25px);
        z-index: 500;
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
