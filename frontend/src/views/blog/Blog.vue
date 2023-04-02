<template>
  <div class="blog">
    <div class="filter-bar">
      <div class="section">
        <h3> Tags </h3>
        <div 
          class="options" 
          v-for:="tag in blogtags"
        >
          <p> {{ tag }} </p>
        </div>
      </div>
      <div class="section">
        <h3> Year </h3>
        <div
          class="options"
          v-for:="year in years"
        >
          <p> {{ year }}</p>
        </div>
      </div>
      <div class="section">
        <h3> Month </h3>
        <div
          class="options"
          v-for:="month in months"
        >
          <p> {{ month }}</p>
        </div>
      </div>
      <div class="section">
        <h3> Author </h3>
        <div
          class="options"
          v-for:="author in authors"
        >
          <p> {{ author }}</p>
        </div>
      </div>
    </div>
    <div class="content-bar">
      <h2> Blog Articles </h2>
      <div
        v-for="info in infos"
        :key="info.title"
        class="detail-card"
        @click="moveToExpansion(info.expansion)"
      >
        <div class="header">
          <div class="title">
            <h2>{{ info.title }} </h2>
          </div>
        </div>
        <div class="body">
          <div class="info">
            <p> {{ info.overview }} </p>
          </div>
          <div>
            <p
              v-for="tag in info.tags" 
              :key="tag"
              class="tags"
            >
              {{ tag }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { manager } from "./contentManager"
import { TAGS } from "./tagList"

export default {
name: "BlogPage",
data : function() {
  return {
    manager : manager,
    blogtags : Object.values(TAGS)
  }
},
computed : {
    titles : function() {
        return manager.getTitles();
    },
    years : function() {
        return manager.getYears();
    },
    months : function() {
        return manager.getMonths();
    },
    authors : function() {
        return manager.getAuthors();
    },
    infos : function() {
        return manager.getInfo();
    }
},
methods: {
  moveToExpansion(expansionId){
    // debugger;
    this.$router.push(
      this.$router.currentRoute.value.path + 
      "/" + expansionId
    )
  }
}
}
</script>

<style lang="sass" scoped>
@import "@/styles/content.sass"
@import "@/styles/coloursAnt.sass"    

.blog 
    width: 100%
    height: 100%
    z-index: 50

.content-bar
    position: absolute
    box-shadow: $background -5px 0px 15px -5px
    z-index: 5

    @media (min-width: $desktop-width)
      margin-left: calc( (100vw - $content-width-full)/2 )

    @media (max-width: calc($desktop-width - 1px)) and (min-width: $tablet-width)
      margin-left: calc( (100vw - $content-width-medium)/2 )

    @media (max-width: calc($tablet-width - 1px))
      

    h2
        text-align: center 
        text-transform: capitalize
        color: $green-5

.detail-card
    height: 180px

    &:hover
        cursor: pointer 
        background: $green-10

    .body
      flex-direction: column
      align-items: center
      justify-items: center

      .tags
        background-color: $yellow-1
        margin-left: 4px
        border-radius: 5px
        padding: 6px
        color: $light-grey

.filter-bar
    position: absolute
    z-index: 4
    width: 650px
    
    display: flex
    flex-grow: 1
    flex-direction: column
    flex-flow: column
    min-height: 100vh
    background-color: $light-grey
    padding-bottom: 75px

    @media (min-width: $desktop-width)
      margin-left: calc( ((100vw - $content-width-full)/2) - 150px )

    @media (max-width: calc($desktop-width - 1px)) and (min-width: $tablet-width)
      margin-left: calc( ((100vw - $content-width-medium)/2) - 150px )

    @media (max-width: calc($tablet-width - 1px))

    div 
        width: 150px
        text-align: center
    
    h3 
        font-size: 16px
        color: $green-2

    .section
        margin-bottom: 25px 


        p 
            color: $green-2
            margin: 5px 0 0 0 
            &:hover
                background-color: $background-light
                color: $light-grey
                cursor: pointer

.filter-bar > :first-child
    margin-top: 50px


</style>