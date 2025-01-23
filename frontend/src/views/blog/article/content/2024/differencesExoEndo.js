import { ArticleStructure } from "../../articleElement.js";

const EndogenousExogenousDifference = new ArticleStructure(
    "The Difference between Endo And Exo",
    "DifExoEndo2023"
)

EndogenousExogenousDifference.addTextSection(
`
A major component of my thesis was the conceptual difference between data 
sources used for process analysis. The goal of the conceptual difference was 
to highlight that the discrete nature of process executions used in process 
mining can struggle to capture contextual impacts. Typically, in process 
mining, we consider discrete state changes in a process execution to inform 
our understanding of processes. These state changes are often ordered by 
the timestamp of the state change occurring or, more often, when it was 
recorded. Furthermore, most analysis techniques abstract the timestamps into 
partial ordering between state changes. This abstraction means that the 
temporal differences between state changes are overlooked in analysis and 
require that contextual information be flattened to these state changes.
`
)

EndogenousExogenousDifference.addTextSection(
`
To motivate for process analysis that does not flatten contextual information 
to inform our understanding of processes, two categories of data sources are 
introduced. Endogenous data groups all streams of state changes related to 
the execution of processes. While external data streams, or exogenous data, 
groups all streams of measurements for phenomena that cannot be entirely 
produced or divided from endogenous data. The definitions below provide a 
short statement to delimate streams into these categories.
`
)

EndogenousExogenousDifference.addDefintion(
"Endogenous Streams",
`
An endogenous stream is a finite sequence of timestamped state changes that 
describe a historical execution of a process.
`
)

EndogenousExogenousDifference.addDefintion(
"Exogenous Streams",
`
An exogenous stream is a possibly finite sequence of timestamped measurements 
that describes the observation of any phenomenon and are not fully determined 
by a process execution.
`
)

EndogenousExogenousDifference.addTextSection(
`
An example of endogenous data could be a stream describing the processing of 
an insurance claim. While, an example of exogenous data could be the total 
paid claims by the insurance company, measured by the hour. These examples 
highlight that both endogenous and exogenous data can have a symbiotic 
relationship, where any one execution of the process does not fully determine 
the total paid claims, allowing the exogenous stream to be derived as an 
inter-case variable from the observation of the process. An important 
motivation for this operationalisation was ensuring that the categories were 
broad enough to allow for any concept rather than focusing on a specfic use case,
say IoT data (even though it might be the ideal use case).
`
)

EndogenousExogenousDifference.addFigure(
"blog/DifExoEndo2023/rose_onion.png",
"Roseman, Recker, and Flender views on conceptual dimensions around processes [1]."
)

EndogenousExogenousDifference.addTextSection(
`
The consideration of the context surrounding processes is not new. Many works 
have explored this notion and the benefits of including such information for 
business process management. Thus, we can also synthesise endogenous and 
exogenous data from existing works. Starting off with M. Rosemann, J. Recker, 
and C. Flender (2008), who described the idea of onion layers revolving around 
processes. They describe four layers to consider: immediate, internal, 
external, and environmental layers as seen in Figure 1. Whereby endogenous 
data covers immediate and internal layers, while exogenous covers the external 
and environmental layers. However, their work focuses more on management 
concepts rather than data sources.
`
)

EndogenousExogenousDifference.addFigure(
"blog/DifExoEndo2023/aalst_onion.png",
"van der Aalst and Dustdar views on conceptual dimensions around processes [2]."
)

EndogenousExogenousDifference.addTextSection(
`
Thankfully, van der Aalst and Dustdar [2] provide a reconceptualisation of 
the onion layers focusing on data sources and their impact on process 
behaviour, as shown in Figure 2. Their layers focus on the types of streams 
likely to present on each layer. Whereby endogenous streams cover the instance 
and process context layers, while exogenous streams cover the process, social, 
and external context layers. Showcasing that exogenous streams can stem from 
concurrent process executions on the process context layer.
`
)

EndogenousExogenousDifference.addTextSection(
`
My thesis, 
"<b><i>Process Mining with Exogenous Data</i></b>", 
does not solve and resolve all the differences between endogenous and 
exogenous data for process analysis. However, the work encourages more 
techniques that cater to the intertwinement of both discrete and temporal 
dimensions for process mining.
`
)

EndogenousExogenousDifference.addReference(
`
M. Rosemann, J. Recker, and C. Flender, “Contextualisation of business 
processes,” Int. J. Bus. Process. Integr. Manag., vol. 3, no. 1, pp. 
47–60, 2008
`
)
EndogenousExogenousDifference.addReference(
`
W. M. P. van der Aalst and S. Dustdar, “Process mining put into context,” 
IEEE Internet Computing, vol. 16, no. 01, pp. 82–86, 2012
`
)

export default EndogenousExogenousDifference