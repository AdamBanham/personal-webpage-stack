<template>
  <div class="timeline">
    <div 
      v-for=" (i,idx) in Array(5)" 
      :key="idx" 
      class="spot" 
      :class="{ selected: spots[idx] }" 
      @click="setSelected(idx)"
    />
    <div class="title">
      <p> {{ spotTitle != null ? spotTitle : "" }} </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const spotTitles = [
  "The Early Years",
  "Undergraduate Years",
  "Postgraduate Training",
  "????",
  "????"
]

const spots = ref<boolean[]>(Array(5).fill(false))
const spotTitle = ref<string | null>(null)

function setSelected(idx: number) {
  if (spots.value[idx]) {
    spots.value[idx] = false
    spotTitle.value = null
    return
  }
  spots.value = Array(5).fill(false)
  spots.value[idx] = true
  spotTitle.value = spotTitles[idx]
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt" as c

.timeline
    position: absolute
    height: 12.5px 
    width: 500px 
    border-radius: 4px
    top: 107.5%
    background-color: c.$cyan-1
    display: flex
    flex-direction: row
    .spot 
        position: relative
        top: -22px
        height: 50px 
        width: 50px 
        border-radius: 25px
        background-image: radial-gradient(c.$cyan-1 30%, c.$cyan-3)
    .selected
        background-image: radial-gradient(c.$cyan-1 15%,c.$cyan-7) !important
    .title
        position: absolute
        top : 25px
        width: 500px
        height: 25px
        justify-items: center
        p 
            text-align: center
            color: c.$cyan-1
            font-size: 24pt

@for $i from 1 through 5
    $left: ($i - 1) * 75 + -25px
    .timeline
        .spot
            &:nth-child(#{$i})
                left: $left
</style>