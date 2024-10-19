
const getRandomYear = function() {
    return 1998 + Math.floor(Math.random() * 25)
}

const dummyPaper = "??? (Missing Reference) ???"
const dummyFigure = "roadfines-technique.svg"
const dummyShortInfo = "Given the executions of the process, finds a graph."
const dummyLongInfo = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
Laudantium doloremque, laboriosam officia facere eligendi quam 
reiciendis, rem explicabo dolores tenetur libero minus, facilis 
quibusdam. Consectetur amet beatae fuga, architecto magnam.
`

class TimelinePoint {

    constructor(year, title, paper, figure, shortInfo, longInfo, code){
        this.year = year != null ? year : getRandomYear(); 
        this.title = title != null ? title : "foo";
        this.paper = paper != null ? paper : dummyPaper;
        this.figure = figure != null ? figure : dummyFigure;
        this.shortInfo = shortInfo != null ? shortInfo : dummyShortInfo;
        this.longInfo = longInfo != null ? longInfo : dummyLongInfo;
        this.code = code
    }
}

const cards = [
new TimelinePoint(
1998, 
"Agrawal Miner",
"Agrawal, R. and  Gunopulos, D. and Leymann, F., (1998) \“Mining process models from workflow logs\”, in EDBT, ser. Lecture Notes in Computer Science, vol. 1377, Springer, pp. 469–483",
"roadfines-agrawal.svg",
"Given the executions of the process, find a conformal graph.",
`
One of the earliest process discovery techniques, the approach 
considers how to represent the eventually follows relations 
observed in the executions of a process. The graph represents a 
set of constraints that should hold for all executions. The 
technique focused on discovering a graph that caters for all 
executions, does not include spurious constraints, and is minimal.
The technique aims to find a directed acyclic graph, but will 
return a directed graph if loops occur in the executions.
`,
`
from pmkoalas.discovery.agrawal_miner import AgrawalMinerInstance as Miner
from pmkoalas.read import read_xes_simple
from pmkoalas._logging import setLevel

from logging import INFO

setLevel(INFO)

log = read_xes_simple("Road_Traffic_Fine_Management_Process.xes")
miner = Miner(optimise_step_five=True)
graph = miner.discover(log)

with open("roadfines-agrawal.net", "w") as f:
    f.write(repr(graph))
    f.flush()
    f.close()


dotform = graph.create_dot_form()
with open("roadfines-agrawal.dot", "w") as f:
    f.write(dotform)
    f.flush()
    f.close()
`
),
new TimelinePoint(
2004, 
"Alpha Miner",
'van der Aalst, W.M.P. and Weijters, T. and  Maruster, L., (2004) \"Workflow mining: discovering process models from event logs\", in IEEE Transactions on Knowledge and Data Engineering, vol. 16, no. 9, pp. 1128-1142, Sept. doi: 10.1109/TKDE.2004.47',
"roadfines-alpha.svg",
"Given a workflow log, find a Petri net.",
`
The common starting point for process discovery, is to revisit the
alpha miner presented by W.M.P. van der Aalst, T. Weijters and L. 
Maruster. The technique focuses on deriving a Petri net 
(in particular, a workflow net) from the footprint matrix of an 
event log. The footprint matrix considers three types of relations 
between observed activities (a and b): causal dependency between 
them, independence between them, and parallelism between them. The 
main computation of the approach (step 4) is deriving tuples of 
sets (A,B) for places, where for all a in A, there is a causal 
dependency between a and all members of B, and a has no causal 
dependency with any other member of A. The technique does have 
some drawbacks, like handling loops in executions and can often 
derive Petri nets with transitions that are not connected to the 
initial place. However, the work represents how process discovery 
has evolved in the modern era to focus on formal properties using 
an abstraction over the event log to derive a process model.
`,
`
from pmkoalas.discovery.alpha_miner import AlphaMinerInstance as Miner
from pmkoalas.read import read_xes_simple
from pmkoalas.models.dotutil import lpn_prettier_dot
from pmkoalas._logging import setLevel

