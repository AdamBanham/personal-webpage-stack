import { ArticleStructure } from "../articleElement.js";

const PhDConfirmation = new ArticleStructure(
    "Confirmation Seminar @ QUT",
    "confirmSeminar2022"
)

const EndogenousExogenousDifference = new ArticleStructure(
    "The Difference between Endo And Exo",
    "DifExoEndo2023"
)

const PhDFinalSeminar = new ArticleStructure(
    "Final Seminar @ QUT",
    "FinalSeminar2024A"
) 

const AgrawalMiner2024B = new ArticleStructure(
    "Agrawal Miner implemented in Koalas",
    "AgrawalMiner2024B"
)
AgrawalMiner2024B.addTextSection(
    "This is a test text section"
)
AgrawalMiner2024B.addCode(
`
from pmkoalas.dtlog import convert 
from pmkoalas._logging import setLevel, info
from logging import INFO 
from pmkoalas.discovery.agrawal_miner import AgrawalMinerInstance

def main():
    setLevel(INFO)
    log = convert("A B C D E",
                  "A B C D B C D E",
                  "A F G B C D E",
                  "A F G H")
    miner = AgrawalMinerInstance() 
    graph = miner.discover(log)
    print(repr(graph))
    print(graph.create_dot_form().replace(";",";\\n"))
    for trace, n in  log: 
        info(f"{trace} accepted by graph? :: {graph.does_not_violate(trace)}")

if __name__ == "__main__":
    main() 
`,
"python",
"Produces a dependency graph using the approach proposed by R. Agrawal et. al. (1998)."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/example.svg",
    "A dependency graph discovered by R. Agrawal (1998)."
)
AgrawalMiner2024B.addQuote(
    "No Fluffyness!",
    "Prof. Sander J.J. Leemans, RWTH Aachen"
)
AgrawalMiner2024B.addReference(
    "F. Boo, A. Baz, P. Poop. 'testing a reference'. 2024"
)



const content = [
    PhDConfirmation,
    EndogenousExogenousDifference,
    PhDFinalSeminar,
    AgrawalMiner2024B
]

export default {
    content
}