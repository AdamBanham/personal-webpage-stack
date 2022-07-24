<template>
  <div class="toolbar">
    <div class="name">
      Adam P. Banham
    </div>
    <div class="choices">
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
@import "@/styles/coloursAnt.sass"
@import "@/styles/breakpoints.sass"
.toolbar
    position: relative
    width: 100vw 
    height: 40px
    background: linear-gradient($cyan-1, $cyan-5 90%)
    box-shadow: $green-1 0px 5px 3px 0.25px
    border-radius: 0px 0px 5px 5px
    display: inline-flex
    justify-content: flex-start
    z-index: 2000

    overflow-x: auto
    overflow-y: hidden

    @media (max-width: calc($tablet-width - 1px))
      height: 55px

    &::-webkit-scrollbar
      height: 15px
      width: 5px 
      background-color: none
    
    &::-webkit-scrollbar-thumb
      background-color: $green-3
      opacity: 0.6
      border-radius: 5px



    .choices
      display: inline-flex
      justify-content: center
      align-items: center
      width: 100%
      margin-left: 50px
      margin-right: 50px
      .choice 
        display: inline-flex
        justify-content: center
        align-items: center
        padding-left: 15px
        padding-right: 15px
        margin-left: 3px
        margin-right: 3px
        height: 40px
        text-align: center 
        vertical-align: middle
        border-radius: 7.5px
        color: $blue-1
        cursor: pointer
        font-size: 22px
        font-weight: bold
        &:hover 
            background-color: $cyan-5
            color: $cyan-1

        @media (max-width: calc($tablet-width - 1px))
          font-size: 15px
          
    .name
      margin-left: 25px
      font-size: 16px
      font-weight: bold
      color: $green-1
      width: 250px
      display: inline-flex
      justify-content: center
      align-items: center
      opacity: 0.6

      @media (max-width: calc($tablet-width - 1px))
        display: none
        
    
</style>