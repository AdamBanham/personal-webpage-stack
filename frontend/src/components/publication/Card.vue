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
          {{ authors.join(", ") }} 
        </p>
      </div>
      <div class="pub-card-abstract">
        <p> {{ abstract }} </p>
      </div>
      <div class="pub-card-fill" />
      <div
        v-if="file != false"
        class="pub-card-download"
      >
        <div class="holder">
          <a 
            :href="fileURL" 
            target="_blank"
          > Click here to download a copy</a>
        </div>
      </div>
      <div
        v-else
        class="pub-card-download"
      >
        <p>Prepint not available</p>
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
        }
    },
  computed: {
    fileURL: function(){
      if (this.file == false) return "";
      console.log(`@/assets/${this.file}`)
      return this.getArticle(this.file)
    }
  },
  methods: {
    getArticle : function (file) {
      return new URL(`../../assets/${file}`, import.meta.url).href
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"

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
          width: 90%
          margin-left: 5%
          margin-right: 5%
          min-height: 10px
          max-height: 20px
          p 
            margin: 0 0 0 0
            text-align: center
            width: 100% 
            font-size: 8px
            color: $green-1
      .pub-card-authors
          margin-top: 5px
          width: 80%
          margin-left: 10%
          margin-right: 10%
          min-height: 10px
          max-height: 25px
          p
              margin: 0 0 0 0
              text-align: center
              width: 100% 
              font-size: 10px
              color: $green-2
      .pub-card-abstract
        max-height: 85px
        overflow-y: hidden
        width: 90%
        margin-left: 5%
        margin-right: 5%
        p 
          color: $green-3
          font-size: 10px
      .pub-card-fill
        display: flex 
        flex-grow: 1
      .pub-card-download
        width: 90%
        margin-left: 5%
        margin-right: 5%
        min-height: 15px
        max-height: 15px
        margin-bottom: 5px
        p 
          width: 100%
          margin: 0 0 0 0
          text-align: center 
          color: $red-5
        .holder 
          width: fit-content
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