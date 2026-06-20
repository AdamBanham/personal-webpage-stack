<template>
  <div class="content-bar">
    <div class="publications">
      <h2> Publication History </h2>

      <section class="citation-summary">
        <div class="summary-metrics">
          <div class="summary-metric">
            <span class="metric-label">h-index</span>
            <span class="metric-value">{{ hIndex }}</span>
          </div>
          <div class="summary-metric">
            <span class="metric-label">total citations</span>
            <span class="metric-value">{{ totalCitations }}</span>
          </div>
          <div class="summary-metric">
            <span class="metric-label">papers with citation data</span>
            <span class="metric-value">{{ papersWithCitationData }}</span>
          </div>
        </div>

        <div class="year-breakdown">
          <h3>Citations by publication year</h3>
          <p v-if="citationBreakdown.length === 0" class="empty-breakdown">
            No citation information is currently available.
          </p>
          <figure v-else class="histogram-figure">
            <svg
              class="histogram-svg"
              viewBox="0 0 720 300"
              role="img"
              aria-labelledby="citationHistogramTitle citationHistogramDesc"
            >
              <title id="citationHistogramTitle">Citation histogram by publication year</title>
              <desc id="citationHistogramDesc">Each bar shows the total citations of papers published in that year.</desc>

              <line
                class="axis-line"
                :x1="histogramLayout.left"
                :y1="histogramLayout.top"
                :x2="histogramLayout.left"
                :y2="histogramLayout.bottom"
              />
              <line
                class="axis-line"
                :x1="histogramLayout.left"
                :y1="histogramLayout.bottom"
                :x2="histogramLayout.right"
                :y2="histogramLayout.bottom"
              />

              <g v-for="tick in histogramTicks" :key="`tick-${tick.value}`" class="y-tick-group">
                <line
                  class="grid-line"
                  :x1="histogramLayout.left"
                  :y1="tick.y"
                  :x2="histogramLayout.right"
                  :y2="tick.y"
                />
                <text class="tick-label" :x="histogramLayout.left - 10" :y="tick.y + 4">
                  {{ tick.value }}
                </text>
              </g>

              <g v-for="bar in histogramBars" :key="`bar-${bar.year}`" class="bar-group">
                <rect
                  class="year-bar"
                  :x="bar.x"
                  :y="bar.y"
                  :width="bar.width"
                  :height="bar.height"
                  rx="4"
                  ry="4"
                />
                <text
                  v-if="bar.value > 0"
                  class="bar-value"
                  :x="bar.centerX"
                  :y="bar.y - 6"
                >
                  {{ bar.value }}
                </text>
                <text
                  class="year-label"
                  :x="bar.centerX"
                  :y="histogramLayout.bottom + 18"
                >
                  {{ bar.year }}
                </text>
              </g>
            </svg>
          </figure>
        </div>
      </section>

      <div class="year-jump">
        <span>Jump to year:</span>
        <a
          v-for="section in yearSections"
          :key="section.anchorId"
          :href="`#${section.anchorId}`"
          class="year-jump-link"
        >
          {{ section.year }}
        </a>
      </div>

      <section
        v-for="section in yearSections"
        :key="section.anchorId"
        :id="section.anchorId"
        class="year-section"
      >
        <div class="year-header">
          <h3>{{ section.year }}</h3>
          <v-btn
            prepend-icon="mdi-link-variant"
            size="x-small"
            elevation="2"
            variant="tonal"
            @click="copySectionLink(section.anchorId)"
          >
            {{ copiedAnchorId === section.anchorId ? "copied" : "copy year link" }}
          </v-btn>
        </div>

        <PubCard
          v-for="paper in section.papers"
          :key="paper.key"
          :paper-id="paper.anchorId"
          :selected="selectedPaperId === paper.anchorId"
          :title="paper.title"
          :authors="paper.authors"
          :year="paper.year"
          :abstract="paper.abstract"
          :venue="paper.venue"
          :file="paper.file"
          :doi="paper.doi"
          :bibtex="paper.bibtex"
          :citations="paper.citations"
          @select-card="selectedPaperId = $event"
        />
      </section>
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
    papers: PubContent.Papers,
    copiedAnchorId: null,
    selectedPaperId: null
    }
},
computed: {
  citationPapers: function() {
    return this.papers
      .map((paper) => this.toCitationCount(paper.citations))
      .filter((value) => value > 0)
      .sort((a, b) => b - a)
  },
  totalCitations: function() {
    return this.citationPapers.reduce((total, citations) => total + citations, 0)
  },
  papersWithCitationData: function() {
    return this.papers.filter((paper) => this.hasCitationValue(paper.citations)).length
  },
  hIndex: function() {
    let index = 0
    this.citationPapers.forEach((citations, position) => {
      const rank = position + 1
      if (citations >= rank) {
        index = rank
      }
    })
    return index
  },
  citationBreakdown: function() {
    const groups = {}

    this.papers.forEach((paper) => {
      const yearKey = String(paper.year ?? "TBA")
      if (!groups[yearKey]) {
        groups[yearKey] = {
          year: yearKey,
          totalCitations: 0,
          totalPapers: 0
        }
      }

      groups[yearKey].totalPapers += 1
      groups[yearKey].totalCitations += this.toCitationCount(paper.citations)
    })

    return Object.values(groups).sort((a, b) => Number(b.year) - Number(a.year))
  },
  maxYearCitations: function() {
    if (this.citationBreakdown.length === 0) {
      return 0
    }
    return this.citationBreakdown.reduce((maxValue, yearData) => {
      return Math.max(maxValue, yearData.totalCitations)
    }, 0)
  },
  histogramLayout: function() {
    return {
      left: 56,
      right: 690,
      top: 16,
      bottom: 250
    }
  },
  histogramTicks: function() {
    const maxValue = this.maxYearCitations
    if (maxValue <= 0) {
      return [
        { value: 0, y: this.histogramLayout.bottom }
      ]
    }

    const steps = 4
    const interval = Math.ceil(maxValue / steps)
    const values = []

    for (let step = 0; step <= steps; step += 1) {
      values.push(step * interval)
    }

    return values.map((value) => ({
      value,
      y: this.histogramY(value)
    }))
  },
  histogramBars: function() {
    const count = this.citationBreakdown.length
    if (count === 0) {
      return []
    }

    const chartWidth = this.histogramLayout.right - this.histogramLayout.left
    const gap = 12
    const barWidth = Math.max(16, (chartWidth - gap * (count - 1)) / count)

    return this.citationBreakdown
      .slice()
      .sort((a, b) => Number(a.year) - Number(b.year))
      .map((yearData, index) => {
        const value = Number(yearData.totalCitations)
        const x = this.histogramLayout.left + index * (barWidth + gap)
        const y = this.histogramY(value)
        const height = Math.max(0, this.histogramLayout.bottom - y)
        return {
          year: yearData.year,
          value,
          x,
          y,
          width: barWidth,
          height,
          centerX: x + barWidth / 2
        }
      })
  },
  yearSections: function() {
    const groups = {}
    this.papers.forEach((paper) => {
      const yearKey = String(paper.year ?? "TBA")
      if (!groups[yearKey]) {
        groups[yearKey] = []
      }
      groups[yearKey].push({
        ...paper,
        anchorId: this.toAnchorId(`paper-${paper.key || paper.title}`)
      })
    })

    return Object.keys(groups)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({
        year,
        anchorId: this.toAnchorId(`year-${year}`),
        papers: groups[year]
      }))
  }
},
methods: {
  histogramY: function(totalCitations) {
    if (this.maxYearCitations <= 0) {
      return this.histogramLayout.bottom
    }

    const chartHeight = this.histogramLayout.bottom - this.histogramLayout.top
    const ratio = Number(totalCitations) / this.maxYearCitations
    return this.histogramLayout.bottom - ratio * chartHeight
  },
  hasCitationValue: function(citations) {
    if (citations === false || citations === null || citations === undefined || citations === "") {
      return false
    }
    const parsed = Number(citations)
    return Number.isFinite(parsed) && parsed >= 0
  },
  toCitationCount: function(citations) {
    if (!this.hasCitationValue(citations)) {
      return 0
    }
    return Number(citations)
  },
  toAnchorId: function(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
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
  copySectionLink: async function(anchorId) {
    try {
      const fullPath = this.$route.fullPath.split("#")[0]
      const shareUrl = `${window.location.origin}${fullPath}#${anchorId}`
      await this.copyToClipboard(shareUrl)
      this.copiedAnchorId = anchorId
      window.setTimeout(() => {
        if (this.copiedAnchorId === anchorId) {
          this.copiedAnchorId = null
        }
      }, 1800)
    } catch (error) {
      console.error("Failed to copy year link", error)
    }
  }
}
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/content.sass"

.publications
    padding-top: 15px
    padding-left: 2%
    padding-right: 2%
    width: 96%

    .citation-summary
        margin-left: 3%
        margin-right: 3%
        margin-bottom: 18px
        padding: 12px
        border-radius: 8px
        border: 1px solid rgba(255, 255, 255, 0.2)
        background: linear-gradient(160deg, rgba(0, 0, 0, 0.2), rgba(36, 60, 52, 0.28))

        .summary-metrics
            display: grid
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
            gap: 8px
            margin-bottom: 12px

            .summary-metric
              padding: 8px
              border-radius: 6px
              background-color: rgba(0, 0, 0, 0.2)
              display: flex
              flex-direction: column
              justify-content: space-between
              min-height: 74px

              .metric-label
                font-size: 12px
                text-align: left
                color: rgba(255, 255, 255, 0.75)
                text-transform: uppercase
                letter-spacing: 0.5px

              .metric-value
                margin-top: auto
                color: c.$yellow-10
                font-size: 22px
                line-height: 1.15
                font-weight: 700
                text-align: right

        .year-breakdown
          margin-top: 8px

          h3
            margin: 0 0 6px 0
            color: c.$light-grey
            font-size: 16px

          .empty-breakdown
              margin: 0
              color: rgba(255, 255, 255, 0.8)

          .histogram-figure
              margin: 8px 0 0 0
              width: 100%

              .histogram-svg
                  margin-top: 10px
                  width: 100%
                  height: auto
                  max-height: 320px
                  overflow: visible

              .axis-line
                  stroke: rgba(255, 255, 255, 0.6)
                  stroke-width: 1

              .grid-line
                  stroke: rgba(255, 255, 255, 0.16)
                  stroke-width: 1

              .tick-label
                  fill: rgba(255, 255, 255, 0.85)
                  font-size: 11px
                  text-anchor: end

              .year-bar
                  fill: c.$green-10
                  stroke: c.$yellow-10
                  stroke-width: 1

              .bar-value
                  fill: c.$light-grey
                  font-size: 11px
                  text-anchor: middle
                  font-weight: 700

              .year-label
                  fill: c.$light-grey
                  font-size: 11px
                  text-anchor: middle

    h2 
        color: c.$light-grey

    .year-jump
        display: flex
        align-items: center
        gap: 10px
        flex-wrap: wrap
        margin-bottom: 18px
        color: c.$light-grey

        .year-jump-link
            color: c.$green-10
            text-decoration: none
            border: 1px solid c.$green-10
            border-radius: 999px
            font-size: 12px
            padding: 3px 10px
            background-color: rgba(0, 0, 0, 0.15)

            &:hover
                color: c.$light-grey
                border-color: c.$light-grey

    .year-section
        margin-bottom: 18px
        scroll-margin-top: 72px
        border-left: 3px solid rgba(255, 255, 255, 0.15)
        padding-left: 8px

        &:target
            border-left-color: c.$yellow-10

    .year-header
        margin-left: 3%
        margin-right: 3%
        margin-bottom: 8px
        display: flex
        align-items: center
        justify-content: space-between

        h3
            margin: 0
            color: c.$light-grey
            letter-spacing: 0.8px

</style>