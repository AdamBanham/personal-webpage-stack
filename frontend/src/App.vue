<template>
  <v-app>
    <Toolbar />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import Toolbar from "@/components/toolbar/toolbar.vue"
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

/* import default controls styles */
@import '@vue-flow/controls/dist/style.css'
</style>

<style lang="sass">
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/animations.sass"
@use "@/styles/tags.sass"
@use "diagram-js/assets/diagram-js.css"

.v-application__wrap
  background-image: url("@/assets/patterns/processy.png")
  background-repeat: repeat
  background-color: c.$background  

body
  background-image: url("@/assets/patterns/processy.png")
  background-repeat: repeat
  background-color: c.$background
</style>
