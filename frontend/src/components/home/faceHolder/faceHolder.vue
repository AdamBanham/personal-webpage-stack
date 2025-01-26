<template>
  <div class="face-holder">
    <div class="fader" />
  </div>
</template>

<script>
export default {
name: "FaceHolder"
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/animations.sass" as ani
@use "@/styles/breakpoints.sass" as brk

.face-holder
    position: relative
    z-index: 10
    background-image: url("@/assets/profile_2024.png")
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    box-shadow: c.$green-1 0 0 25px 15px
    border-radius: 50%

    @media (min-width: brk.$desktop-width)
      height: 300px
      width: 300px

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
      height: 200px
      width: 200px

    @media (max-width: calc(brk.$tablet-width - 1px))
      height: 150px
      width: 150px
</style>