from logging import INFO

setLevel(INFO)

log = read_xes_simple("Road_Traffic_Fine_Management_Process.xes")
miner = Miner()
graph = miner.discover(log)

with open("roadfines-alpha.net", "w") as f:
    f.write(repr(graph))
    f.flush()
    f.close()


dotform = lpn_prettier_dot(graph)
with open("roadfines-alpha.dot", "w") as f:
    f.write(dotform)
    f.flush()
    f.close()
`
),
    new TimelinePoint(
        2004, "Alpha+ Miner",
        'de Medeiros, A.K.A. and van Dongen, B.F. and van der Aalst, W.M.P., Weijters, A.J.M.M, (2004) \"Process mining : extending the alpha-algorithm to mine short loops\", BETA publicatie : working papers; Vol. 113). Technische Universiteit Eindhoven.',
        "roadfines-alpha-plus.svg",
        "Given an event log, find a net from the class of sound structured workflow nets",
`
This extension of the alpha miner targets how loops of length one and  
two could be rediscovered using the alpha approach. A loop of length one is 
an activity t that can appear in a trace after itself has been executed, e.g.
<...tt...>. A loop of length two is between two activities a,b such that the
activities can be interwoven during execution, e.g. <...aba....> or 
<...bab...>. To achieve an alpha extension that can mine these
relations, the authors propose one additional ordering property be included
in the footprint matrix and a change in the ordering mechanisms to
determine causal dependencies for alpha. However, to handle loops of length
one, a preprocessing step is introduced after which the original algorithm
for alpha can be used to safety mine workflow nets with loops of length one
and two. This results in an extension of alpha (which calls the original alpha 
adjusted with new ordering relations) that consists of roughly 6-9 steps. A 
nice property of the extension is that is equivalent to calling alpha on logs
without short loops.
`,
`
from pmkoalas.discovery.alpha_miner import AlphaMinerPlusInstance as Miner
from pmkoalas.read import read_xes_simple
from pmkoalas.models.dotutil import lpn_prettier_dot
from pmkoalas._logging import setLevel
from os.path import join

from logging import INFO

setLevel(INFO)

log = read_xes_simple(join(".","Road_Traffic_Fine_Management_Process.xes"))
miner = Miner(optimised=True)
graph = miner.discover(log)

with open("roadfines-alpha-plus.net", "w") as f:
    f.write(repr(graph))
    f.flush()
    f.close()


dotform = lpn_prettier_dot(graph)
with open("roadfines-alpha-plus.dot", "w") as f:
    f.write(dotform)
    f.flush()
    f.close()
