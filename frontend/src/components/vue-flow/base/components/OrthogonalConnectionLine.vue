<template>
    <g>
        <path class="vue-flow__connection-path" fill="none" :d="path" :marker-end="markerEnd" />
    </g>
</template>

<script setup lang="ts">
import type { ConnectionLineProps } from '@vue-flow/core'
import { computed } from 'vue'
import { buildRoute, pointShape, shapeOfNode, toSvgPath, type ShapeResolver } from '../js/orthogonalRouting'

interface Props extends ConnectionLineProps {
    shapeOf?: ShapeResolver
}

const props = defineProps<Props>()

// preview uses the same router as the committed edge, so the result never "jumps" on connect
const path = computed(() => {
    const source = shapeOfNode(props.sourceNode, props.shapeOf)
    const target = props.targetNode && props.connectionStatus === 'valid'
        ? shapeOfNode(props.targetNode, props.shapeOf)
        : pointShape({ x: props.targetX, y: props.targetY })
    return toSvgPath(buildRoute(source, target))
})
</script>
