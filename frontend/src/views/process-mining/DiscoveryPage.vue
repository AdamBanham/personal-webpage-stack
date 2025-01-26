<template>
  <div class="pm-discovery router-view">
    <div class="info-header">
      <h4>
        This is a work-in-progress project, where I add more entries once or
        twice a month with the goal to implement a discovery entry with each 
        update.
      </h4>
    </div>
    <div 
      class="timeline-snippets"
    >
      <div
        class="btn-back"
        @click="moveDecr()"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill="none"
          d="M0 0h30v30H0z"
        /><path
          fill="#D8D8D8"
          fill-rule="evenodd"
          d="M11.828 15l7.89-7.89-2.83-2.828L6.283 14.89l.11.11-.11.11L16.89 25.72l2.828-2.83"
        /></svg>
      </div>
      <div class="timeline-snippets-holder">
        <div
          class="timeline-snippets-content"
          :style="{
            transform : 'translateX('+ (snippetOffeset)+'px)'
          }"
        >
          <section 
            v-for="(info, idx) in algos"
            :id="idx"
            :key="idx"
            :class="{
              hide : idx != curr && idx != (curr - 1) && idx != (curr + 1),
              prev : idx == (curr - 1),
              next : idx == (curr + 1)
            }"
            :style="{
              transform: 'translateX('+(0.3*(algos.length - idx)) +'px)'
            }"
          >
            <h4> {{ info.year }} </h4>
            <h2
              :class="{
                'color-swap-1' : (idx % 5 == 0),
                'color-swap-2' : (idx % 5 == 1),
                'color-swap-3' : (idx % 5 == 2),
                'color-swap-4' : (idx % 5 == 3),
                'color-swap-5' : (idx % 5 == 4)
              }"
              v-html="info.title"
            />
            <p> 
              {{ info.shortInfo }}
            </p>
          </section>
        </div>
      </div>
      <div
        class="btn-next"
        @click="moveIncr()"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill="none"
          d="M0 0h30v30H0z"
        /><path
          fill="#D8D8D8"
          fill-rule="evenodd"
          d="M18.172 14.718l-7.89-7.89L13.112 4l10.606 10.607-.11.11.11.11-10.608 10.61-2.828-2.83 7.89-7.89"
        /></svg>
      </div>
    </div>
    <div 
      class="timeline-dots-line"
    />
    <div class="timeline-hist">
      <div> {{ histYearsMin }}</div>
      <div class="timeline-hist-bars">
        <div
          v-for="(val,year) of histYears"
          :key="val"
          :class="{
            'timeline-hist-bar' : true,
            'active' : selectInfo.year == year
          }"
          :style="{
            width: ((100/(histYearsMax - histYearsMin))*0.6) +'%',
            'margin-left' : ((100/(histYearsMax - histYearsMin))*0.2) +'%',
            'margin-right' : ((100/(histYearsMax - histYearsMin))*0.2) +'%',
            height: histYears[year] > 0 ? calcHistBarHeight(histYears[year])+'px' : '0px',
            'margin-top': calcHistBarMargin(histYears[year])+'px',
          }"
        >
          <v-tooltip
            :text="'('+year+','+histYears[year]+')'"
            activator="parent"
            opacity="0.5"
            location="top"
            width="80"
            height="25"
            theme="dark"
            content-class="hist-bar-tooltip"
          />
        </div>
      </div>
      <div> {{ histYearsMax }}</div>
    </div>
    <div class="timeline-dots">
      <div
        class="btn-back"
        @click="moveDecr()"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill="none"
          d="M0 0h30v30H0z"
        /><path
          fill="#D8D8D8"
          fill-rule="evenodd"
          d="M11.828 15l7.89-7.89-2.83-2.828L6.283 14.89l.11.11-.11.11L16.89 25.72l2.828-2.83"
        /></svg>
      </div>
      <div
        class="timeline-dots-content"
      >
        <ol
          :style="{
            transform : 'translateX('+timelineOffset+'px)',
          }"
        >
          <li 
            v-for="(info, idx) in algos"
            :key="idx"
            :class="{
              active : idx == curr
            }"
            @click="moveTo(idx)"
          />
        </ol>
      </div>
      <div
        class="btn-next"
        @click="moveIncr()"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill="none"
          d="M0 0h30v30H0z"
        /><path
          fill="#D8D8D8"
          fill-rule="evenodd"
          d="M18.172 14.718l-7.89-7.89L13.112 4l10.606 10.607-.11.11.11.11-10.608 10.61-2.828-2.83 7.89-7.89"
        /></svg>
      </div>
    </div>
    <div class="timeline-info">
      <div class="content-bar">
        <section>
          <h1
            :class="{
              'color-swap-1' : (curr % 5 == 0),
              'color-swap-2' : (curr % 5 == 1),
              'color-swap-3' : (curr % 5 == 2),
              'color-swap-4' : (curr % 5 == 3),
              'color-swap-5' : (curr % 5 == 4)
            }"
            v-html="selectInfo.title"
          />
          <h3> 
            {{ selectInfo.year }}
          </h3>
          <h4>
            {{ selectInfo.paper }}
          </h4>
          <img
            :src="'/figures/process-mining/discovery/'+selectInfo.figure"
            :alt="selectInfo.title + ' discovery outcome.'"
          >
          <p class="figure-caption">
            <u>Figure {{ curr+1 }}:</u> 
            {{ selectInfo.title }} applied to the 
            road fines 
            <a
              href="https://doi.org/10.4121/uuid:270fd440-1057-4fb9-89a9-b699b47990f5"
              target="_blank"
            >(found here)</a>
            event log.
          </p>
          <div class="long-info">
            <p> 
              {{ selectInfo.longInfo }}
            </p>
          </div>
          <div
            v-if="selectInfo.code != null"
            class="code-snippet"
          >
            <VCodeBlock
              :code="selectInfo.code"
              highlightjs
              lang="python"
              theme="github-dark"
            />
            <p class="code-snippet-caption">
              <u>Snippet {{ curr+1 }}:</u>
              Code snippet to run the technique over the road fines log 
              using pmkoalas.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import  discCards  from "./discovery-data/discoveryData.js"
