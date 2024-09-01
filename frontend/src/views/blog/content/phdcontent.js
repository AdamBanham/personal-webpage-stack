import { BlogInfo } from "@/views/blog/blogElements.js"

const confirmSeminar = new BlogInfo(
    "Confirmation Seminar @ QUT",
    "A key milestone for PhD students at QUT, done and dusted.",
    "TODO",
    2022,
    'July',
    ['Adam Banham']
)
confirmSeminar.addTags("ex","en","pm","phd","qut","res")
confirmSeminar.addExpansionPage("confirmSeminar2022")

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

const vistingRWTHAachen = new BlogInfo(
    "Visting RWTH Aachen",
    "I was luckly enough to secure a research visit at RWTH Aachen.",
    "TODO",
    2023,
    'November',
    ['Adam Banham']
)
vistingRWTHAachen.addTags("pm","phd","rwth","res")
vistingRWTHAachen.addExpansionPage("rwthVist2023")

const FinalSeminar2024A = new BlogInfo(
    "Final Seminar @ QUT",
    "Reflections on presenting my final seminar.",
    "TODO",
    2024,
    "August",
    ["Adam Banham"]
)
FinalSeminar2024A.addTags("ex","en","pm","phd","qut","res")
FinalSeminar2024A.addExpansionPage("FinalSeminar2024A")

const AgrawalMiner2024B = new BlogInfo(
    "Agrawal Miner implemented in Koalas",
    "A breakdown of an early process discovery technique proposed in 1998.",
    "TODO",
    2024,
    "August",
    ['Adam Banham']
)
AgrawalMiner2024B.addTags("pm","res","pmd","cod")
AgrawalMiner2024B.addExpansionPage("AgrawalMiner2024B")

// ordering is listing ordering.
const content = [
    AgrawalMiner2024B,
    FinalSeminar2024A,
    vistingRWTHAachen,
    exogenousEndogenous,
    confirmSeminar,
]


export default {
    content
}