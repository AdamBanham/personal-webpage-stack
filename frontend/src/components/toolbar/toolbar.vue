<template>
  <div class="toolbar">
    <div
      class="choice"
      @click="moveTo('home')"
    >
      Home
    </div>
    <div
      class="choice"
      @click="moveTo('blog')"
    >
      Blog
    </div>
    <div
      class="choice"
      @click="moveTo('pubs')"
    >
      Publications
    </div>
    <div
      class="choice"
      @click="moveTo('code')"
    >
      Coding
    </div>
    <div
      class="choice"
      @click="moveTo('contact')"
    >
      Contact
    </div>
  </div>
</template>

<script>
export default {
name: "Toolbar",
methods : {
    moveTo: function(name){
        this.$router.push({name:name})
    }
}
}
</script>

<style lang="sass" scoped>
@import "@/styles/colours_ant.sass"
.toolbar
    width: 100% 
    height: 50px
    background-color: $green-3
    box-shadow: $green-1 0px 5px 5px 0.5px
    border-radius: 0px 0px 15px 15px
    display: inline-flex
    justify-content: center
    align-items: center
    .choice 
        display: inline-flex
        justify-content: center
        align-items: center
        padding-left: 10px
        padding-right: 10px
        margin-left: 15px
        margin-right: 15px
        height: 50px
        text-align: center 
        vertical-align: middle
        border-radius: 7.5px
        color: $green-10 
        cursor: pointer
        font-size: 22px
        &:hover 
            background-color: $green-9
            color: $green-1
</style>