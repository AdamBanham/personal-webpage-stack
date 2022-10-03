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
@import "@/styles/coloursAnt.sass"
@import "@/styles/animations.sass"
@import "@/styles/breakpoints.sass"

.face-holder
    position: relative
    z-index: 10
    background-image: url("@/assets/profile_left.png")
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    box-shadow: $green-1 0 0 25px 15px
    border-radius: 50%

    @media (min-width: $desktop-width)
      height: 300px
      width: 300px

    @media (max-width: calc($desktop-width - 1px)) and (min-width: $tablet-width)
      height: 200px
      width: 200px

    @media (max-width: calc($tablet-width - 1px))
      height: 150px
      width: 150px
</style>