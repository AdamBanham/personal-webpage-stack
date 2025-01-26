<template>
  <div class="article-viewer">
    <div class="content-bar">
      <div class="bread-crumbs">
        <v-breadcrumbs :items="articleCrumbs">
          <template #prepend>
            <v-icon
              icon="mdi-post"
              size="small"
            />
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
          class="text"
          v-html="comp.value"
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
            <p
              class="quote-text" 
              v-html="comp.value"
            />
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
        <div
          v-else-if="comp.mode == 5"
          class="profile"
        >
          <div
            :class="{
              'l-align header' : comp.align == 'L',
              'r-align header' : comp.align == 'R'
            }"
          >
            <h3>{{ comp.name }}</h3>
            <img
              :src="'/profiles/'+comp.photo"
              :alt="comp.name"
            >  
          </div>
          <div
            :class="{
              'r-align blur text' : comp.align == 'L',
              'l-align blur text' : comp.align == 'R'
            }"
          >
            <p>{{ comp.blur }}</p>  
          </div>
        </div>
        <div 
          v-else-if="comp.mode == 6"
          class="youtube"
        >
          <p
            v-if="comp.pretext.length > 0"
            class="pretext text"
            v-html="comp.pretext"
          />
          <section :id="'clip-'+ comp.clipNo">
            <p class="clip-caption">
              <a :href="'#clip-'+comp.clipNo">
                <u>Clip {{ comp.clipNo }}: </u></a> {{ ' '+comp.title }}
            </p>
            <iframe
              class="youtube-clip-frame" 
              :src="comp.youtube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          </section>
          <p
            v-if="comp.posttext.length > 0"
            class="postext text"
            v-html="comp.posttext"
          />
        </div>
        <div 
          v-else-if="comp.mode == 7"
          class="pdf"
        >
          <section :id="'file-'+ comp.fileNo">
            <p class="file-caption">
              <a :href="'#file-'+comp.fileNo">
                <u>File {{ comp.fileNo }}: </u></a> {{ ' '+comp.title }}
            </p>
            <object
              class="pdf-embed"
              :data="'/docs/blog/'+comp.file"
              type="application/pdf"
            >
              <embed 
                :src="'/docs/blog/'+comp.file+'#zoom=FitW'"
                type="application/pdf"
              >
              <!-- alt : <a :href="'/docs/blog/'+comp.file">{{ comp.title }}.pdf</a> -->
            </object>
          </section>
        </div>
        <div 
          v-else-if="comp.mode == 8"
          class="carousel"
        >
          <section :id="'carousel-'+comp.carouselNo">
            <p class="carousel-caption">
              <a :href="'#carousel-'+comp.carouselNo">
                <u>Carousel {{ comp.carouselNo }}: </u></a> {{ ' '+comp.title }}
            </p>
            <v-carousel
              :progress="true"
              :hide-delimiters="true"
            >
              <v-carousel-item 
                v-for="(pic,t) of comp.photos"
                :key="t"
                :src="pic.src"
              >
                <v-responsive dark>
                  <v-container fill-height>
                    <v-layout align-center>
                      <div class="flex">
                        <h3 class="display-3">
                          {{ pic.header }}
                        </h3>
                        <span class="subheading"> 
                          {{ pic.subtitle }}
                        </span>
                      </div>
                    </v-layout>
                  </v-container>
                </v-responsive>
              </v-carousel-item>
            </v-carousel>
          </section>
        </div>
        <div
          v-else-if="comp.mode == 9"
          class="definition text"
        >
          <h4>
            Definition {{ comp.defNo }}: {{ comp.name }}
          </h4>
          <p
            v-html="comp.content" 
          />
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
          {title: "Blogs", disabled: false, to : "/blog", link: true}, 
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
@use "@/styles/content.sass" 
@use "@/styles/coloursAnt.sass" as c

.article-viewer
  .content-bar

    h2
      color: c.$light-grey
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
        color: c.$green-3
        i 
          color: c.$green-5
      
      .crumb
        // background-color: $background
        border-radius: 5px
        margin-left: 5px
        justify-content: center
        align-items: center
        padding-left: 2.5px
        padding-right: 2.5px
        p 
          color: c.$light-grey
        h2
          font-size: larger
          color: c.$light-grey
          margin: 0px
          padding: 0px
          padding-top: 8px
          width: 100%
          text-align: center

        &::after
          content: "   >"
          color: c.$green-7
        
        &:last-child::after
          content: ""

        .click-back 
          color: c.$green-8
          &:hover
            cursor: pointer

    

    .article-content
      margin-top: 0px

      .text
        border-radius: 10px
        width: 96%
        text-align: center 
        margin: 2%
        padding: 2%
        background-color: c.$cyan-1
        color: c.$green-1
        p
          text-align: center
          display: inline
          color: c.$green-1
          b 
            color: c.$green-2
          a
            color: c.$blue-6
        a
          color: c.$blue-6

      .profile

        .text 
          background-color: c.$green-1
          p
            color: c.$gray-7

        .l-align
          justify-content: left

        .r-align
          justify-content: right 

        .header 
          display: inline-flex 
          text-align: center
          justify-items: center
          align-items: center
          margin-top: auto 
          margin-left: 5%
          margin-right: 5%
          margin-bottom: auto 
          padding-left: 10px 
          padding-right: 10px
          max-height: 80px
          width: 90%

          h3
            padding-left: 10px
            padding-right: 10px

          img 
            width: 75px
            height: 75px
            border-radius: 15px


      .figure
        border-radius: 10px
        width: 96%
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
          color: c.$black-blue
          justify-content: center
          align-items: flex-start

          a 
            color: c.$black-blue
            min-width: 75px
            &::after
              content: " "
              padding-right: 2px

      .code 
        border-radius: 10px
        width: 96%
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
          color: c.$black-blue

          a 
            color: c.$black-blue
            min-width: 70px
            &::after
              content: " "
            

      .quote
        border-radius: 10px
        width: 96%
        text-align: left 
        margin: 2%
        padding: 2%
        padding-top: 0

        .quote-text
          width: 100%
          text-align: center
          margin: 0px
          padding: 0px
          padding-left: 5%
          padding-right: 5%
          color: c.$green-9
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
            color: c.$black-blue
            
          &::after
            align-self: flex-end
            content: "''"
            padding-right: 10px
            transform: rotate(180deg)
            font-size: xx-large
            color: c.$black-blue
        
        .quote-person
          margin: 0px
          padding: 0px
          width: 85%
          padding-right: 15%
          color: c.$black-blue
          text-align: right
          justify-content: right
          font-style: italic
          font-weight: bold

          a
            color: c.$black-blue

    .reference 
        li
          color: c.$black-blue
    
    .youtube 

      .clip-caption
        text-align: center
        padding-top: 10px
        padding-bottom: 10px

      .youtube-clip-frame
        width: 90%
        margin-left: 5% 
        margin-right: auto
        height: 360px
        border-radius: 15px
        border: none
    
    .pdf 

      .file-caption
        text-align: center
        padding-top: 5px
        padding-bottom: 5px

      .pdf-embed
        width: 96%
        height: 800px
        margin-left: 2%
        margin-right: 2%
        border-radius: 15px

    .carousel

      .carousel-caption
        padding-top: 10px
        padding-bottom: 10px
        text-align: center

    .definition
      background-color: c.$gray-2 !important

      h4 
        text-align: left
        color: c.$gray-7

      p
        color: c.$gray-5 !important
        text-align: left !important


    ol 
      padding: 25px
      padding-top: 5px
</style>