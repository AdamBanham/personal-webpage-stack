<template>
  <div
    :id="paperId || null"
    class="pub-card"
    :class="{ selected }"
    @click="selectCard"
    @focusin="selectCard"
  >
    <div class="pub-card-left">
      <div class="pub-card-year">
        <p>{{ year }}</p>
      </div>
    </div>
    <div class="pub-card-right">
      <div class="pub-card-topbar">
        <v-btn
          v-if="paperId"
          class="pub-card-copy"
          icon
          size="x-small"
          elevation="2"
          variant="tonal"
          aria-label="Copy direct link"
          @click="copyPaperLink"
        >
          <v-icon :icon="copied ? 'mdi-check' : 'mdi-link-variant'" />
        </v-btn>

        <div class="pub-card-title">
          <h3>{{ title }}</h3>
        </div>

        <div class="pub-card-citations" v-if="hasCitations">
            <span class="pub-card-citations-value">{{ citations }}</span>
            <span class="pub-card-citations-label">citations</span>
        </div>
      </div>

      <div class="pub-card-venue">
        <p>{{ venue }}</p>
      </div>
      <div class="pub-card-authors">
        <p>
          <i>{{ authors.join(", ") }}</i>
        </p>
      </div>
      <details
        class="pub-card-abstract"
        :class="{ hidden: hidden }"
      >
        <summary @click="toggleHidden">
          <span class="mdi mdi-magnify"></span><strong>Abstract:</strong>
        </summary>
        <p>{{ abstract }}</p>
      </details>
      <div class="pub-card-fill" />
      <div class="pub-card-download">
        <v-btn
          v-if="doi != false"
          prepend-icon="mdi-web"
          size="x-small"
          elevation="2"
          :href="doi"
          target="_blank"
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
          target="_blank"
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
          target="_blank"
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
  name: "PubCard",
  props: {
    title: {
      type: String,
      required: true,
      default: "Working Title"
    },
    authors: {
      type: Array,
      required: true
    },
    year: {
      type: [String, Number],
      required: false,
      default: "TBA"
    },
    venue: {
      type: String,
      required: false,
      default: "TBA"
    },
    abstract: {
      type: String,
      required: true,
      default: "Coming soon..."
    },
    file: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    doi: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    bibtex: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    paperId: {
      type: String,
      required: false,
      default: ""
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    citations: {
      type: [String, Number, Boolean],
      required: false,
      default: false
    }
  },
  data: function() {
    return {
      hidden: true,
      copied: false
    }
  },
  computed: {
    hasCitations: function() {
      return this.citations !== false && this.citations !== null && this.citations !== undefined && this.citations !== ""
    },
    fileURL: function() {
      if (this.file == false) return ""
      return this.getPublic(this.file)
    },
    bibtexURL: function() {
      if (this.bibtex == false) return ""
      return this.getPublic(this.bibtex)
    }
  },
  methods: {
    selectCard: function() {
      this.$emit("select-card", this.paperId)
    },
    getPublic: function(file) {
      return `/${file}`
    },
    toggleHidden: function() {
      this.hidden = !this.hidden
    },
    copyToClipboard: async function(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return
      }

      const helper = document.createElement("textarea")
      helper.value = text
      helper.style.position = "fixed"
      helper.style.left = "-9999px"
      document.body.appendChild(helper)
      helper.focus()
      helper.select()
      document.execCommand("copy")
      document.body.removeChild(helper)
    },
    copyPaperLink: async function() {
      try {
        this.selectCard()
        const fullPath = this.$route.fullPath.split("#")[0]
        const shareUrl = `${window.location.origin}${fullPath}#${this.paperId}`
        await this.copyToClipboard(shareUrl)
        this.copied = true
        window.setTimeout(() => {
          this.copied = false
        }, 1800)
      } catch (error) {
        console.error("Failed to copy paper link", error)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/breakpoints.sass" as brk
@use "sass:color"

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
    transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease
    scroll-margin-top: 74px
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08)

    &.selected
      background-color: color.adjust(c.$green-10, $lightness: -10%)
      transform: translateY(-2px)
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18)

    &:target
      box-shadow: 0 0 0 3px color.adjust(c.$yellow-10, $alpha: -0.3)

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
          margin: 0
          writing-mode: vertical-rl

    .pub-card-right
      display: flex
      flex-direction: column
      flex-grow: 1

      .pub-card-topbar
        display: flex
        width: 93%
        margin-left: 2%
        margin-right: 5%
        margin-top: 10px
        display: grid
        grid-template-columns: 10% 68% 25%
        align-items: center
        gap: 2.5px
        min-height: 28px

      .pub-card-copy
        justify-self: start
        color: #000 !important

        :deep(.v-icon)
          color: #000 !important

      .pub-card-title
        width: 100%
        min-width: 0
        flex-grow: 1

        h3
          margin: 0
          font-size: 13px
          text-align: center
          color: c.$green-1
          width: 100%
          white-space: normal
          overflow-wrap: anywhere
          word-break: break-word
          line-height: 1.2

      .pub-card-citations
        display: inline-flex
        align-items: baseline
        justify-content: flex-end
        gap: 6px
        padding: 3px 10px
        border-radius: 999px
        background-color: color.adjust(c.$light-grey, $alpha: -0.78)
        color: c.$green-2
        border: 1px solid color.adjust(c.$green-1, $alpha: -0.45)
        font-size: 11px
        letter-spacing: 0.4px
        white-space: nowrap
        justify-self: end
        min-height: 24px

        &.empty
          background-color: transparent
          border-color: transparent

        .pub-card-citations-value
          font-size: 13px
          font-weight: 700

        .pub-card-citations-label
          text-transform: uppercase

      .hidden
        flex: 0 1 25px !important

        &:hover
          &::after
            content: "+" !important
            font-size: 30px !important
            top: -10px !important

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
          margin: 0
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
          margin: 0
          text-align: center
          width: 100%
          font-size: 10px
          color: c.$green-2

      .pub-card-abstract
        padding: 0px 15px 15px 15px
        margin-top: 10px
        width: 90%
        margin-left: 5%
        margin-right: 5%
        min-height: 10px
        flex: 1 0
        transition: all .5s ease
        flex-grow: 0
        grid-template-rows: 1fr
        position: relative
        border-radius: 12.5px

        &[closed]
          overflow: hidden
          flex-grow: 0.01

        &[open]
          flex-grow: 1
          overflow: clip

        summary
          color: c.$green-2
          list-style-type: none

          span
            margin-right: 5px
            font-size: 18px

        p
          color: c.$green-3
          font-size: 10px
          border: 1px c.$green-1 solid
          border-radius: 5px
          padding: 5px
          text-align: center

        &:hover
          background-color: color.adjust(c.$green-1, $alpha: -0.8)
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
        flex-wrap: wrap
        gap: 8px

        .v-btn
          flex-grow: 1
          margin-left: 0

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
