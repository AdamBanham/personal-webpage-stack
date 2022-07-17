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

.face-holder
    position: relative
    height: 300px
    width: 300px
    z-index: 10
    background-image: url("~@/assets/profile_left.png")
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    box-shadow: $green-1 0 0 25px 15px
    border-radius: 50%
</style>