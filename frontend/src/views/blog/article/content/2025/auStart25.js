import { ArticleStructure } from "../../articleElement.js";

var article = new ArticleStructure(
    "Starting in Academia @ Adelaide University",
    "au-start-25"
)

article.addTextSection(
`
After almost a year of job searching and teaching as a casual 
sessional academic at QUT in 2025, I found my next step into 
academia. I would be moving to South Australia and starting a 
new postdoctoral position at the upcoming Adelaide University. 
Adelaide University would result from merging the universities, 
the University of Adelaide (G8) and the University of South 
Australia. The position would start in late 2025 and continue 
until 2027 if all goes well (fingers crossed!). The position 
would shift my focus from process mining into a more computer 
science domain, with many overlaps between conceptual modelling 
and understanding behaviour in systems (bigger processes?).
`
)

article.addTextSection(
`
But before digging into what the position would be, or at least 
what I have gleaned after three months, we should consider that 
the journey from Brisbane to Adelaide is no small trip. Instead 
of hiring a moving company like a civil person, I had decided to 
downsize as much as I could and drive across Australia myself. 
I was thinking of seeing a bit more of Australia and reminiscing 
about my childhood, when our family would drive between states 
every 3 to 4 years for my father’s new RAF posting. So, with a 
bit of planning and the mid-semester break upcoming at QUT, I 
would leave my tutoring positions and use the break to drive for 
a whole week to reach Adelaide for the start date of the new 
position. To put that into perspective, an entire week of driving 
would cover 3,131.5 kilometres, with a pit stop in Canberra, the 
capital of Australia. A benefit, though, would be that I could 
visit some of Australia's many ‘big’ attractions (see below).
`
)

article.addCarousel(
    "The 'Big' Attractions along the way to South Australia",
    {
        src:"/photos/auStart25/brisbane-2025.jpg",
        header: "One last look",
        subtitle: "Brisbane, 2025"
    },
    {
        src:"/photos/auStart25/brisbane-2025-going-away.jpeg",
        header: "Sendoff drinks!",
        subtitle: "Brisbane, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-1.jpg",
        header: "Byron Lighthouse, Australia's Easternmost Point",
        subtitle: "Byron Bay, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-2.jpg",
        header: "The Big Banana",
        subtitle: "Coffs Harbour, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-3.jpg",
        header: "The Big Kookaburra",
        subtitle: "Kurri Kurri, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-4.jpg",
        header: "Sydney Opera House",
        subtitle: "Sydney, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-5.jpg",
        header: "The Big Chainsaw",
        subtitle: "Colac, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-6.jpg",
        header: "The Twelve Apostles",
        subtitle: "Princetown, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-7.jpg",
        header: "The Big Lobster",
        subtitle: "Kingston SE, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-8.jpg",
        header: "Big ol' Larry",
        subtitle: "Kingston SE, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-9.jpg",
        header: "Birdman of the Coorong",
        subtitle: "Meningie, 2025"
    },
    {
        src:"/photos/auStart25/big-attr-10.jpg",
        header: "Cosi's Rhino",
        subtitle: "Tailem Bend, 2025"
    },
)

article.addTextSection(
`
The new position would be under soon-to-be Prof Claudia Szabo, 
where I would be joining as a full-time researcher on one of her 
defence projects. The project would focus on approaches for 
modelling complex systems and decreasing the development time of 
simulation studies for the industry partner. I have had some 
experience in simulation, but mainly through the 
playout of Petri nets to simulate event data within process 
mining. The project’s work would extend far beyond my current 
understanding and investigate the need for new approaches to 
designing these simulation studies with emergent behaviour in
mind. In my initial pitch for the position, I had mentioned 
coloured Petri nets as a possible avenue forward. At the time, I 
was unaware of the many approaches in the simulation discipline 
I would need to consider in the future.
`
)

