<template>
  <v-app>
    <toolbar />
    <router-view />
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar/toolbar.vue"
export default {
name: "App",
components: {
    toolbar
}
}
</script>

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
