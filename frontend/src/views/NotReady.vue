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
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/content.sass" as cont

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
        background-color: c.$green-2
        border-radius: 15px
        box-shadow: c.$green-1 2.5px 5px 5px 0.5px
        p 
            text-align: center
        ul
            text-align: left
</style>