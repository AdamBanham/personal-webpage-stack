import { BlogInfo } from "@/views/blog/blogElements.js"

const confirmSeminar = new BlogInfo(
    "Confirmation Seminar",
    "A key milestone for PhD students at QUT, done and dusted.",
    "TODO",
    2022,
    'July',
    ['Adam Banham']
)
confirmSeminar.addTags("phd","qut")

const exogenousEndogenous = new BlogInfo(
    "The Difference between Endo And Exo",
    "A breakdown of the differences between endogenous and " +
    "exogenous data.",
    "TODO",
    2023,
    'April',
    ['Adam Banham']
)
exogenousEndogenous.addTags("ex","en","pm","phd","qut","res")
exogenousEndogenous.addExpansionPage("DifExoEndo2023")

const content = [
    confirmSeminar,
    exogenousEndogenous
]

export default {
    content
}