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
}
</script>

<style lang="sass">
@import "@/styles/colours_ant.sass"
@import "@/styles/animations.sass"
@import "@/styles/tags.sass"

html
  background-color: $background
  overflow-x: hidden
  overflow-y: hidden
body 
  width: 100vw
  height: 100vh
  margin: 0px
.app 
  width: 100vw
  height: 100vh
</style>