import VCodeBlock from '@wdns/vue-code-block';

export default {
    name: "PMDiscoveryPage",
    components: {
      VCodeBlock
    },
    data: function() {
        return {
            curr: 0,//Math.floor(Math.random() * (discCards.length -1 )),
            algos: discCards,
            histYearsMin: discCards
              .map(a => a.year)
              .reduce((a,b) => a < b ? a : b),
            histYearsMax: discCards
              .map(a => a.year)
              .reduce((a,b) => a > b ? a : b),
        }
    },
    computed: {
        selectInfo: function(){
            return this.algos[this.curr]
        },
        lineOffset: function(){
            return 150
        },
        timelineOffset: function() {
            return this.curr * -76
        },
        snippetOffeset: function(){
          var dis = this.curr * - 200
          if (this.curr > 0){
            dis = dis + ((this.curr) * -30)
          }
          return dis
        },
        histYears: function(){
          var years = {}
          var min = this.histYearsMin
          var max = this.histYearsMax
          years[min] = 0
          while(min != max){
            min += 1
            years[min] = 0
          }
          for(var info of this.algos){
              years[info.year] += 1
          }
          return years
        },
        histCountMax: function(){
          if (this.histYears != null){
            var ret = 0;
            for(var val in this.histYears){
              val = this.histYears[val]
              ret = val > ret ? val : ret
            }
            return ret;
          } else {
            return 10;
          }
        }
    },
    methods: {
        moveTo: function(idx) {
            this.curr = idx
        },
        moveIncr: function() {
            this.curr += 1 
            if (this.curr >= this.algos.length){
                this.curr = 0
            }
        },
        moveDecr: function() {
            this.curr -= 1
            if (this.curr < 0){
                this.curr = this.algos.length - 1
            }
        },
        calcHistBarHeight: function(count){
          var prec = count / this.histCountMax
          return 95 * prec
        },
        calcHistBarMargin: function(count){
          var prec = 1 - (count / this.histCountMax)
          return 95 * prec
        }
    }
}
</script>

<style lang="sass">
@use "@/styles/coloursAnt.sass" as c
.hist-bar-tooltip
  background-color: c.$black-blue !important
  color: c.$light-grey !important
  justify-content: center
  text-align: center
  padding: 5px
  font-size: 12px !important

  &::after
    content: " "
    position: absolute
    top: 100%
    left: 50%
    margin-left: -5px
    border-width: 5px
    border-style: solid
    border-color: black transparent transparent transparent

