<template>
  <div class="pub-card">
    <div class="pub-card-left">
      <div class="pub-card-year">
        <p> {{ year }} </p>
      </div>
    </div>
    <div class="pub-card-right">
      <div class="pub-card-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="pub-card-venue">
        <p>{{ venue }}</p>
      </div>
      <div class="pub-card-authors">
        <p>
          <i>{{ authors.join(", ") }}</i> 
        </p>
      </div>
      <div
        class="pub-card-abstract"
        :class="{
          'hidden' : hidden
        }"
        @click="toggleHidden"
      >
        <p> {{ abstract }} </p>
      </div>
      <div class="pub-card-fill" />
      <div
        class="pub-card-download"
      >
        <v-btn
          v-if="doi != false"
          prepend-icon="mdi-web"
          size="x-small"
          elevation="2"
          :href="doi"
          target="_black"
          variant="tonal"
        >
          doi
        </v-btn>
        <v-btn
          v-if="file != false"
          prepend-icon="mdi-file-download-outline"
          size="x-small"
          elevation="2"
          :href="fileURL"
          target="_black"
          variant="tonal"
        >
          download
        </v-btn>
        <v-btn
          v-if="bibtex != false"
          prepend-icon="mdi-file-document-outline"
          size="x-small"
          elevation="2"
          :href="bibtexURL"
          target="_black"
          variant="tonal"
        >
          bibtex
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name : "PubCard",
    props: {
        'title' : {
            type: String,
            required: true,
            default: "Working Title"
        },
        'authors' : {
            type: Array,
            required : true 
        },
        'year' : {
            type: [String , Number],
            required: false,
            default: "TBA"
        },
        'venue' : {
          type: String,
          required: false,
          default: "TBA"
        },
        'abstract' : {
          type: String,
          required: true,
          default: "Coming soon..."
        },
        'file' : {
          type: [String,Boolean],
          required: false,
          default: false
        },
        'doi' : {
          type: [Boolean, String],
          required: false,
          default: false
        },
        'bibtex' : {
          type: [Boolean, String],
          required: false,
          default: false
        }
    },
  data: function(){
    return {
      hidden: true
    }
  },
  computed: {
    fileURL: function(){
      if (this.file == false) return "";
      return this.getPublic(this.file)
    },
    bibtexURL: function(){
      if (this.bibtex == false) return "";
      return this.getPublic(this.bibtex)
    }
  },
  methods: {
    getPublic : function(file) {
      return `/${file}`;
    },
    toggleHidden : function(){
      this.hidden = !this.hidden
    }
  }
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/breakpoints.sass" as brk

.pub-card
    margin-left: 3%
    margin-right: 3%
    min-width: 94%
    max-width: 94%
    min-height: 160px
    background-color: c.$green-10
    margin-bottom: 10px
    border-radius: 8px
    display: flex
    flex-grow: 1
    flex-direction: row
    transition: all 1s ease

    .pub-card-left
      padding-top: 5px 
      padding-left: 5px
      padding-right: 5px
      display: flex
      width: 25 
      min-height: 100%
      background-color: c.$light-grey
      border-radius: 8px
      justify-content: center
      justify-items: center

      .pub-card-year
        margin: auto
        p
          font-size: 16px
          font-weight: bold
          color: c.$red-5
          margin: 0 0 0 0
          writing-mode: vertical-rl

    .pub-card-right
      display: flex 
      flex-direction: column
      flex-grow: 1

      .hidden
        flex: 0 1 25px !important
        &:hover
          &::after
              content: "+" !important
              font-size: 30px !important
              top: -15% !important

      .pub-card-title
          margin-top: 10px
          width: 100%
          h3
              margin: 0 0 0 0
              font-size: 13px
              text-align: center
              color: c.$green-1
              width: 100%
      .pub-card-venue
          margin-top: 2px
          margin-bottom: 10px
          width: 90%
          margin-left: 5%
          margin-right: 5%
          min-height: 10px
          max-height: 20px
          @media (max-width: calc(brk.$mobile-width - 1px))
            min-height: 10px
            max-height: 30px
          p 
            margin: 0 0 0 0
            text-align: center
            width: 100% 
            font-size: 8px
            color: c.$green-1
      .pub-card-authors
          margin-top: 10px
          width: 80%
          margin-left: 10%
          margin-right: 10%
          min-height: 10px
          max-height: 25px
          @media (max-width: calc(brk.$mobile-width - 1px))
            min-height: 10px
            max-height: 50px
            margin-bottom: 10px
          p
              margin: 0 0 0 0
              text-align: center
              width: 100% 
              font-size: 10px
              color: c.$green-2

      .pub-card-abstract
        margin-top: 10px
        width: 90%
        margin-left: 5%
        margin-right: 5%
        min-height: 10px
        flex: 1 0 250px
        background-color: none
        transition: all 1s ease
        flex-grow: 20
        grid-template-rows: 1fr
        position: relative
        overflow: hidden

        p 
          color: c.$green-3
          font-size: 10px
          
        &:hover
          background-color: #bfbfbf5e
          cursor: pointer

          &::after
            position: absolute
            top: 20%
            left: 46%
            content: "-"
            color: c.$black-blue
            font-size: 100px
            opacity: 0.5

      .pub-card-fill
        width: 100%
        min-height: 5px
      .pub-card-download
        width: 90%
        max-width: 90%
        margin-left: 5%
        margin-right: 5%
        min-height: 25px
        max-height: 50px
        margin-bottom: 5px
        padding-top: 5px
        display: flex
        justify-content: center
        justify-items: center
        font-size: 12px

        .v-btn
          flex-grow: 1
          margin-left: 15px

        a 
          text-align: center
          justify-content: center
          justify-items: center
          color: c.$blue-1
          &:link 
            color: c.$blue-1
            text-decoration: none
          &:visited 
              color: c.$blue-1
          &:hover
              color: c.$red-5
              cursor: pointer
          &:active 
              color: c.$yellow-10
</style>