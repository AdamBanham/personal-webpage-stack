<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
@import "@/styles/colours.sass"
@import "@/styles/animations.sass"
html
  background-color: $black-blue
  overflow-x: hidden
  overflow-y: hidden
body 
  width: 100vw
  height: 100vh
  margin: 0px
.app 
  width: 98vw
  height: 98vh
  padding: 1vh 1vw
</style>
