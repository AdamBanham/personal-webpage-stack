import { BlogInfo } from "@/views/blog/blogElements.js"

const auStart25 = new BlogInfo(
    "Starting in Academia @ Adelaide University",
    "A reflection on my start in a post-doc position with Prof Claudia Szabo.",
    "",
    2025,
    'Dec',
    ['Adam Banham']
)
auStart25.addTags("csys","cod","au","res")
auStart25.addExpansionPage("au-start-25")

const content = [
    auStart25
]

export default {
    content
}