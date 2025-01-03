import { ArticleStructure } from "../articleElement.js";

const PhDConfirmation = new ArticleStructure(
    "Confirmation Seminar @ QUT",
    "confirmSeminar2022"
)

const EndogenousExogenousDifference = new ArticleStructure(
    "The Difference between Endo And Exo",
    "DifExoEndo2023"
)

const vistingRWTHAachen = new ArticleStructure(
    "Research visit at RWTH Aachen",
    "rwthVist2023"
)

const PhDFinalSeminar = new ArticleStructure(
    "Final Seminar @ QUT",
    "FinalSeminar2024A"
) 

PhDFinalSeminar.addYoutubeSection(
"https://www.youtube.com/embed/0laVKLJye9g",
"A short introduction to process mining with exogenous data.",
`
If you are after a quick introduction to my thesis, then the clip below 
discusses the motivation of the contributions presented in my thesis.
`,
`
However, if you interested in hearing about the journey towards a doctorate
at the Queendland University of Techonology, or at least my own experience, 
then read on. At the end of the blog, a full recording of the final seminar 
is included for the interested <br>(see this <a href="#clip-2"><u>clip</u></a>).
`
)

PhDFinalSeminar.addTextSection(
`
Reflecting on the past three years of my candidature, my final seminar 
represents the beginning of the closure of the candidature. The Australian 
system for PhDs, or at least the procedures at my university (Queensland  
University of Technology), consists of several phases which lead to a 
candidate receiving a doctorate. A successful candidate must pass all of 
these phases with a recommendation for the university to confer the doctorate.
`
)

PhDFinalSeminar.addQuote(
`
Queensland University milestone phases, on which my candidature followed, consisted of five key phases:
<ul style="text-align: left;width:80%;margin:auto;">
    <li> <b>Stage Two Report:</b> due by third month;</li>
    <li> <b>Confirmation of Candidature:</b> due by the twelveth month;</li>
    <li> <b>Annual Progress Report:</b> due by the 24th month, and then every 12 
    month after;</li>
    <li> <b>Final Seminar:</b> due by the 36th month of the candidature;</li>
    <li> <b>Lodgement of thesis for examination:</b> due shorty after final seminar 
    (usually within 3 months).</li>
</ul>
`
)

PhDFinalSeminar.addTextSection(
`
Across these milestone phases, the progress of my candidature has been positive, 
and in some cases, minor adjustments were expected to improve the chances of
 being conferred with a doctorate. The final seminar requires 
that a candidate submit the final draft of the thesis and present a seminar 
to a panel of peers on their research project. Afterwards, the panel will 
provide recommendations based on the thesis and seminar. Also, the panel's 
outcome will decide whether the candidate can proceed to lodgement. Usually
the panel consists of one supervisor for the candidate, one member from the 
supporting school for the candidate, and a member from outside the supporting
school. My Panel consisted of the following three members:
`
)

