<template>
  <div class="face-holder">
    <div class="fader" />
    <!-- <div
      v-for="i in Array.from({length:13}, (x,i) => i)"
      :key="i"
      class="circle"
    />
    <div class="circle face">
      <p class="progress">
        25%
      </p>
      <div class="wave">
        <div
          class="blob blob-fg"
        />
        <div
          class="blob blob-fg"
        />
        <div
          class="blob blob-fg"
        />
        <div
          class="blob blob-fg"
        />
        <div
          class="blob blob-fg"
        />
      </div>
    </div>  -->
  </div>
</template>

<script>
export default {
name: "FaceHolder"
}
</script>

<style lang="sass" scoped>
@import "@/styles/colours_ant.sass"
@import "@/styles/animations.sass"

.face-holder
    position: relative
    height: 400px
    width: 400px
    z-index: 50
    background-image: url("~@/assets/profile_left.png")
    background-position: center
    background-repeat: no-repeat
    background-size: cover

.circle
    background-color: $blue-2
    height: 400px
    width: 400px
    border-radius: 200px
    top: 0
    left: 0
    filter: brightness(50%)
    position: absolute
    &:nth-child(1)
        box-shadow: 0 0 100px 10px $blue-4
@for $i from 1 through 13
    $d : 19
    .circle
        &:nth-child(#{$i+1})
            filter: brightness((50% + ($i) *($d/5.5)))
            height: (400px - $i * $d)
            width: (400px - $i * $d)
            border-radius: (400px - $i * $d)/2
            top: $i * ($d/2) * 1px
            left: $i * ($d/2) * 1px
.face,.circle
  display: flex
  flex-direction: column
  justify-content: center
  
  .progress
    color: $blue-3
    text-align: center
    font-size: 36pt
    font-weight: bold
    z-index: 1
  .wave
    height: 100%
    width: 100%
    border-radius: 140px
    z-index: 0
    position: absolute
    background: linear-gradient(0deg, $blue-3 25%, $blue-6 25%)
    .blob
      position: absolute
      width: 100%
      height: 50%
      top: 70%
    .blob-fg
      &::after
        @include wave()
        opacity: 0
        background: $blue-3
        height: 50px
        width: 50px
        z-index: -2
        animation: wave-rise 5s infinite ease-out
  &:nth-child(14)
        filter: brightness(90%)
        border: 2.5px $blue-4 solid
        height: 200px
        width: 225px
        border-radius: 140px
        // background: url("./close_up.png"), radial-gradient(circle,$blue-4 5%, $blue-7 30%, $black-blue 75%),radial-gradient(circle, $black-blue 0%, $blue-7 40%), radial-gradient(circle,$blue-4 0%, $black-blue 70%),//, url("./close_up.png")
        background-color: $blue-3
        background-repeat: no-repeat
        background-size: auto
        background-blend-mode: overlay,lighten,overlay,darken
        transform: scale(.75) translateX(-47px) translateY(-32px)            
@for $i from 1 through 5
  .face, .circle
    .wave
      .blob-fg
        &:nth-child(#{$i})
          &::after
            @include random_ani_duration(3, 7)
            @include random_ani_delay(1,3)
            @include random_hw(20, 50)
            @include random_left(15, 75)
</style>