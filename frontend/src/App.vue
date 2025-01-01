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
},
mounted() {
   document.dispatchEvent(new Event('x-app-rendered'))
}
}
</script>

<style lang="sass">
@import "@/styles/coloursAnt.sass"
@import "@/styles/animations.sass"
@import "@/styles/tags.sass"
@import "diagram-js/assets/diagram-js.css"

.v-application__wrap
  background-image: url("@/assets/patterns/processy.png")
  background-repeat: repeat
  background-color: $background  

body
  background-image: url("@/assets/patterns/processy.png")
  background-repeat: repeat
  background-color: $background
  
</style>
