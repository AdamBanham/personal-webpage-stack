<template>
  <div class="face-holder">
        <div class="circle" v-for="i in Array.from({length:13}, (x,i) => i)" :key="i"></div>
        <img class="circle face" src="./close_up.png" alt="face" />
  </div>

</template>

<script>
export default {
name: "FaceHolder"
}
</script>

<style lang="sass">
.face-holder
    position: relative
    height: 400px
    width: 400px
.circle
    background-color: #2e3b6e
    height: 400px
    width: 400px
    border-radius: 200px
    top: 0
    left: 0
    position: absolute
    &:nth-child(1)
        box-shadow: 0 0 100px 10px cornflowerblue
@for $i from 1 through 13
    $d : 14
    .circle
        &:nth-child(#{$i+1})
            filter: brightness((100% - ($i) *($d/2)))
            height: (400px - $i * $d)
            width: (400px - $i * $d)
            border-radius: (400px - $i * $d)/2
            top: $i * ($d/2) * 1px
            left: $i * ($d/2) * 1px
.face
    background: revert
.face,.circle
    &:nth-child(14)
        filter: brightness(60%)
        height: auto
        width: auto
        transform: scale(.9) translateX(-8px) translateY(8px)
            
</style>