</style>

<style lang="sass" scoped>
@use "@/styles/content.sass" as cont
@use "@/styles/coloursAnt.sass" as c  
@use "@/styles/breakpoints.sass" as brk
@use "sass:color"
@use "sass:list"

$colors: c.$red-3, c.$cyan-7, c.$orange-7, c.$green-3, c.$blue-3
$repeat: 5 

.info-header
  text-align: center
  margin-bottom: 15px
  margin-top: 15px
  margin-left: auto 
  margin-right: auto

  @media (min-width: brk.$desktop-width)
    width: cont.$content-width-full

  @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
    width: cont.$content-width-medium

  @media (max-width: calc(brk.$tablet-width - 1px))
    width: cont.$content-width-small

.timeline-snippets
    display: inline-flex
    height: 300px
    width: cont.$content-width-full
    margin: auto
    justify-content: center
    align-content: center
    font-family: roboto, helvetica, sans-serif
    font-size: 12px
    z-index: 3
    position: relative

    > div > div 
        padding: 1em 0
        box-sizing: border-box

    @media (min-width: brk.$desktop-width)
        width: cont.$content-width-full

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        width: cont.$content-width-medium

    @media (max-width: calc(brk.$tablet-width - 1px))
        width: cont.$content-width-small

    @media (min-width: brk.$desktop-width)
        margin-left: calc(calc(100vw - cont.$content-width-full)/2)

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        margin-left: calc(calc(100vw - cont.$content-width-medium)/2)

    @media (max-width: calc(brk.$tablet-width - 1px))
        margin-left: calc(calc(100vw - cont.$content-width-small)/2)

    .timeline-snippets-holder
      display: inline-block
      width: auto
      overflow-x: hidden

    .timeline-snippets-content
      position: relative
      display: inline-flex
      transition: all .3s ease

      section
          text-align: center
          background-color: c.$background-light
          min-width: 200px
          max-width: 200px
          min-height: 250px
          max-height: 250px
          margin: 0px 15px 0px 15px
          border-radius: 15px
          padding: 15px
          transition: all .3s ease

          &:first-child
            @media (min-width: brk.$desktop-width)
              margin-left: calc(((cont.$content-width-full * 0.9)/2) - 100px)

            @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
              margin-left: calc(((cont.$content-width-medium * 0.9)/2) - 100px)

            @media (max-width: calc(brk.$tablet-width - 1px))
              margin-left: calc(((cont.$content-width-small * 0.9)/2) - 115px)
          
          h2 
              color: c.$green-9
              margin: 5px

          h4 
              color: c.$light-grey
              margin: 2.5px
          p
              color: c.$light-grey

          &.hide 
            opacity: 0

          &.prev 
            opacity: 0.33

          &.next 
            opacity: 0.33


    .btn-back, .btn-next
        width: 30px
        height: 100%
        justify-content: center
        align-content: center
        cursor: pointer
        z-index: 10
        transition: 0.3s ease-in-out
        &:hover
            background-color: rgba(0,0,0,.05)
        &.hide
            display: none
    .btn-back
        left: 0
    .btn-next
        right: 0


.timeline-info
    // border: 5px green solid
    padding-top: 35px
    z-index: 3
    position: relative

    .content-bar
        border-radius: 15px
        align-content: center 
        text-align: center

        section
            margin-top: 15px

        h1 
            color: c.$green-9
            margin: 2.5px
        h3 
            margin: 5px
            color: c.$light-grey
        h4
            margin: 5px
            font-size: 12px
            font-weight: lighter
            width: 80%
            margin-left: auto
            margin-right: auto
            color: c.$light-grey

        img
            width: 80%
            margin: 15px 0 0 0
            color: c.$black-blue

        .long-info
          padding: 15px

          p
              color: c.$green-9

        .figure-caption
            color: c.$black-blue
            margin-bottom: 15px

        .code-snippet
          text-align: left
          padding: 25px

        .code-snippet-caption
          text-align: center
          color: c.$black-blue
          margin-top: 15px

