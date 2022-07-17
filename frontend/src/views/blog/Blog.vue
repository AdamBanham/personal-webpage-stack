<template>
  <div class="blog">
    <div class="filter-bar">
      <div class="section">
        <h3> Projects </h3>
        <div class="options">
          <p> Exogenous Data</p>
          <p> vispm </p>
          <p> PhD </p>
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
      <h2> Posts </h2>
      <div
        v-for="info in infos"
        :key="info.title"
        class="detail-card"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { manager } from "./contentManager"

export default {
name: "BlogPage",
data : function() {
  return {
    manager : manager
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
    margin-left: calc( (100vw - 650px)/2 )
    box-shadow: $background -5px 0px 15px -5px
    z-index: 5

    h2
        text-align: center 
        color: $green-5

.detail-card
    &:hover
        cursor: pointer 
        background: $green-10

.filter-bar
    position: absolute
    z-index: 4
    width: 650px
    margin-left: calc( ((100vw - 650px)/2) - 150px )
    display: flex
    flex-grow: 1
    flex-direction: column
    flex-flow: column
    min-height: 100vh
    background-color: $light-grey
    padding-bottom: 75px

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