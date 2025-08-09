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
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    box-shadow: c.$green-1 0 0 25px 15px

    @media (min-width: brk.$desktop-width)
      background-image: url("/profiles/adam/adam-banham-graduation.jpeg")
      border-radius: 50px
      height: 500px
      width: 300px

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
      background-image: url("/profiles/adam/adam-banham-circled.png")
      border-radius: 50%
      height: 200px
      width: 200px

    @media (max-width: calc(brk.$tablet-width - 1px))
      background-image: url("/profiles/adam/adam-banham-circled.png")
      border-radius: 50%
      height: 150px
      width: 150px
</style>