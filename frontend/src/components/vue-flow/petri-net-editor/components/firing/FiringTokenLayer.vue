<template>
    <EdgeLabelRenderer>
        <div v-for="flight in flights" :key="flight.id" :ref="(el) => start(el as HTMLElement | null, flight)"
            class="firing-token border shadow" :class="flight.kind === 'input' ? 'text-bg-warning' : 'text-bg-success'"
            :style="{ offsetPath: `path('${flight.path}')` }" />
    </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import { EdgeLabelRenderer } from '@vue-flow/core'
import { PetriEditorNamespace } from '../../js'
import useFiring, { type TokenFlight } from '../../js/useFiring'

const { flights, registerLayer } = useFiring(PetriEditorNamespace)
registerLayer()

const started = new WeakSet<TokenFlight>()

// tokens ride the arc's own svg path, as in vue-flow's animated layout example
function start(el: HTMLElement | null, flight: TokenFlight) {
    if (!el || started.has(flight)) return
    started.add(flight)

    if (typeof el.animate !== 'function') {
        flight.done()
        return
    }

    const animation = el.animate(
        [
            { offsetDistance: '0%', opacity: 0.4 },
            { offsetDistance: '10%', opacity: 1, offset: 0.1 },
            { offsetDistance: '100%', opacity: 1 },
        ],
        { duration: flight.duration, delay: flight.delay, easing: 'ease-in-out', fill: 'both' },
    )
    animation.onfinish = flight.done
    animation.oncancel = flight.done
}
</script>

<style scoped>
.firing-token {
    position: absolute;
    top: 0;
    left: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    offset-rotate: 0deg;
    offset-anchor: center;
    pointer-events: none;
    z-index: 10;
}
</style>
