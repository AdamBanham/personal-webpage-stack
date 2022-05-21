<template>
  <div class="timeline">
    <div 
      v-for=" (i,idx) in Array(5)" 
      :key="idx" 
      class="spot" 
      :class="{ selected: spots[idx] }" 
      @click="setSelected(idx)"
    />
    <div class="title">
      <p> {{ spotTitle != null ? spotTitle : "" }} </p>
    </div>
  </div>
</template>

<script>
export default {
    name: "TimelineBar",
    data () {
        return {
            spots: Array(5).fill(false),
            spotTitles: [ 
                "The Early Years",
                "Undergraduate Years",
                "Postgraduate Training",
                "????",
                "????"
            ],
            spotTitle: null

        }
    },
    methods: {
        setSelected(idx) {
            if (this.spots[idx]){
                this.spots[idx] = false;
                this.spotTitle = null;
                return
            }
            this.spots = Array(5).fill(false)
            this.spots[idx] = true
            this.spotTitle = this.spotTitles[idx]
        }
    }
}
</script>

<style lang="sass" scoped>
@import "@/styles/coloursAnt"
.timeline
    position: absolute
    height: 12.5px 
    width: 500px 
    border-radius: 4px
    top: 107.5%
    background-color: $cyan-1
    display: flex
    flex-direction: row
    .spot 
        position: relative
        top: -22px
        height: 50px 
        width: 50px 
        border-radius: 25px
        background-image: radial-gradient($cyan-1 30%,$cyan-3)
    .selected
        background-image: radial-gradient($cyan-1 15%,$cyan-7) !important
    .title
        position: absolute
        top : 25px
        width: 500px
        height: 25px
        justify-items: center
        p 
            text-align: center
            color: $cyan-1
            font-size: 24pt

@for $i from 1 through 5
    $left: ($i - 1) * 75 + -25px
    .timeline
        .spot
            &:nth-child(#{$i})
                left: $left
</style>