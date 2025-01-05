import { ArticleStructure } from "../../articleElement.js";

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

export default AgrawalMiner2024B