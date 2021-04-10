<template>
  <div class="face-holder">
        <div class="circle" v-for="i in Array.from({length:13}, (x,i) => i)" :key="i"></div>
        <div class="circle face" />
  </div>

</template>

<script>
export default {
name: "FaceHolder"
}
</script>

<style lang="sass" scoped>
@import "@/styles/colours.sass"
.face-holder
    position: relative
    height: 400px
    width: 400px
.circle
    background-color: $blue-8
    height: 400px
    width: 400px
    border-radius: 200px
    top: 0
    left: 0
    position: absolute
    &:nth-child(1)
        box-shadow: 0 0 100px 10px $blue-4
@for $i from 1 through 13
    $d : 19
    .circle
        &:nth-child(#{$i+1})
            filter: brightness((100% - ($i) *($d/2.2)))
            height: (400px - $i * $d)
            width: (400px - $i * $d)
            border-radius: (400px - $i * $d)/2
            top: $i * ($d/2) * 1px
            left: $i * ($d/2) * 1px
.face,.circle
    &:nth-child(14)
        filter: brightness(50%)
        height: 200px
        width: 225px
        border-radius: 140px
        background: url("./close_up.png"), radial-gradient(circle,$blue-4 5%, $blue-7 30%, $black-blue 75%),radial-gradient(circle, $black-blue 0%, $blue-7 40%), radial-gradient(circle,$blue-4 0%, $black-blue 70%),//, url("./close_up.png")
        // background-color: $blue-7
        background-repeat: no-repeat
        background-size: auto
        background-blend-mode: overlay,lighten,overlay,darken
        transform: scale(.75) translateX(-47px) translateY(-32px)
            
</style>