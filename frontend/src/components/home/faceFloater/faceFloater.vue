<template>
  <div
    class="facefloater-contain"
    :style="containStyler"
  >
    <div
      :class="[starClass, colourClass]"
      :style="starStyler"
    />
  </div>  
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(defineProps<{
  orbitsize?: number
  zlevel?: number
  speed?: number
  starsize?: number
  startdeg?: number
}>(), {
  orbitsize: 450,
  zlevel: 5,
  speed: 10,
  starsize: 100,
  startdeg: 0
})

const starClass = "facefloater"
const colourClass = pickColour()

function pickColour(): string {
  const rand = Math.random() * 12
  if (rand < 2.5) {
    return "red"
  } else if (rand < 5.0) {
    return "green"
  } else if (rand < 7.5) {
    return "yellow"
  } else if (rand < 10) {
    return "cyan"
  }
  return "orange"
}

const containStyler = computed(() => ({
  'height': props.orbitsize + 'px',
  'width': props.orbitsize + 'px',
  'z-index': props.zlevel,
  'animation-duration': props.speed + 's',
}))

const starStyler = computed(() => {
  const { orbitsize, startdeg } = props
  // work out left and right based on starting degree
  let left: number | string
  let top: number | string
  if (startdeg <= 45) {
    top = 0
    left = (orbitsize / 2) + (orbitsize / 2) * (startdeg / 45)
  } else if (startdeg > 45 && startdeg <= 135) {
    left = orbitsize
    top = orbitsize * ((startdeg - 45) / (135 - 45))
  } else if (startdeg > 135 && startdeg <= 225) {
    top = orbitsize
    left = orbitsize - orbitsize * ((startdeg - 135) / (225 - 135))
  } else if (startdeg > 225 && startdeg <= 315) {
    left = 0
    top = orbitsize - orbitsize * ((startdeg - 225) / (315 - 225))
  } else {
    top = 0
    left = (orbitsize / 2) * ((startdeg - 315) / 45)
  }
  return {
    'z-index': props.zlevel - 10,
    'height': props.starsize + 'px',
    'width': props.starsize + 'px',
    'top': top + 'px',
    'left': left + 'px',
    'border-radius': Math.round(props.starsize / 2) + 'px',
  }
})
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/breakpoints.sass" as brk

.facefloater-contain
    position: absolute
    animation: rotate 10s infinite
    .facefloater
        position: absolute
    .cyan
        background-image: radial-gradient(c.$cyan-3, c.$cyan-5, c.$cyan-7)
        box-shadow: 0 0 75px 5px c.$cyan-7
    .yellow
        background-image: radial-gradient(c.$yellow-3, c.$yellow-5, c.$yellow-7)
        box-shadow: 0 0 75px 5px c.$yellow-7
    .green
        background-image: radial-gradient(c.$green-3, c.$green-5, c.$green-7)
        box-shadow: 0 0 75px 5px c.$green-7
    .red 
        background-image: radial-gradient(c.$red-3, c.$red-5, c.$red-7)
        box-shadow: 0 0 75px 5px c.$red-7
    .orange
        background-image: radial-gradient(c.$orange-3, c.$orange-5, c.$orange-7)
        box-shadow: 0 0 75px 5px c.$orange-7

    div
        @media (min-width: brk.$desktop-width)
            transform: scale(0.75)

        @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
            transform: scale(0.4)

        @media (max-width: calc(brk.$tablet-width - 1px))
            transform: scale(0.2)

    @media (min-width: brk.$desktop-width)
        transform: scale(0.75)

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        transform: scale(0.5)
        max-width: 300px
        max-height: 300px

    @media (max-width: calc(brk.$tablet-width - 1px))
        transform: scale(0.25)
        max-width: 300px
        max-height: 300px
    
</style>