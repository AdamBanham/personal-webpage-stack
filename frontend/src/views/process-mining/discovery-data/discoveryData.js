
const getRandomYear = function() {
    return 1998 + Math.floor(Math.random() * 25)
}

const dummyPaper = "R. Agrawal, D. Gunopulos, and F. Leymann, “Mining process models from workflow logs,” in EDBT, ser. Lecture Notes in Computer Science, vol. 1377, Springer, 1998, pp. 469–483"
const dummyFigure = "agrawal-BPIC15.svg"
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
        this.figure = figure != null ? figure : "dummy.svg";
        this.shortInfo = shortInfo != null ? shortInfo : dummyShortInfo;
        this.longInfo = longInfo != null ? longInfo : dummyLongInfo;
        this.code = code
    }
}




const cards = [
new TimelinePoint(
1998, 
"Agrawal Miner",
"R. Agrawal, D. Gunopulos, and F. Leymann, “Mining process models from workflow logs,” in EDBT, ser. Lecture Notes in Computer Science, vol. 1377, Springer, 1998, pp. 469–483",
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
'W.M.P. van der Aalst, T. Weijters and L. Maruster, "Workflow mining: discovering process models from event logs," in IEEE Transactions on Knowledge and Data Engineering, vol. 16, no. 9, pp. 1128-1142, Sept. 2004, doi: 10.1109/TKDE.2004.47',
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
    new TimelinePoint(2007, "Alpha++ Miner"),
    new TimelinePoint(2023, "Alpha+++ Miner"),
    new TimelinePoint(2013, "Beta Miner"),
    new TimelinePoint(2014, "Inductive Miner Infrequent"),
    new TimelinePoint(2017, "Inductive Miner Framework"),
].sort((a,b) => a.year - b.year)

export default cards;