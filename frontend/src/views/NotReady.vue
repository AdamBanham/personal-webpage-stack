<template>
<div class="content-bar">
  <div class="not-ready">
    <div class="content">
      <p> 
        I am currently building this page, come back later....
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "NotReady"
}
</script>

<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"
@import "@/styles/content.sass"

.not-ready
    width: 100%
    height: 60% 
    display: inline-flex
    justify-content: center
    align-items: center
    .content
        // margin-left: 100px
        max-width: 450px
        padding: 15px
        background-color: $green-2
        border-radius: 15px
        box-shadow: $green-1 2.5px 5px 5px 0.5px
        p 
            text-align: center
        ul
            text-align: left
</style>