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

<style lang="sass">
@import "@/styles/colours.sass"
.face-holder
    position: relative
    height: 400px
    width: 400px
.circle
    background-color: $blue-7
    height: 400px
    width: 400px
    border-radius: 200px
    top: 0
    left: 0
    position: absolute
    &:nth-child(1)
        box-shadow: 0 0 100px 10px cornflowerblue
@for $i from 1 through 13
    $d : 19
    .circle
        &:nth-child(#{$i+1})
            filter: brightness((100% - ($i) *($d/3)))
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
        background-image: url("./close_up.png")
        background-color: $blue-7
        background-repeat: no-repeat
        background-size: auto
        background-blend-mode: overlay
        transform: scale(.75) translateX(-47px) translateY(-32px)
            
</style>