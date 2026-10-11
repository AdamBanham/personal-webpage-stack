<template>
    <canvas ref="canvasRef" class="vue-flow__canvas" />
</template>

<script setup lang="ts">
import { useVueFlow } from '@vue-flow/core'
import { computed, ref, watch } from 'vue'
import useHelperLines from '../js/useHelperLines'
import { PetriEditorNamespace } from '../../petri-net-editor/js'

interface Props {
    distance?: number
}

const props = defineProps<Props>()

const { helperLineHorizontal, helperLineVertical } = useHelperLines(PetriEditorNamespace, props.distance)

const horizontal = computed(() => helperLineHorizontal.value)
const vertical = computed(() => helperLineVertical.value)

const { viewport, dimensions } = useVueFlow()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const width = computed(() => dimensions.value.width)
const height = computed(() => dimensions.value.height)

const x = computed(() => viewport.value.x)
const y = computed(() => viewport.value.y)
const zoom = computed(() => viewport.value.zoom)

function updateCanvasHelperLines() {
    const canvas = canvasRef.value
    const ctx = canvas?.getContext('2d')

    if (!ctx || !canvas) {
        return
    }

    const dpi = window.devicePixelRatio
    canvas.width = width.value * dpi
    canvas.height = height.value * dpi

    ctx.scale(dpi, dpi)
    ctx.clearRect(0, 0, width.value, height.value)
    ctx.strokeStyle = '#00AF79'

    if (typeof vertical.value === 'number') {
        ctx.moveTo(vertical.value * zoom.value + x.value, 0)
        ctx.lineTo(vertical.value * zoom.value + x.value, height.value)
        ctx.stroke()
    }

    if (typeof horizontal.value === 'number') {
        ctx.moveTo(0, horizontal.value * zoom.value + y.value)
        ctx.lineTo(width.value, horizontal.value * zoom.value + y.value)
        ctx.stroke()
    }
}

watch(
    [width, height, x, y, zoom, horizontal, vertical],
    () => updateCanvasHelperLines(), { immediate: true, deep: true })
</script>

<style scoped>
.vue-flow__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
}
</style>
