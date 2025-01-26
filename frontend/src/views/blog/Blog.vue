<template>
  <div class="blow-view">
    <div class="filter-bar">
      <h2> Quick Search Bar </h2>
      <div class="filter-section">
        <h3> Tags </h3>
        <div 
          class="options" 
          v-for:="tag in blogtags"
        >
          <input
            :id="tag"
            type="checkbox"
            @change="checkFilter($event,1, tag)"
          >
          <label 
            :for="tag" 
          >{{ tag }}</label>
        </div>
      </div>
      <div class="filter-section">
        <h3> Year </h3>
        <div
          class="options"
          v-for:="year in years"
        >
          <input
            :id="year"
            type="checkbox"
            @change="checkFilter($event,2, year)"
          >
          <label :for="year">{{ year }}</label>
        </div>
      </div>
      <div class="filter-section">
        <h3> Month </h3>
        <div
          class="options"
          v-for:="month in months"
        >
          <input
            :id="month"
            type="checkbox"
            @change="checkFilter($event,3, month)"
          >
          <label :for="month">{{ month }}</label>
        </div>
      </div>
      <div class="filter-section">
        <h3> Author </h3>
        <div
          class="options"
          v-for:="author in authors"
        >
          <input
            :id="author"
            type="checkbox"
            @change="checkFilter($event,4, author)"
          >
          <label :for="author">{{ author }}</label>
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
            <h3>{{ info.authors.join(", ") }}</h3>
            <h4>{{ info.month }}, {{ info.year }}</h4>
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
    infos : manager.getInfo(),
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
},
methods: {
  moveToExpansion(expansionId){
    // debugger;
    this.$router.push(
      this.$router.currentRoute.value.path + 
      "/" + expansionId
    )
  },
  checkFilter(event, mode, value){
    if (event.target.checked){
      this.manager.addFilter(mode, value)
    } else {
      this.manager.removeFilter(mode,value)
    }
    this.infos = this.manager.getInfo()
  }
}
}
</script>

<style lang="sass" scoped>
@use "@/styles/content.sass" as cont
@use "@/styles/coloursAnt.sass" as c 
@use "@/styles/breakpoints.sass" as brk

.blow-view 
  // width: 100%
  // height: 100%
  // z-index: 50

  .content-bar
      position: absolute
      box-shadow: c.$background -5px 0px 15px -5px
      // z-index: 5

      @media (min-width: brk.$desktop-width)
        margin-left: calc( (100vw - cont.$content-width-full)/2 )

      @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        margin-left: calc( (100vw - cont.$content-width-medium)/2 )

      @media (max-width: calc(brk.$tablet-width - 1px))
        
      > div
        margin-top: 20px  

      h2
        text-align: center 
        text-transform: capitalize
        color: c.$green-5
        margin-bottom: 5px

      p 
        display: inline-flex
        justify-content: center
        align-items: center
        text-align: center 

  .detail-card
      padding-top: 20px
      padding-bottom: 20px
      height: fit-content

      h3 
        text-align: center 
        color: c.$green-1
        margin: 0px
        padding: 0px

      h4 
        text-align: center 
        color: c.$green-1
        margin: 0px
        padding: 0px

      &:hover
          cursor: pointer 
          background: c.$green-10

      .body
        flex-direction: column
        align-items: center
        justify-items: center

        .tags
          background-color: c.$yellow-1
          margin-left: 4px
          border-radius: 5px
          padding: 6px
          color: c.$light-grey

  .filter-bar
      position: absolute
      padding-top: 75px
      width: 650px
      display: flex
      flex-grow: 1
      flex-direction: column
      flex-flow: column
      min-height: 100vh
      background-color: c.$light-grey
      padding-bottom: 75px

      @media (min-width: brk.$desktop-width)
        margin-left: calc( ((100vw - cont.$content-width-full)/2) - 200px )

      @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        margin-left: calc( ((100vw - cont.$content-width-medium)/2) - 200px )

      @media (max-width: calc(brk.$tablet-width - 1px))

      div 
          width: 150px
          text-align: center

      h2 
          font-size: 16px
          text-align: center
          width: 200px
          color: c.$green-4    
      
      h3 
          font-size: 16px
          color: c.$green-2

      .options
        width: 100%
        color: c.$green-2
        display: inline-flex
        text-align: left
        justify-content: center
        padding-left: 10px
        &:hover
          background-color: c.$background-light
          color: c.$light-grey
          cursor: pointer
        label
          width: 100%
          padding-left: 10px
          font-size: 14px

      .filter-section
          margin-bottom: 25px 
          width: 200px
          justify-content: left

          p 
              text-align: left
              padding-left: 20px
              color: c.$green-2
              &:hover
                  background-color: c.$background-light
                  color: c.$light-grey
                  cursor: pointer

  .filter-bar > :first-child
      margin-top: 50px
</style>