PhDFinalSeminar.addProfile("Professor Moe T Wynn", "moe-wynn.png",
`
Prof Wynn leads the Process Science Academic Program (formerly Business Process 
Management) and is the Academic Lead of Research for the School of Information 
Systems, Queensland University of Technology. She co-leads the Data for 
Discovery Program within QUT’s Centre for Data Science. She has been appointed 
as a member of the Australian Research Council College of Experts for the 
period of 3 years (2023 – 2025).
She conducts research in the areas of business process management, workflow 
management, process mining and data quality, having completed her PhD in 
workflow management, and process automation. She is recognised internationally 
for her contributions to the formal foundations of process modelling, 
verification, automation, and process-oriented data mining (process mining).
`,
"L"
)
PhDFinalSeminar.addProfile("Doctor Alizera Nili", "alizera-nili.jpeg",
`
Dr. Alizera Nili is a Senior Lecturer in Service Science. He investigates 
digitisation of services from the customer-centric perspective, design and 
evaluate personalised digital services, and propose and evaluate solutions for 
increasing trust and confidence in the services (user level and organisational 
level). He proposes and validates frameworks, guiding principles, and theories 
to achieve these goals. He is a Level 3 (mentoring) PhD supervisor with 
award-winning PhD graduates. His research focuses on several types of digital 
services and technologies such as Internet of Things (IOT), Industrial IOT 
(IIOT), artificial intelligence (particularly chatbots), social media platforms, 
and technologies for sustainability. His research is domain-independent, but 
he has have been particularly interested in digital public services and retail 
technologies.
`,
"R"
)
PhDFinalSeminar.addProfile("Adjunct Professor Colin Fidge", "colin-fidge.png",
`
Prior to his retirement Dr Colin Fidge pursued a four-decade teaching and 
research career in high-integrity software engineering, modelling and analysis 
of complex, computer-based systems, and enterprise system re-engineering. In 
retirement he continues to advise on research in the Schools of Computer 
Science and Information Systems, Queensland University of Technology. He has 
been awarded 17 Australian Research Council grants, and led nine research 
projects for industry and the Australian Department of Defence, mainly in the 
fields of safety-critical and security-critical systems. He graduated 25 PhD 
students and 4 Research Masters students.
`,
"L"
)
PhDFinalSeminar.addTextSection(
`
It is important to distinguish that the final seminar, is not like the public
defence in the European system. The panel does not confer the doctorate but 
instead acts as an internal step towards the lodgement for examination. 
<i>Only after a successful external examination from at least two scholars 
outside the university does the candidate have their doctorate conferred.</i> 
However, the panel does 
have other options besides recommending the lodgement. The most common 
outcome is that the panel recommends minor changes and gives candidates 
one to three months to enact changes based on their feedback.
<b>In my case, the panel provided feedback and recommended minor changes with 
a month to enact them.</b> 
The other possible outcomes that the panel can recommend are as follows:
`
)
PhDFinalSeminar.addQuote(
`
Queensland University of Technology outlines that the panel of a final seminar 
can recommend the following:
<ul style="padding-top:5px;padding-bottom:5px;text-align: left;width:80%;
margin:auto;">
    <li> <b>(minor/major changes)</b> indicate the time remaining for you 
    to finalise and lodge your thesis for examination;</li>
    <li> <b>(review)</b> place the candiate under review for up to 3 months 
    if the panel has concerns about your work meeting award standards.
    </li>
</ul>
If your progress is still unsatisfactory after the under review period, the 
Research Degrees Committee - on advice from the faculty committee - will 
either:
<ul style="padding-top:5px;text-align: left;width:80%;margin:auto;">
    <li> extend the review period by up to 3 months; </li>
    <li> allow you to Show Cause why the committee should not either: </li>
    <ul style="margin-left: 25px">
        <li> academically exclude you with an offer of admission to the 
        degree of Master of Philosophy;</li>
        <li> academically exclude you with no such offer.</li>
    </ul>
</ul>
`
)

PhDFinalSeminar.addTextSection(
`
I completed my Final Seminar on 21st of August 2024, from 14:30 to 16:00. 
After which, I updated the thesis draft using the panel's feedback and began 
the lodgement process on the 24th of September 2024. It was accepted 
internally to be sent to examinators by the 5th of November, 2024. The 
acceptance of the lodgement signals the end of the journey for the candidate 
at the university, which means they lose financial backing, resources, and 
allocations (desk, computers, servers, etc.) are returned to the university. 
<b>While I am proud of my work, the ending phase is largely not a celebration 
period. I have gone as far as to dub as being in '<i>PhD Limbo</i>' and doing 
all you can to scrap together enough for rent.</b> Many other candidates who 
have made it to the actual graduation ceremony (some 18 months after lodgement) 
describe the ceremony as making the doctorate feel ''<i>real</i>'' afterwards. 
I hope to get to that point and find an opportunity to use my expertise in 
academia.
`
)