.timeline-dots-line
    position: absolute
    height: 250px 
    margin-top: -38px
    margin-right: 30%
    min-width: 2.5px
    background-color: c.$light-grey
    border-radius: 2px
    z-index: 1

    @media (min-width: brk.$desktop-width)
        margin-left: calc(calc(100vw - cont.$content-width-full)/2)
        transform: translateX(calc(cont.$content-width-full/2))

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        margin-left: calc(calc(100vw - cont.$content-width-medium)/2)
        transform: translateX(calc(cont.$content-width-medium/2))

    @media (max-width: calc(brk.$tablet-width - 1px))
        margin-left: calc(calc(100vw - cont.$content-width-small)/2)
        transform: translateX(calc(cont.$content-width-small/2))

    
.timeline-hist
  margin: auto
  height: 100px
  display: flex
  z-index: 3
  
  @media (min-width: brk.$desktop-width)
      width: cont.$content-width-full

  @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
      width: cont.$content-width-medium

  @media (max-width: calc(brk.$tablet-width - 1px))
      width: cont.$content-width-small

  .timeline-hist-bars
    width: 80%
    height: 100px
    margin: auto
    display: inline-flex
    z-index: 3

    .timeline-hist-bar 
      background-color: c.$light-grey
      opacity: 0.5
      z-index: 2

      &.active
        background-color: c.$green-8

.timeline-dots
    // border: 5px blue solid
    height: 60px
    margin: auto
    display: flex
    overflow-y: hidden
    transition: left .3s ease-in-out
    position: relative
    z-index: 2

    @media (min-width: brk.$desktop-width)
        width: cont.$content-width-full

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        width: cont.$content-width-medium

    @media (max-width: calc(brk.$tablet-width - 1px))
        width: cont.$content-width-small

    .timeline-dots-content
        width: auto
        margin: 15px
        overflow: hidden
        display: inline-flex
        transition: all .3s ease

    ol
      margin-top: 15px
      display: inline-flex
      height: 2px
      background-color: c.$light-grey
      padding-right: 500px
      list-style: none

      li
        display: inline-block
        padding: 10px
        margin-top: -12px
        margin-left: 50px
        border-radius: 50%
        border: 3px solid c.$green-5
        background-color: c.$background
        position: relative
        cursor: pointer
        box-shadow: 0 2px 5px rgba(0,0,0,.2)
        transition: all .3s ease



        @for $i from 1 through $repeat 
          &:nth-child(#{list.length($colors)}n+#{$i}) 
            border-color: color.adjust(list.nth($colors, $i), $lightness: 20%)

        &:first-child
          @media (min-width: brk.$desktop-width)
            margin-left: calc(((cont.$content-width-full * 0.9)/2) - 100px - 15px + 100px - 1.5px)

          @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
            margin-left: calc(((cont.$content-width-medium * 0.9)/2) - 100px - 22.5px + 100px - 1.5px)

          @media (max-width: calc(brk.$tablet-width - 1px))
            margin-left: calc(((cont.$content-width-small * 0.9)/2) - 100px - 27px + 100px - 1.5px)

        &:last-child
          margin-right: 200px

        &.active
          box-shadow: none
          background-color: c.$light-grey
        &.active:before
          content: ""
          display: block
          height: 25px
          width: 1px
          position: absolute
          top: -25px
          transition: opacity .3s ease-in-out
        &.active:after
          content: ""
          display: block
          height: 25px
          width: 1px
          position: absolute
          bottom: -25px
          transition: opacity .3s ease-in-out
    
    .btn-back, .btn-next
        justify-content: center
        align-content: center
        display: inline-block
        cursor: pointer
        margin-top: -2px
        z-index: 11
        transition: all .3s ease
        &:hover
            background-color: rgba(0,0,0,.05)
        &.hide
            display: none
    .btn-back
        left: 1em
    
    .btn-next
        right: 1em

.color-swap-1
  color: color.adjust(list.nth($colors, 1), $lightness: 20%) !important
.color-swap-2
  color: color.adjust(list.nth($colors, 2), $lightness: 20%) !important
.color-swap-3
  color: color.adjust(list.nth($colors, 3), $lightness: 20%) !important
.color-swap-4
  color: color.adjust(list.nth($colors, 4), $lightness: 20%) !important
.color-swap-5
  color: color.adjust(list.nth($colors, 5), $lightness: 20%) !important
</style>