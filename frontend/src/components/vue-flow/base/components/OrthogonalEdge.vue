<template>
    <path class="vue-flow__edge-path" :d="path" fill="none" :marker-start="markerStart" :marker-end="markerEnd" />
    <path class="vue-flow__edge-interaction orthogonal-edge-hit nopan" :d="path" fill="none" stroke-opacity="0"
        :stroke-width="interactionWidth ?? 14" :style="{ cursor: hitCursor }" @pointerdown="onPathPointerDown"
        @pointermove="onPathPointerMove" @pointerleave="onPathPointerLeave" @dblclick.stop="insertBendpoint" />

    <EdgeLabelRenderer v-if="selected || draft || grip">
        <!-- visual only: the path underneath receives the pointer, so the grip never steals hover -->
        <div v-if="grip" class="orthogonal-edge-grip" :class="grip.orientation === 'h' ? 'grip-h' : 'grip-v'"
            :style="handleStyle(grip.at)" />
        <div v-for="bend in selected || draft ? bends : []" :key="`bend-${bend.index}`" class="orthogonal-edge-bend nodrag nopan"
            :style="handleStyle(bend.at)" @pointerdown="startBendDrag(bend.index, $event)"
            @dblclick.stop="removeBendpoint(bend.index)" />
    </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import { EdgeLabelRenderer, useVueFlow, type EdgeProps, type XYPosition } from '@vue-flow/core'
import { computed } from 'vue'
import { buildRoute, shapeOfNode, toSvgPath, type ShapeResolver } from '../js/orthogonalRouting'
import useEdgeWaypoints, { type ArcData } from '../js/useEdgeWaypoints'

defineOptions({ inheritAttrs: false })

interface Props extends EdgeProps<ArcData> {
    /** outline of each node the edge docks onto; rectangles by default */
    shapeOf?: ShapeResolver
}

const props = defineProps<Props>()

const { viewport } = useVueFlow()

// floating ends: routed between node outlines, the handle positions are ignored
const shapes = computed(() => ({
    source: shapeOfNode(props.sourceNode, props.shapeOf),
    target: shapeOfNode(props.targetNode, props.shapeOf),
}))

function build(waypoints: XYPosition[]): XYPosition[] {
    return buildRoute(shapes.value.source, shapes.value.target, waypoints)
}

const route = computed(() => build(props.data?.waypoints ?? []))

const {
    draft, grip, startBendDrag, onPathPointerDown, onPathPointerMove, onPathPointerLeave, insertBendpoint, removeBendpoint,
} = useEdgeWaypoints(props, route, build)

const points = computed(() => (draft.value ? build(draft.value) : route.value))
const path = computed(() => toSvgPath(points.value))

const hitCursor = computed(() => {
    if (!grip.value) return 'pointer'
    return grip.value.orientation === 'h' ? 'ns-resize' : 'ew-resize'
})

const bends = computed(() => points.value.slice(1, -1).map((at, i) => ({ index: i + 1, at })))

function handleStyle(at: XYPosition) {
    return { transform: `translate(${at.x}px, ${at.y}px) translate(-50%, -50%) scale(${1 / viewport.value.zoom})` }
}
</script>

<style scoped>
.orthogonal-edge-grip,
.orthogonal-edge-bend {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: all;
    background: #fff;
    border: 1.5px solid #2ecc71;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
}

.orthogonal-edge-grip {
    border-radius: 3px;
    pointer-events: none;
}

.orthogonal-edge-grip.grip-h {
    width: 16px;
    height: 6px;
    cursor: ns-resize;
}

.orthogonal-edge-grip.grip-v {
    width: 6px;
    height: 16px;
    cursor: ew-resize;
}

.orthogonal-edge-bend {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    cursor: move;
}
</style>
