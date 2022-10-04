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
      <div class="pub-card-abstract">
        <p> {{ abstract }} </p>
      </div>
      <div class="pub-card-fill" />
      <div
        
        class="pub-card-download"
      >
        <div v-if="doi != false">
          <a
            :href="doi"
            target="_blank"
          > doi </a>
        </div>
        <div class="holder">
          <a 
            v-if="file != false" 
            :href="fileURL"
            target="_blank"
          > download</a>
          <p v-else>
            N/A
          </p>
        </div>
        <div v-if="bibtex != false">
          <a
            :href="bibtexURL"
            target="_blank"
          > bibtex </a>
        </div>
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
  computed: {
    fileURL: function(){
      if (this.file == false) return "";
      return this.getURL(this.file)
    },
    bibtexURL: function(){
      if (this.bibtex == false) return "";
      return this.getURL(this.bibtex)
    }
  },
  methods: {
    getURL : function (file) {
      return new URL(`../../assets/${file}`, import.meta.url).href
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"
@import "@/styles/breakpoints.sass"

.pub-card
    margin-left: 10%
    margin-right: 10%
    min-width: 80%
    max-width: 80%
    min-height: 200px
    max-height: 200px
    background-color: $green-10
    margin-bottom: 10px
    border-radius: 8px
    display: flex
    flex-grow: 1
    flex-direction: row

    @media (min-width: $desktop-width)
      min-height: 225px
      max-height: 225px

    @media (max-width: calc($desktop-width - 1px)) and (min-width: $mobile-width)
      min-height: 225px
      max-height: 225px

    @media (max-width: calc($mobile-width - 1px))
      min-height: 275px
      max-height: 275px

    .pub-card-left
      padding-top: 5px 
      padding-left: 5px
      padding-right: 5px
      display: flex
      width: 25 
      min-height: 100%
      background-color: $light-grey
      border-radius: 8px
      justify-content: center
      justify-items: center
      .pub-card-year
        margin: auto
        p
          font-size: 16px
          font-weight: bold
          color: $red-5
          margin: 0 0 0 0
          writing-mode: vertical-rl

    .pub-card-right
      display: flex 
      flex-direction: column
      flex-grow: 1
      .pub-card-title
          margin-top: 10px
          width: 100%
          h3
              margin: 0 0 0 0
              font-size: 13px
              text-align: center
              color: $green-1
              width: 100%
      .pub-card-venue
          margin-top: 2px
          margin-bottom: 10px
          width: 90%
          margin-left: 5%
          margin-right: 5%
          min-height: 10px
          max-height: 20px
          @media (max-width: calc($mobile-width - 1px))
            min-height: 10px
            max-height: 30px
          p 
            margin: 0 0 0 0
            text-align: center
            width: 100% 
            font-size: 8px
            color: $green-1
      .pub-card-authors
          margin-top: 10px
          width: 80%
          margin-left: 10%
          margin-right: 10%
          min-height: 10px
          max-height: 25px
          @media (max-width: calc($mobile-width - 1px))
            min-height: 10px
            max-height: 50px
            margin-bottom: 10px
          p
              margin: 0 0 0 0
              text-align: center
              width: 100% 
              font-size: 10px
              color: $green-2
      .pub-card-abstract
        margin-top: 10px
        overflow-y: hidden
        width: 90%
        margin-left: 5%
        margin-right: 5%
        flex-grow: 1
        p 
          color: $green-3
          font-size: 10px
      .pub-card-fill
        width: 100%
        min-height: 5px
      .pub-card-download
        width: 90%
        margin-left: 5%
        margin-right: 5%
        min-height: 25px
        max-height: 25px
        margin-bottom: 5px
        display: flex
        div 
          width: fit-content
          box-shadow: 0 2px 0 0px $background-light
          justify-content: center
          justify-items: center
          height: 15px
          margin: 0 0 0 0
          background-color: white
          border-radius: 5px
          padding: 5px
        p 
          width: 100%
          margin: 0 0 0 0
          text-align: center 
          color: $red-5
        .holder 
          margin-left: auto
          margin-right: auto
        a 
          text-align: center
          color: $blue-1
          &:link 
            color: $blue-1
            text-decoration: none
          &:visited 
              color: $blue-1
          &:hover
              color: $red-5
              cursor: pointer
          &:active 
              color: $yellow-10
</style>