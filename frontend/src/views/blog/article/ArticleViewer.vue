<template>
  <div class="article-viewer">
    <div class="content-bar">
      <div class="bread-crumbs">
        <v-breadcrumbs :items="articleCrumbs">
          <template v-slot:prepend>
            <v-icon icon="mdi-post" size="small" />
          </template>
        </v-breadcrumbs>
        <!-- <div
          v-for="(path,i) in articleCrumbs"
          :key="i"
          class="crumb"
        >
          <p
            v-if="path =='Blogs'"
            class="click-back"
            @click="moveToBlogs()"
          >
            {{ path }}
          </p>
          <h2 v-else>
            {{ path }}
          </h2>
        </div> -->
      </div>
      <div
        v-for="(comp,t) of articleInfo.getComponents()"
        :key="t"
        class="article-content"
      >
        <div
          v-if="comp.mode == 1"
          v-html="comp.value"
          class="text"
        />
        <div 
          v-else-if="comp.mode == 2"
          class="figure"
        >
          <section :id="'figure-'+ comp.count">
            <img
              :src="'/figures/'+comp.path"
              :alt="comp.alt"
            >
            <p>
              <a :href="'#figure-'+comp.count">
                <u>Figure {{ comp.count }}: </u></a> {{ ' '+comp.alt }}
            </p>
          </section>
        </div>
        <div 
          v-else-if="comp.mode == 3"
          class="quote"
        >
          <section :id="'quote-'+comp.count">
            <p class="quote-text" 
            v-html="comp.value">
            </p>
            <p class="quote-person">
              <a :href="'#quote-'+comp.count">
                <u>{{ comp.label }}</u>
              </a>
            </p>
          </section>
        </div>
        <div 
          v-else-if="comp.mode == 4"
          class="code"
        >
          <section :id="'snippet-'+comp.count">
            <VCodeBlock
              :code="comp.code"
              highlightjs
              :lang="comp.lang"
              theme="github-dark"
            />
            <p>
              <a :href="'#snippet-'+comp.count">
                <u>Snippet {{ comp.count }}: </u></a> {{ ' '+comp.label }}
            </p>
          </section>
        </div>
        <div v-else>
          <p> {{ comp }}</p>
        </div>
      </div>
      <h2 v-if="articleInfo.getReferences().length > 0">
        References:
      </h2>
      <ol>
        <section
          v-for="(comp,t) of articleInfo.getReferences()"
          :id="'ref-'+(t+1)"
          :key="t"
          class="reference"
        >
          <li>
            {{ comp.value }}
          </li>
        </section>
      </ol>
    </div> 
  </div>
</template>

<script>
import ArticleContent from "./content/allContent.js"
import VCodeBlock from '@wdns/vue-code-block';

export default {
    name: "ArticleViewer",
    components:{
      VCodeBlock
    },
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
        return [
          {title: "Blogs", disabled: false, href : "/blog", link: true}, 
          {title: this.articleInfo.title, disabled: false, link: false}
        ]
      }
    },
    methods: {
      moveToBlogs() {
        this.$router.back()
      }
    }
}

</script>

<style lang="sass">
@import "@/styles/content.sass"
@import "@/styles/coloursAnt.sass"   

.article-viewer
  .content-bar

    h2
      color: $light-grey
      margin: 0px
      padding-top: 8px
      padding-left: 15px
      width: 100%
      text-align: left

    .bread-crumbs
      display: flex
      flex-direction: row 

      > div
          margin-top: 20px

      p 
        display: inline-flex
        justify-content: center
        align-items: center
        text-align: center 

      .v-breadcrumbs__prepend
        color: $green-3
        i 
          color: $green-5
      
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
        h2
          font-size: larger
          color: $light-grey
          margin: 0px
          padding: 0px
          padding-top: 8px
          width: 100%
          text-align: center

        &::after
          content: "   >"
          color: $green-7
        
        &:last-child::after
          content: ""

        .click-back 
          color: $green-8
          &:hover
            cursor: pointer

    

    .article-content
      margin-top: 0px

      .text
        border-radius: 10px
        width: 92%
        text-align: center 
        margin: 2%
        padding: 2%
        background-color: $cyan-1
        color: $green-1
        p
          text-align: center
          display: inline
          color: $green-1
          a
            color: $green-3
          b 
            color: $green-2

      .figure
        border-radius: 10px
        width: 92%
        text-align: left 
        margin: 2%
        padding: 2%

        img 
          width: 100%
          margin: 0
        
        p 
          margin: 0
          margin-top: 5px
          width: 100%
          color: $black-blue
          justify-content: center
          align-items: flex-start

          a 
            color: $black-blue
            min-width: 75px
            &::after
              content: " "
              padding-right: 2px

      .code 
        border-radius: 10px
        width: 92%
        text-align: left 
        margin: 2%
        padding: 2%
        padding-top: 0%

        p 
          margin: 0
          margin-top: 5px
          width: 100%
          justify-content: center
          align-items: flex-start
          color: $black-blue

          a 
            color: $black-blue
            min-width: 70px
            &::after
              content: " "
            

      .quote
        border-radius: 10px
        width: 92%
        text-align: left 
        margin: 2%
        padding: 2%
        padding-top: 0

        .quote-text
          width: 90%
          text-align: center
          margin: 0px
          padding: 0px
          padding-left: 5%
          padding-right: 5%
          color: $green-9
          justify-content: center
          display: inline-flex
          flex-direction: column
          margin-bottom: 5px

          b 
            display: contents

          &::before
            align-self: flex-start
            content: "''"
            padding-right: 10px
            font-size: xx-large
            color: $black-blue
            
          &::after
            align-self: flex-end
            content: "''"
            padding-right: 10px
            transform: rotate(180deg)
            font-size: xx-large
            color: $black-blue
        
        .quote-person
          margin: 0px
          padding: 0px
          width: 85%
          padding-right: 15%
          color: $black-blue
          text-align: right
          justify-content: right
          font-style: italic
          font-weight: bold

          a
            color: $black-blue

    .reference 
        li
          color: $black-blue
    
    ol 
      padding: 25px
      padding-top: 5px
</style>