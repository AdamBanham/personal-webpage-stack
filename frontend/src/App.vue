<template>
  <div class="app">
    <toolbar />
    <router-view />
  </div>
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

html
  background-color: $background
  overflow-x: hidden
  overflow-y: auto
body 
  width: 100vw
  height: 100vh
  margin: 0px
.app 
  width: 100vw
  height: 100vh
</style>
