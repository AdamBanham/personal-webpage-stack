<template>
  <div class="article-viewer">
    <div class="content-bar">
      <div class="bread-crumbs">
        <div
          v-for="(path,i) in articleCrumbs"
          :key="i"
          class="crumb"
        >
          <p>{{ path }}</p>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import ArticleContent from "./content/allContent.js"

export default {
    name: "ArticleViewer",
    props: {
      articleId : {
        default : "dummy",
        type: String
      }
    },
    data : function() {
      return {
        dummy : ["Article", "Article Title"],
        contentDict: ArticleContent.contentDict
      }
    },
    computed : {
      articleInfo: function(){
        return this.contentDict[this.articleId]
      },
      articleCrumbs: function(){
        if (this.articleInfo == null){
          return this.dummy
        }
        return ["Blog Article", this.articleInfo.title]
      }
    }
}

</script>

<style lang="sass" scoped>
@import "@/styles/content.sass"
@import "@/styles/coloursAnt.sass"   

.content-bar
  .bread-crumbs
    display: flex
    flex-direction: row 
    .crumb
      // background-color: $background
      border-radius: 5px
      margin-left: 5px
      justify-content: center
      align-items: center
      padding-left: 2.5px
      padding-right: 2.5px
      p 
        color: $light-grey

      &::after
        content: "   >"
        color: $green-7

      &::last-child
        background-color: $blue-10
        &::after
          content: ""
</style>