article.addProfile(
"Prof Claudia Szabo",
"claudia-szabo.jpg",
`
Her main research interests lie in the area of complex systems 
and their practical applications to domains such as biology, 
social networks, and defence. 
She leads the Complex Systems 
program within the Centre for Distributed and Intelligent 
Technologies. 
Her education research interests lie in the areas 
of curriculum design, cognitive load theories, and software 
engineering best practices.

Autonomous decision making, in particular as it happens in 
complex adaptive sytems that operate in contested and dyanmic 
environments, is a very challenging problem. 
Three critical 
questions remain when thinking about applying complex systems 
theories to specific application domains:
How can we engineer decision making in complex systems?
How do we engineer and/or define and measure emergent properties 
in a complex systems of systems?
How do we design systems that reap the benefits of 
self-organisation? Once these systems are designed and 
prototyped, how do we measure the impact and benefit of 
self-organisation? Beyond self-organisation, another interesting 
property is adaptability and the same questions above apply 
to it as well.
`
)

article.addTextSection(
`
Prof Claudia has a long history of publications around emergent 
behaviour in complex systems. She describes the nature of the 
problem in a publication @ Winter Simulation Conference 25, 
Complex Systems Modeling and Analysis <a href="#ref-1">[1]</a>.
`
)

article.addQuote(
`
Approaches to studying emergence can be broadly classified from 
two orthogonal perspectives. The first perspective focuses on 
identifying emergence as it happens, using formal or meta-models
of calculated composed model states. A key challenge in this approach is 
identifying the variables or attributes that describe the system
components at the micro-level and the system as a whole at the 
macro-level, as well as the relationships and dependencies between these 
two levels. Defining emergence as the set difference between the 
macro-level and the micro-level is conceptually sound but 
difficult to capture and computationally expensive to calculate.
`,
`Prof Claudia Szabo, Complex Systems Modeling and Analysis, WSC 25`
)

article.addTextSection(
`
Simulation research into emergent behaviours often drew on models 
such as Reynolds' flocking of birds in 1987
<a href="#ref-2">[2]</a>
, 
Conway's Game of Life in 1970
<a href="#ref-3">[3]</a>
, 
and Predator-Prey models by Chen in 2007
<a href="#ref-4">[4]</a>
. 
A commonality among these models is that they control agents 
using simple rules. Still, the complex interactions between 
the agents lead to emergent behaviour when the simulation 
unfolds. Sometimes emergent behaviour is beneficial, as in the 
previous models, but in other cases, it leads to simulation 
states that are unrealistic or completely undesirable. If the 
emergent behaviour is undesirable, then debugging the controlling 
behaviour to understand how the simulation unfolded to allow for 
such interaction is extremely difficult. The latter is what the 
project has been about so far and will remain a strong research 
direction in the future. 
`
)

article.addTextSection(
`
The project has a small team of developers for the duration to 
help build tools for the industry partner and assist with the 
development of some simulation studies. They are a tight bunch 
of bright eyes, but for the most part are not researchers, well, 
not in the traditional sense. Some have publications which is 
interesting, and others have a strong industry or indie 
background. I am meant to take on a more project-management 
role for the team, but this type of role is something I am still 
getting used to. For the most part, I have always worked on solo 
teams, and aside from some agile training, I have not led teams 
for year-long sprints. It will be interesting to see how this 
goes over the new year, and I am looking forward to researching 
emergent behaviours for the future!
`
)

article.addReference(
`
C. Szabo, "Complex Systems Modeling and Analysis," 2024 Winter 
Simulation Conference (WSC), Orlando, FL, USA, 2024, pp. 1-14, 
doi: 10.1109/WSC63780.2024.10838891.
`
)
article.addReference(
`
Reynolds, C. W. 1987. “Flocks, Herds and Schools: A Distributed 
Behavioral Model”. In Proceedings of the 14th Annual
Conference on Computer Graphics and Interactive Techniques, 
SIGGRAPH ’87, 25–34. New York, USA: ACM https:
//doi.org/10.1145/37401.37406.
`
)
article.addReference(
`
Gardner, M. 1970. “The Fantastic Combinations of John Conway’s 
New Solitaire Game “Life””. Scientific American 223:120–123
`
)
article.addReference(
`
Chen, C., S. B. Nagl, and C. D. Clack. 2007. “Specifying, 
Detecting and Analysing Emergent Behaviours in Multi-Level
Agent-Based Simulations”. In Proceedings of the Summer 
Computer Simulation Conference, 969–976. New York, USA:
Association for Computing Machinery, Inc.
`
)

export default article