PhDFinalSeminar.addTextSection(
`
But let's not dwell on despair; instead, let's revisit what a successful 
three-year research plan was. It started in the middle of the COVID-15 
pandemic, and while Brisbane didn't have long periods of lockdowns due to 
the somewhat low reporting of cases, it still meant a lot of working from home. 
During my candidature, I learned I can do my best when collaborating and 
discussing with colleagues, but Zoom meetings aren't enough to have a 
meaningful conversation—too many context switches. Also, having a supervisor 
move on to greener grounds on the opposite side of the world around your 
confirmation meant I had to rework my research plan. Nonetheless, I did my 
best to work with my supervisors, and they persevered through all the 
late/early meetings to discuss my work. As I revisit and re-record my final 
seminar, I am starting to feel a sense of pride for having made it this far. 
I hope that you see that over this candidature, I have developed expertise 
in process science and have the potential to make it in academia.
`
)

PhDFinalSeminar.addYoutubeSection(
"https://www.youtube.com/embed/0laVKLJye9g",
"Adam Banham, 2024, Final Seminar, Process Mining with Exogenous Data",
`
This clip is a re-recording of the final seminar that I presented in 
August 2024.
`,
""
)
        

const AgrawalMiner2024B = new ArticleStructure(
    "Agrawal Miner implemented in Koalas",
    "AgrawalMiner2024B"
)
AgrawalMiner2024B.addTextSection(
`
While searching through literature for my thesis, I came across an early 
survey of workflow mining, ''Workflow mining: A survey of issues and 
approaches'' by W. M. P. van der Aalst, B. F. van Dongen et al., in 2003 
<a href="#ref-1">[1]</a>.
 In this survey, we can already see many of the problems that process mining 
 today explores, such as discovering a formal description of a process from 
 the executions of a process. The survey also points to one of the earliest 
 works on process discovery, and this post explores this early process 
 discovery approach.
`
)
AgrawalMiner2024B.addTextSection(
`
The early process discovery paper, "Mining process models from workflow 
logs", was written by R. Agrawal, D. Gunopulos, and F. Leymann, in 1998
<a href="#ref-2">[2]</a>. 
In this work, the authors present three algorithms that address the 
problem 
<a href="#quote-1">outlined below</a>
and consider how to return outcomes with desirable 
properties. Some of the assumptions are dated, like assuming all traces 
sample from a set of activities and all activities are executed once. 
Nonetheless, it is interesting to understand the approach and learn from 
how it was proposed.
`
)
AgrawalMiner2024B.addQuote(
`
We present a new approach to address the problem of model construction.
We describe an algorithm that, given a log of unstructured executions
of a process, generates a graph model of the process.
`,
`R. Agrawal, D. Gunopulos, and F. Leymann, 1998`
)
AgrawalMiner2024B.addTextSection(
`
The paper focuses on deriving a conformal graph of the process executions. 
Where graphs in this context consist of vertices (V) and edges between 
vertices (E), assuming a single source and a single sink vertice for the 
graph. The authors also consider that each vertex has an output function, 
and between edges, a boolean function exists; however, exploring these 
components of the graph is largely unvisited in the paper, so I will 
overlook these for this article. R. Agrawal et al. outlines three properties 
of conformal graphs (
<a href="#quote-2">shown below</a>
) and focus their work on discovering 
conformal graphs instead of graphs.
`
)
AgrawalMiner2024B.addQuote(
`
<b>Definltion 7</b> (Conformal graph). A process model graph G is conformal 
with a log L of executions if all of the following hold: 
<ul style="text-align:left;margin:1px;width:80%;display:flex-inline">
    <li> (<i><b>dependency completeness</b></i>) for each dependency in L, there 
    exists a path in G;
    </li>
    <li> (<i><b>irredundancy of dependencies</b></i>) there is no path in G 
    between independent activities in L;
    </li>
    <li> (<i><b>execution completeness</b></i>) G is consistent with every execution 
    in L.
    </li>
</ul>
`,
`
Def.7, Page 474, R. Agrawal, D. Gunopulos, and F. Leymann, 1998
`
)
AgrawalMiner2024B.addTextSection(
`
The first algorithm proposed by R. Agrawal et al. defines a special case 
when the executions of the process contain exactly one instance of each 
process activity. In this special case, they argue that a unique process 
model exists that is conformal and minimizes the number of edges. Notably, 
in their context, graphs describe edges between vertices when one activity 
follows another. For example, given two activities A,B : B follows A if in 
all executions with A and B, B occurred after A in executions. These edges 
are eventually follow relations in our modern context, where for an 
execution to be accepted by a discovered graph, if all related edges 
hold. If you would like to play along at home, the Agrawal miner can be 
found in pmkoalas ( 
<a href="">found here</a> 
), a python library for process mining, and 
you can install it locally from pypi using:
`
)
AgrawalMiner2024B.addCode(
`
pip install pmkoalas==0.3.1
`,
"shell",
"How to install pmkoalas into a local python environment from pypi."
)
AgrawalMiner2024B.addTextSection(
`
R. Agrawal et al. first algorithm proposed that a conformal graph is 
discoverable by applying four steps. Firstly, define a set of vertices, 
one for each activity. Secondly, iterate the executions and introduce 
edges between vertices for all eventually follows relations.Thirdly, 
remove all edges that occur in both directions. Lastly, compute the 
transitive reduction of the graph. For all algorithms, R. Agrawal et al. 
provide a running example with some commentary on the derivation of the 
graph. The art of including a minimal example within papers is somewhat 
lost, as many modern papers forget this step. Some papers around process 
discovery in our times even lack a single visualisation of their "models".
However, in the case of R. Agrawal et al., they ask us to consider the 
following log: <b>{ABCDE, ACDBE, ACBDE}</b> and we can apply the miner 
using the snippet below to see the resulting graph in 
<a href="#figure-1">Figure 1</a> 
(visualised by graphviz, 
dot).
`
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
                  "A C D B E",
                  "A C B D E")
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
"Code to compute the conformal graph discovered by the Agrawal Miner using "
+ "a log from the special class."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/agrawal_code_ex_1.svg",
    "A conformal graph discovered by the Agrawal Miner, using the dot digraph supplied by the snippet."
)
AgrawalMiner2024B.addTextSection(
`
The second algorithm proposed by R. Agrawal et al. considers if the 
executions are samples from an acyclic process where activities can 
occur at most once but may not be executed. This relaxation introduces 
two problems: not all dependency graphs are conformal graphs, and spurious 
dependencies may be possible. Two modifications of the previous algorithm 
are used to resolve these problems. After step three, all edges between 
strongly connect components in the graph are removed to avoid spurious 
dependencies. After which, only edges in the induced sub-graphs for 
executions are kept to ensure that all executions can be accepted. To 
showcase these modifications, R. Agrawal asks us to consider the following 
log: 
<b>{ABCF, ACDF, ADEF, AECF}</b>, 
and the resulting graph shown in 
<a href="#figure-2">Figure 2</a>.
`
)
AgrawalMiner2024B.addCode(
`
from pmkoalas.dtlog import convert 
from pmkoalas._logging import setLevel, info
from logging import INFO 
from pmkoalas.discovery.agrawal_miner import AgrawalMinerInstance

def main():
    setLevel(INFO)
    log = convert("A B C F",
                    "A C D F",
                    "A D E F",
                    "A E C F")
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
    "Code snippet to run the miner on the relaxed samples of a process."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/agrawal_code_ex_2.svg",
    "The resulting dependency graph discovered by the Agrawal Miner."
)
AgrawalMiner2024B.addTextSection(
`
Notably, an assumption of the approaches proposed by R. Agrawal et al. is 
that their graphs have a single source and sink. However, there is a 
simple workaround for when the log contains executions with different 
start activities and end activities. The workaround is to prefix and suffix 
executions with a pseudo activity. So, for example, if two new activities 
G,H are introduced to the previous log, producing
<b>{HABCF, ACDF, ADEFG, AECF}</b>, 
then following graph in 
<a href="#figure-3">Figure 3</a>, is found.
`
)
AgrawalMiner2024B.addCode(
`
from pmkoalas.dtlog import convert 
from pmkoalas._logging import setLevel, info
from pmkoalas.simple import Trace
from logging import INFO 
from pmkoalas.discovery.agrawal_miner import AgrawalMinerInstance

def main():
    setLevel(INFO)
    log = convert("H A B C F",
                    "A C D F",
                    "A D E F G",
                    "A E C F")
    miner = AgrawalMinerInstance() 
    graph = miner.discover(log)
    print(repr(graph))
    print(graph.create_dot_form().replace(";",";\n"))
    for trace, n in  log: 
        # you are responsible for adding the prefix and suffix after
        # discovery, a copy is used internally for the miner.
        trace = Trace(["start"]+list(trace)+["end"])
        info(f"{trace} accepted by graph? :: {graph.does_not_violate(trace)}")

if __name__ == "__main__":
    main() 
`,
"python",
"Code snippet to run the miner on the adjusted samples."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/agrawal_code_ex_2b.svg",
    "The resulting dependency graph discovered by the Agrawal Miner when "
    + "executions cannot agree on starting and ending activities."
)
AgrawalMiner2024B.addTextSection(
`
The final relaxation of on the class of processes that R. Agrawal et al.
considered was if the executions are sampled from a process with cycles. 
Where the major problem faced is that the previous algorithms will remove 
legitimate cycles and that a transitive reduction on directed graphs is not 
unique. To handle cycles, traces are first re-encoded so repeated instances 
are separated into new activities, e.g. A B D C B C E becomes A B D C B1 C1 
E. Then, the separated activities are merged at the end of the algorithm and 
edges are introduced if an edge exists between different equivalent sets of 
activities. Finally, the author asks us to consider the following log: 
<b>{ABDCE, ABDCBCE, ABCBDCE, ADE}</b>,
resulting in the following graph in
<a href="#figure-4">Figure 4</a>.
`
)

AgrawalMiner2024B.addCode(
`
from pmkoalas.dtlog import convert 
from pmkoalas._logging import setLevel, info
from pmkoalas.simple import Trace
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
        # you are responsible for adding the prefix and suffix after
        # discovery, a copy is used internally for the miner.
        trace = Trace(["start"]+list(trace)+["end"])
        info(f"{trace} accepted by graph? :: {graph.does_not_violate(trace)}")

if __name__ == "__main__":
    main() 
`,
"python",
"Snippet to run the Agrawal Miner on the considered log. Note testing if an "
+ "execution is consistent with a graph with cycles is less clear than before."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/agrawal_code_ex_3.svg",
    "A dependency graph discovered from samples of process with cycles."
)
AgrawalMiner2024B.addTextSection(
`
So, what are some takeaways from this early work? First, you should 
consider desirable properties for the outcomes you want to discover. 
Rather than focusing on whether you can compute something, 
think about what requirements are needed for the input. The work
of R. Agrawal, D. Gunopulos, and F. Leymann also shows the importance of a
motivating example to empower your research! It shouldn't be overlooked, even
if reviewers turn down their noses at the simplicity, by asking for something
more "real" to movitate them. Unless the algorithm is about the labels, such
as repairing them or recovering them, the labels of activities being "save 
the world", "assess insurance claim", or "generate 1km of rainbow spaghetti",
are not relevant to any contribution.
`
)
AgrawalMiner2024B.addQuote(
`
Many of todays information systems are driven by explicit process models. 
Workflow management systems, but also ERP, CRM, SCM, and B2B, are 
configured on the basis of a workflow model specifying the order in which 
tasks need to be executed. Creating a workflow design is a complicated 
time-consuming process and typically there are discrepancies between the 
actual workflow processes and the processes as perceived by the management. 
To support the design of workflows, we propose the use of workflow mining.
Starting point for workflow mining is a so-called ‘‘workflow log’’ 
containing information about the workflow process as it is actually being 
executed.
`,
    "W. M. P. van der Aalst, B. F. van Dongen, et al., Workflow mining: A "
    +"survey of issues and approaches"
)
AgrawalMiner2024B.addTextSection(
`
To explore the implementation in koalas, I also conducted some testing
on the runtime using some modern publically avaiable event logs.
The event logs used were:
<b> BPIC13, BPIC20, road fines, sepsis</b>.
However, for testing purposes only the BPIC15 was used to consider 
runtime performance.
Where testing consisted of sampling the log and adjusting the traces based
on the requirements to trigger one of three algorithms proposed by R. 
Agrawal et al.
`
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/special_runtime.svg",
    "Runtime analysis when only considering adjusted samples from BPIC15 "
    +" that execute activities exactly once."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/general_runtime.svg",
    "Runtime analysis when only considering adjusted samples from BPIC15 "
    +" that may execute activities once. Runtime reaching 20 activities was"
    +" not completed due to runtime."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/opt_runtime.svg",
    "Runtime analysis when only considering adjusted samples from BPIC15 "
    +" that may execute activities once, after optimisation."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/cyclic_opt_runtime.svg",
    "Runtime analysis when only considering adjusted samples from BPIC15 "
    +" that may execute activities repeatly, after optimisation."
)

AgrawalMiner2024B.addTextSection(
`
The runtime testing shows that when executions are increased, we see a
linear increase in runtime; while when the number of activities are 
increased we see a much larger impact on runtime. This reflects the general
nature of the algorithms complexity, 
where m is the number of executions,
n is the number of activities observed,
and k is the most times any activity is repeated,
then at worst the approach is O(m(kn)^3) and at best it is O(mn^2) as 
reported by R. Agrawal et al.
`
)
AgrawalMiner2024B.addTextSection(
`
Some additional graphs were computed and are shown below for the curious 
wretched, interested to see how the approach presents our modern event logs.
`
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/logs/BPIC13_closed.svg",
    "Agrawal miner applied to BPIC13 - closed."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/logs/BPIC13_incidents.svg",
    "Agrawal miner applied to BPIC13 - incidents."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/logs/BPIC13_open.svg",
    "Agrawal miner applied to BPIC13 - open."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/logs/BPIC15.svg",
    "Agrawal miner applied to BPIC15."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/logs/road_fines.svg",
    "Agrawal miner applied to road fines."
)
AgrawalMiner2024B.addFigure(
    "AgrawalMiner2024B/logs/sepsis.svg",
    "Agrawal miner applied to sepsis."
)

AgrawalMiner2024B.addReference(
`
W. M. P. van der Aalst, B. F. van Dongen, J. Herbst, L. Maruster, G. Schimm, and
A. J. M. M. Weijters, “Workflow mining: A survey of issues and approaches,” Data
Knowl. Eng., vol. 47, no. 2, pp. 237–267, 2003
`
)
AgrawalMiner2024B.addReference(
`
R. Agrawal, D. Gunopulos, and F. Leymann, “Mining process models from workflow
logs,” in EDBT, ser. Lecture Notes in Computer Science, vol. 1377, Springer, 1998,
pp. 469–483
`
)



const content = [
    PhDConfirmation,
    EndogenousExogenousDifference,
    vistingRWTHAachen,
    PhDFinalSeminar,
    AgrawalMiner2024B
]

export default {
    content
}