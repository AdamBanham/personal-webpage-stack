<template>
  <div class="content-bar">
    <div class="publications">
      <h2> Publication History </h2>
      <PubCard
        v-for="paper in papers"
        :key="paper.key"
        :title="paper.title"
        :authors="paper.authors"
        :year="paper.year" 
        :abstract="paper.abstract"
        :venue="paper.venue"
        :file="paper.file"
        :doi="paper.doi"
        :bibtex="paper.bibtex"
      />
    </div>
  </div>
</template>

<script>
import PubCard from "@/components/publication/Card.vue"
import PubContent from "./content.js"
export default {
name: "PublicationsPage",
components: {
    PubCard
},
data: function() {
    return {
        papers: PubContent.Papers
    }
}

}
</script>

<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"
@import "@/styles/content.sass"

.publications
    padding-top: 15px
    padding-left: 2%
    padding-right: 2%
    width: 96%
    h2 
        color: $light-grey 

</style>