import { ArticleStructure } from "../../articleElement.js";

const vistingRWTHAachen = new ArticleStructure(
    "Research visit at RWTH Aachen",
    "rwthVist2023"
)

vistingRWTHAachen.addTextSection(
`
Nearing the end of 2023, I came across the Advanced Research Opportunities 
Program (AROP) through a LinkedIn post by Prof. Wil van der Aalst. 
Seeing it as an opportunity to travel to Europe and have some of the costs 
covered by a leading institution, I brought the idea to my supervisors. 
After some discussion, we developed a research agenda that could allow me 
to visit and ensure that the candidature would not be put on hold. Thankfully, 
Prof. Sander Leemans was happy to be the sponsoring academic for the 
application. The program supports students and academics outside the country 
who want to visit RWTH Aachen.
`
)

vistingRWTHAachen.addQuote(
`
RWTH offers fellowships and travel grants to support research stays of 
doctoral candidates and postdocs from strategically relevant international 
universities or research institutions. Funding is provided by the Excellence 
Strategy of the German federal and state governments.
<br>
The goal of the Advanced Research Opportunities Program (AROP) is to develop 
and/or strengthen bilateral relations with international partner institutions. 
In addition to receiving funding for their research stay and travel, AROP 
fellows may participate in German-language classes and intercultural training 
at RWTH.
`,
"RWTH Aachen, 2024"
)

vistingRWTHAachen.addTextSection(
`
I was lucky enough to get approved for an AROP grant, and by the 13th of 
December, 2023, I was in Europe until the 20th of March, 2024. During this 
time, I would work closely with Prof. Sander Leemans on a stochastic process 
mining contribution to advance my candidature. The visit was aimed at a 
publication at BPM2024, but unfortunately, it would not get up at the venue. 
However, the work is still a major contribution to my thesis. We would also
work with Dr. Jannis Bertand from KU Leuven on the work as well.
`
)

vistingRWTHAachen.addTextSection(
`
During the visit, I also made a quick visit to Eindhoven University of 
Technology (TU/e) to catch up with Prof. Felix Mannhardt and present a talk 
at the Process Analytics group, led by Prof. Boudewijn van Dongen. The 
presentation was about our recent work with Felix, <i>"Comparing Conformance 
Checking for Decision Mining: An Axiomatic Approach"</i>, which focused on 
understanding the challenges of data-aware conformance checking. It was an 
honour to see and meet the members of the process analytics group at TU/e, 
where process mining began to blossom into the discipline that it is today.
`
)

vistingRWTHAachen.addPdfSection(
"2024/Adam_Banham_eindhoven_pa_2024.pdf",
"My presentation slides for Comparing Conformance Checking for Decision Mining"
)

vistingRWTHAachen.addTextSection(
`
Another event that occurred during my visit was a workshop between TU/e, KU 
Leuven, and RWTH Aachen, ELA AI Triangle Workshop on Process Mining where 24 
PhD candidates gave talks about their work and advancements for process mining. 
This workshop was an excellent opportunity to hear and discuss with many other 
candidates focusing on process mining. It was also great to catch up with 
Alexander Stevens, who introduced me to Dr Jari Peeperkorn, Dr Jannis Bertand, 
and his supervisor, Prof. Johannes De Smedt. After the workshop, I also got 
to grab a beer with Prof. Jochen de Weerdt and Prof. Wil M.P van der Aalst.
`
)

vistingRWTHAachen.addTextSection(
`
I am horrible at keeping memories in photo form but below are some highlights 
from the trip.
`
)

vistingRWTHAachen.addCarousel(
"Various moments from the European trip to visit RWTH Aachen",
{
    src:"/photos/rwthVist2023/01_RWTH_Aachen.jpg",
    header: "RWTH Aachen, DE",
    subtitle: "Informatik 9"
},
{
    src:"/photos/rwthVist2023/02_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: "Lousberg"
},
{
    src:"/photos/rwthVist2023/03_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: "Lousberg"
},
{
    src:"/photos/rwthVist2023/04_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: ""
},
{
    src:"/photos/rwthVist2023/05_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: "Aachener Dom"
},
{
    src:"/photos/rwthVist2023/06_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: "Snow!!!"
},
{
    src:"/photos/rwthVist2023/07_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: "Snow!!!"
},
{
    src:"/photos/rwthVist2023/08_RWTH_Aachen.jpg",
    header: "Aachen, DE",
    subtitle: "Snow!!!"
},
{
    src:"/photos/rwthVist2023/09_RWTH_Aachen.jpg",
    header: "Informatik 9, Aachen, DE",
    subtitle: "Snow!!!"
},
{
    src:"/photos/rwthVist2023/10_TUE_Einhoven.jpg",
    header: "Eindhoven, NL",
    subtitle: "Technische Universiteit Eindhoven"
},
{
    src:"/photos/rwthVist2023/11_TUE_Einhoven.jpg",
    header: "Eindhoven, NL",
    subtitle: "Flying Pins"
},
{
    src:"/photos/rwthVist2023/12_TUE_Einhoven.jpg",
    header: "Eindhoven, NL",
    subtitle: "Technische Universiteit Eindhoven"
},
{
    src:"/photos/rwthVist2023/17_Leuven.jpg",
    header: "Leuven, BE",
    subtitle: "Sint-Pieterskerk"
},
{
    src:"/photos/rwthVist2023/13_london_bridge.jpg",
    header: "London, UK",
    subtitle: "Tower Bridge"
},
{
    src:"/photos/rwthVist2023/14_london_park_a.jpg",
    header: "Milton Keynes, United Kingdom",
    subtitle: "Bletchley Park"
},
{
    src:"/photos/rwthVist2023/14_london_park_b.jpg",
    header: "Bletchley Park, Milton Keynes, United Kingdom",
    subtitle: "(Fake) Bombe machine used for code cracking"
},
{
    src:"/photos/rwthVist2023/15_BPM_room.jpg",
    header: "Informatik 9, Aachen, DE",
    subtitle: "The room with Nick and Tian"
},
{
    src:"/photos/rwthVist2023/16_Dom.jpg",
    header: "Cologne, DE",
    subtitle: "Kölner Dom"
},
)

export default vistingRWTHAachen;