`
    ),
    new TimelinePoint(1998, "Modified Biermann-Feldman(k,c) Miner",
        `Datta A, "Automating the discovery of as-is business process models: probabilistic and algorithmic approaches", Inform Sys Res 9(3):275–301, 1998.`,
        null,
        "Given an activity stream, derive a Process Activity Graph"
    ),
    new TimelinePoint(1998, "TS-Synthesis Miner",
        `J. Cortadella, M. Kishinevsky, L. Lavagno and A. Yakovlev, "Deriving Petri nets from finite transition systems," in IEEE Transactions on Computers, vol. 47, no. 8, pp. 859-882, Aug. 1998, doi: 10.1109/12.707587.`,
        null,
        "Given a transition system, synthesize a Petri net"
    ),
    new TimelinePoint(2004, "Multi-Phase Miner",
        `B.F. van Dongen and W.M.P. van der Aalst, "Multi-Phase Process Mining: Building Instance Graphs", in International Conference on Conceptual Modeling (ER 2004), vol. 3288 of Lecture Notes in Computer Science, pages 362-376. Springer-Verlag, Berlin, 2004.`,
        null,
        "Given an instance graph, derive a instance EPC"
    )
    ,
    new TimelinePoint(2004 ,"Alpha-&#946; Miner",
        'Wen, L. and Wang, J. and van der Aalst , W.M.P. and Wang, Z. and Sun, J., (2004) \"A novel approach for process mining based on event types\", (BETA publicatie : working papers; Vol. 118). Technische Universiteit Eindhoven.',
        null,
        "Given an event log with start and end events, find a Petri net"
    ),
    new TimelinePoint(2007, "Alpha++ Miner",
        "Wen, L. and van der Aalst, W.M.P. and Wang, J. et al, (2007) \"Mining process models with non-free-choice constructs\", Data Min Knowl Disc 15, 145–180."
    ),
    new TimelinePoint(2003, "Heuristic Miner",
        'Weijters, A. J. M. M. and van der Aalst, W.M.P, (2003) \"Rediscovering workflow models from event-based data using Little Thumb\", Integrated Computer-Aided Engineering, 10(2), 151-162.',
        null,
        "Given a workflow log, find a WF-net"
    ),
    new TimelinePoint(2011, "Flexible Heuristic Miner", 
        'Weijters, A. J. M. M. and Ribeiro, J. T. S., (2011) \"Flexible Heuristics Miner (FHM)\", 2011 IEEE Symposium on Computational Intelligence and Data Mining (CIDM), Paris, France, pp. 310-317',
        null
    ),
    new TimelinePoint(2005, "Genetic Process Mining",
        'van der Aalst, W.M.P. and de Medeiros, A.K.A. and Weijters, A.J.M.M., (2005) \"Genetic Process Mining\", In: Ciardo, G., Darondeau, P. (eds) Applications and Theory of Petri Nets 2005. ICATPN 2005. Lecture Notes in Computer Science, vol 3536. Springer',
        null,
        "Given a set of event traces, find a Petri net"
    ),
    new TimelinePoint(1998, "RNet/Ktail/Markov Miners", 
        'Cook, J. E. and Wolf,  A. L. (1998) \"Discovering models of software processes from event-based data\", ACM Trans. Softw. Eng. Methodol. 7, 3 (July 1998), 215–249.',
        null,
        "Given an event stream collected from a software process, find a formal model of the behaviour of the process"
    ),
    new TimelinePoint(2004, "Social Network Miner",
        'van der Aalst, W.M.P. and Song, M., (2004) \"Mining Social Networks: Uncovering Interaction Patterns in Business Processes\", In: Desel, J., Pernici, B., Weske, M. (eds) Business Process Management. BPM 2004. Lecture Notes in Computer Science, vol 3080. Springer',
        null,
        "Given an event log, find a meaningful sociograms"
    ),
    new TimelinePoint(2004, "ProcessDiscover",
        'Greco, G. and Guzzo, A. and Pontieri, L., Saccà, D., (2004) \"Mining Expressive Process Models by Clustering Workflow Traces\", In: Dai, H., Srikant, R., Zhang, C. (eds) Advances in Knowledge Discovery and Data Mining. PAKDD 2004. Lecture Notes in Computer Science(), vol 3056. Springer',
        null,
        "Given log data related to some executions of the process, find a workflow model of an unknown process"
    ),
    new TimelinePoint(2023, "Alpha+++ Miner",
        'Küsters, A. and van der Aalst, W.M.P., (2023) \"Revisiting the Alpha Algorithm To Enable Real-Life Process Discovery Applications\", Algorithms & Theories for the Analysis of Event Data (ATAED) Workshop, CEUR Workshop Proceedings'
    ),
    new TimelinePoint(2013, "Beta Miner",
        'Leemans, S.J.J. and Fahland, D. and van der Aalst, W.M.P, (2013) \"Discovering Block-Structured Process Models from Event Logs - A Constructive Approach\", In: Colom, JM., Desel, J. (eds) Application and Theory of Petri Nets and Concurrency. PETRI NETS 2013. Lecture Notes in Computer Science, vol 7927. Springer',
        null,
        "Given an event log, find a process tree that can rediscover the log"
    ),
    new TimelinePoint(2014, "Inductive Miner - incompleteness",
        'Leemans, S.J.J. and Fahland, D. and van der Aalst, W.M.P, (2014) \"Discovering Block-Structured Process Models from Incomplete Event Logs\", In: Ciardo, G., Kindler, E. (eds) Application and Theory of Petri Nets and Concurrency. PETRI NETS 2014. Lecture Notes in Computer Science, vol 8489. Springer',
        null,
        "Given an event log, find a process tree that can rediscover the log"
    ),
    new TimelinePoint(2017, "Inductive Miner Framework",
        'Leemans, S.J.J., (2017) \"Robust Process Mining with Guarantees\", Eindhoven University of Technology, PhD thesis.',
        null,
        "Given an event log, find a process tree that can rediscover the log"
    ),
    new TimelinePoint(2012, "Evolutionary Tree Miner",
        'Buijs, J. C. A. M. and van Dongen, B. F. and van der Aalst,  W. M. P., (2012) \"A genetic algorithm for discovering process trees\", 2012 IEEE Congress on Evolutionary Computation, Brisbane, QLD, Australia, pp. 1-8',
        null,
        ""
    ),
    new TimelinePoint(2015, "Evolutionary Miner",
        'Molka, T. and Redlich, D. and Gilani, W. and Zeng, XJ. and Drobek, M. (2015) \"Evolutionary Computation Based Discovery of Hierarchical Business Process Models\", In: Abramowicz, W. (eds) Business Information Systems. BIS 2015. Lecture Notes in Business Information Processing, vol 208. Springe',
        null,
        ''
    ),
    new TimelinePoint(2014, "Competition Miner",
        'Redlich, D. and Molka, T. and Gilani, W. and Blair, G. and Rashid, A., (2014) \"Constructs Competition Miner: Process Control-Flow Discovery of BP-Domain Constructs\" In: Sadiq, S., Soffer, P., Völzer, H. (eds) Business Process Management. BPM 2014. Lecture Notes in Computer Science, vol 8659. Springer',
        null,
        "Given an event log, find a set of constructs between x,y pairs of activities in the log"
    ),
    new TimelinePoint(2015, "Maximal Pattern Miner",
        'Liesaputra, V. and Yongchareon, S. and Chaisiri, S., (2015) \"Efficient Process Model Discovery Using Maximal Pattern Mining\", In: Motahari-Nezhad, H., Recker, J., Weidlich, M. (eds) Business Process Management. BPM 2016. Lecture Notes in Computer Science(), vol 9253. Springer',
        null,
        "Given an event log, find a model that desribes patterns for the behaviour in the log"
    ),
    new TimelinePoint(2004, "Process Miner",
        'Schimm, G., (2004) \"Mining exact models of concurrent workflows\", Computers in Industry, Vol. 53 (1), pp 265-281',
        null,
        "Given a workflow log, find a process model"
    ),
    new TimelinePoint(2010, "alpha-\#",
        'Wen, L. and Wang, J. and van der Aalst, W.M.P. and Huang, B. and Sun, J., (2010) \"Mining process models with prime invisible tasks\", Data & Knowledge Engineering, Vol. 69 (10), pp 999-1021',
        null,
        "Given an event log, find a sound workflow net with invisible tasks"
    ),
    new TimelinePoint(2015, "alpha-\$",
        'Guo, Q. and Wen, L. and Wang, J. and Yan, Z. and Yu, P.S, (2015) \"Mining Invisible Tasks in Non-free-choice Constructs\", In: Motahari-Nezhad, H., Recker, J., Weidlich, M. (eds) Business Process Management. BPM 2016. Lecture Notes in Computer Science(), vol 9253. Springer',
        null,
        "Given an event log, find a sound workflow net with invisible tasks"
    ),
    new TimelinePoint(2007, "Bergenthum-Region Miner",
        'Bergenthum, R. and Desel, J. and Lorenz, R. and Mauser, S., (2007) \"Process Mining Based on Regions of Languages\", In: Alonso, G., Dadam, P., Rosemann, M. (eds) Business Process Management. BPM 2007. Lecture Notes in Computer Science, vol 4714. Springer',
        null,
        "Given an event log, find a marked place/transition net"
    ),
    new TimelinePoint(2010, "Region Miner",
        'van der Aalst, W.M.P. and Rubin, V. and Verbeek, H.M.W. et al., (2010) \"Process mining: a two-step approach to balance between underfitting and overfitting\". Softw Syst Model 9, 87–111 .',
        null,
        "Given an event log, find a Petri net using the theory of regions"
    ),
    new TimelinePoint(2008, "ILP Miner",
        'van der Werf, J.M.E.M. and van Dongen, B.F. and Hurkens, C.A.J. and Serebrenik, A., (2008). \"Process Discovery Using Integer Linear Programming\", In: van Hee, K.M., Valk, R. (eds) Applications and Theory of Petri Nets. PETRI NETS 2008. Lecture Notes in Computer Science, vol 5062. Springer',
        null,
        "Given an event log, find a Petri net using Integer Linear Programming"
    ),
    new TimelinePoint(2007, "Fuzzy Miner",
        'Günther, C.W. and van der Aalst, W.M.P, (2007) \"Fuzzy Mining – Adaptive Process Simplification Based on Multi-perspective Metrics\", In: Alonso, G., Dadam, P., Rosemann, M. (eds) Business Process Management. BPM 2007. Lecture Notes in Computer Science, vol 4714. Springer',
        null,
        "Given an event log, find a simplified and emphasised process model"
    ),
    new TimelinePoint(2011, "Petri net to C-Net",
        'van der Aalst, W.M.P. and Adriansyah, A. and van Dongen, B.F., (2011) \"Causal Nets: A Modeling Language Tailored towards Process Discovery\" In: Katoen, JP., König, B. (eds) CONCUR 2011 – Concurrency Theory. CONCUR 2011. Lecture Notes in Computer Science, vol 6901. Springer',
        null,
        "Given a Petri net, convert the net to a causal net"
    ),
    new TimelinePoint(2012, "C-Net SMT Miner",
        'Solé, M. and Carmona, J., (2012) \"An SMT-Based Discovery Algorithm for C-Nets\", In: Haddad, S., Pomello, L. (eds) Application and Theory of Petri Nets. PETRI NETS 2012. Lecture Notes in Computer Science, vol 7347. Springer',
        null,
        "Given an event log, find a minimal causal net"
    ),
    new TimelinePoint(2012, "C-Net DaC SMT Miner",
        'Solé, M. and Carmona, J., (2012) \"A High-Level Strategy for C-net Discovery\" 2012 12th International Conference on Application of Concurrency to System Design, Hamburg, Germany, pp. 102-111',
        null,
        "Given an event log, find a minimal causal net"
    ),
    new TimelinePoint(2003, "Little Thumb Miner",
        'Weijters, A.J.M.M. and van der Aalst, W.M.P., (2003) \"Rediscovering Workflow Models from Event-based Data Using Little Thumb\". Integrated Computer-Aided Engineering vol. 10(2), pp. 151–162',
        null,
        "Given an event, find a workflow net"
    ),
    new TimelinePoint(2014, "Fodina Miner",
        'van den Broucke, S.K.L.M., (2014) \"Advances in Process Mining: Artificial Negative Events and Other Techniques\", Ph.D. thesis, KU Leuven (2014)',
        null,
        "Given a task log, find causal net"
    ),
    new TimelinePoint(2016, "Structured Miner", 
        'Augusto, A. and Conforti, R. and Dumas, M. and La Rosa, M. and Bruno, G., (2016) \"Automated Discovery of Structured Process Models: Discover Structured vs. Discover and Structure\", In: Comyn-Wattiau, I., Tanaka, K., Song, IY., Yamamoto, S., Saeki, M. (eds) Conceptual Modeling. ER 2016. Lecture Notes in Computer Science(), vol 9974. Springer,',
        null, 
        "Given a causal net, find a maximally structured BPMN model"
    )
].sort((a,b) => a.year - b.year)

export default cards;