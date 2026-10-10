import{U as Qe}from"./vue-code-block.es-Dlv9Mi5U.js";import{p as M,h as we,i as me,j as v,k as S,l as F,m as j,n as Ce,q as Te,s as Ie,v as Ye,w as Be,x as te,y as Pe,z as $e,A as Ke,B as Xe,C as be,D as N,E as g,a as i,G as A,H as R,T as Je,f as oe,I as ne,J as De,K as ie,L as Re,M as Ze,N as Y,O as et,P as Q,Q as tt,R as at,S as ot,U as nt,V as it,W as st,X as Ee,Y as rt,Z as Fe,$ as Me,F as ee,a0 as fe,a1 as Le,a2 as lt,a3 as ae,a4 as ke,a5 as ct,a6 as G,a7 as Ve,a8 as dt,a9 as ge,aa as ht,ab as ut,ac as mt,ad as ft,ae as gt,af as pt,ag as vt,ah as yt,ai as wt,aj as bt,ak as kt,al as _e,d as _t,o as w,c as k,am as de,r as he,t as _,b as J,g as xt,an as ue,ao as St}from"./app-bSaJObPU.js";const At=M({chunkCount:{type:[Number,String],default:null},chunkWidth:{type:[Number,String],default:null},chunkGap:{type:[Number,String],default:4}},"chunks");function Ct(e,o){const t=F(()=>!!e.chunkCount||!!e.chunkWidth),n=v(()=>{const h=we(o);if(!h)return 0;if(!e.chunkCount)return Number(e.chunkWidth);const a=Number(e.chunkCount);return(h-Number(e.chunkGap)*(a-1))/a}),s=F(()=>Number(e.chunkGap)),l=v(()=>{if(!t.value)return{};const h=S(s.value),a=S(n.value);return{maskRepeat:"repeat-x",maskImage:`linear-gradient(90deg, #000, #000 ${a}, transparent ${a}, transparent)`,maskSize:`calc(${a} + ${h}) 100%`}});function r(h){const a=we(o);if(!a)return h;const m=100*s.value/a,d=100*(n.value+s.value)/a,b=Math.floor((h+m)/d+1e-9);return me(b*d-m/2,0,100)}return{hasChunks:t,chunksMaskStyles:l,snapValueToChunk:r}}const Tt=M({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...At(),...Y(),...Ze({location:"top"}),...Re(),...ie(),...De()},"VProgressLinear"),It=j()({name:"VProgressLinear",props:Tt(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:t}=o;const n=oe(),s=Ce(e,"modelValue"),{isRtl:l,rtlClasses:r}=Te(),{themeClasses:h}=Ie(e),{locationStyles:a}=Ye(e),{textColorClasses:m,textColorStyles:d}=Be(()=>e.color),{backgroundColorClasses:b,backgroundColorStyles:p}=te(()=>e.bgColor||e.color),{backgroundColorClasses:x,backgroundColorStyles:B}=te(()=>e.bufferColor||e.bgColor||e.color),{backgroundColorClasses:E,backgroundColorStyles:W}=te(()=>e.color),{roundedClasses:K}=Pe(e),{intersectionRef:O,isIntersecting:se}=$e(),q=v(()=>parseFloat(e.max)),P=v(()=>parseFloat(e.height)),u=v(()=>me(parseFloat(e.bufferValue)/q.value*100,0,100)),y=v(()=>me(parseFloat(s.value)/q.value*100,0,100)),f=v(()=>l.value!==e.reverse),H=v(()=>e.indeterminate?"fade-transition":"slide-x-transition"),X=ne(0),{hasChunks:z,chunksMaskStyles:ye,snapValueToChunk:re}=Ct(e,X);Ke(z,()=>{const{resizeRef:U}=Xe(le=>X.value=le[0].contentRect.width);be(()=>U.value=n.value)});const Ue=v(()=>z.value?re(u.value):u.value),Oe=v(()=>z.value?re(y.value):y.value);function qe(U){if(!O.value)return;const{left:le,right:ze,width:ce}=O.value.getBoundingClientRect(),Ge=f.value?ce-U.clientX+(ze-ce):U.clientX-le;s.value=Math.round(Ge/ce*q.value)}return be(()=>{O.value=n.value}),N(()=>g(e.tag,{ref:n,class:A(["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&se.value,"v-progress-linear--reverse":f.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped,"v-progress-linear--clickable":e.clickable},K.value,h.value,r.value,e.class]),style:R([{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?S(P.value):0,"--v-progress-linear-height":S(P.value),...e.absolute?a.value:{}},ye.value,e.style]),role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:Math.min(parseFloat(s.value),q.value),onClick:e.clickable&&qe},{default:()=>[e.stream&&i("div",{key:"stream",class:A(["v-progress-linear__stream",m.value]),style:{...d.value,[f.value?"left":"right"]:S(-P.value),borderTop:`${S(P.value/2)} dotted`,opacity:e.bufferOpacity!=null?parseFloat(e.bufferOpacity):void 0,top:`calc(50% - ${S(P.value/4)})`,width:S(100-u.value,"%"),"--v-progress-linear-stream-to":S(P.value*(f.value?1:-1))}},null),i("div",{class:A(["v-progress-linear__background",b.value]),style:R([p.value,{opacity:e.bgOpacity!=null?parseFloat(e.bgOpacity):void 0,width:e.stream?0:void 0}])},null),i("div",{class:A(["v-progress-linear__buffer",x.value]),style:R([B.value,{opacity:e.bufferOpacity!=null?parseFloat(e.bufferOpacity):void 0,width:S(Ue.value,"%")}])},null),g(Je,{name:H.value},{default:()=>[e.indeterminate?i("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(U=>i("div",{key:U,class:A(["v-progress-linear__indeterminate",U,E.value]),style:R(W.value)},null))]):i("div",{class:A(["v-progress-linear__determinate",E.value]),style:R([W.value,{width:S(Oe.value,"%")}])},null)]}),t.default&&i("div",{class:"v-progress-linear__content"},[t.default({value:y.value,buffer:u.value})])]})),{}}});class ${constructor(o,t){this.title=o,this.id=t,this.components=[],this.references=[],this.figures=0,this.snippets=0,this.quotes=0,this.clips=0,this.files=0,this.carousels=0,this.defintions=0}addTextSection(o){this.components.push(new Bt(o))}addQuote(o,t){this.quotes+=1,this.components.push(new Dt(o,t,this.quotes))}addReference(o){this.references.push(new Et(o))}addCode(o,t,n){this.snippets+=1,this.components.push(new Rt(o,t,n,this.snippets))}addFigure(o,t){this.figures+=1,this.components.push(new Pt(o,t,this.figures))}addProfile(o,t,n,s){this.components.push(new Ft(o,t,n,s))}addYoutubeSection(o,t,n,s){this.clips+=1,this.components.push(new Mt(o,t,n,s,this.clips))}addPdfSection(o,t){this.files+=1,this.components.push(new Lt(o,t,this.files))}addCarousel(o,...t){this.carousels+=1,this.components.push(new Vt(o,t,this.carousels))}addDefintion(o,t){this.defintions+=1,this.components.push(new Wt(o,t,this.defintions))}getComponents(){return this.components}getReferences(){return this.references}}const L={text:1,figure:2,quote:3,code:4,profile:5,youtube:6,pdf:7,carousel:8,definition:9};class Bt{constructor(o){this.mode=L.text,this.value="<p> "+o+" </p>"}}class Pt{constructor(o,t,n){this.mode=L.figure,this.path=o,this.alt=t,this.count=n}}class Dt{constructor(o,t,n){this.value=o,this.label=t,this.mode=L.quote,this.count=n}}class Rt{constructor(o,t,n,s){this.mode=L.code,this.code=o,this.lang=t,this.label=n,this.count=s}}class Et{constructor(o){this.value=o}}class Ft{constructor(o,t,n,s){this.mode=L.profile,this.name=o,this.photo=t,this.blur=n,s==null?this.align="L":this.align=s}}class Mt{constructor(o,t,n,s,l){this.mode=L.youtube,this.youtube=o,this.title=t,this.pretext=n,this.posttext=s,this.clipNo=l}}class Lt{constructor(o,t,n){this.mode=L.pdf,this.file=o,this.title=t,this.fileNo=n}}class Vt{constructor(o,t,n){this.mode=L.carousel,this.title=o,this.photos=t,this.carouselNo=n}}class Wt{constructor(o,t,n){this.mode=L.definition,this.name=o,this.content=t,this.defNo=n}}const T=new $("Final Seminar @ QUT","FinalSeminar2024A");T.addYoutubeSection("https://www.youtube.com/embed/0laVKLJye9g","A short introduction to process mining with exogenous data.",`
If you are after a quick introduction to my thesis, then the clip below 
discusses the motivation of the contributions presented in my thesis.
`,`
However, if you interested in hearing about the journey towards a doctorate
at the Queendland University of Techonology, or at least my own experience, 
then read on. At the end of the blog, a full recording of the final seminar 
is included for the interested <br>(see this <a href="#clip-2"><u>clip</u></a>).
`);T.addTextSection(`
Reflecting on the past three years of my candidature, my final seminar 
represents the beginning of the closure of the candidature. The Australian 
system for PhDs, or at least the procedures at my university (Queensland  
University of Technology), consists of several phases which lead to a 
candidate receiving a doctorate. A successful candidate must pass all of 
these phases with a recommendation for the university to confer the doctorate.
`);T.addQuote(`
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
`,"Queensland University of Technology, 2024");T.addTextSection(`
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
`);T.addProfile("Professor Moe T Wynn","moe-wynn.png",`
Prof. Wynn leads the Process Science Academic Program (formerly Business Process 
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
`,"L");T.addProfile("Doctor Alizera Nili","alizera-nili.jpeg",`
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
`,"R");T.addProfile("Adjunct Professor Colin Fidge","colin-fidge.png",`
Prior to his retirement Prof. Colin Fidge pursued a four-decade teaching and 
research career in high-integrity software engineering, modelling and analysis 
of complex, computer-based systems, and enterprise system re-engineering. In 
retirement he continues to advise on research in the Schools of Computer 
Science and Information Systems, Queensland University of Technology. He has 
been awarded 17 Australian Research Council grants, and led nine research 
projects for industry and the Australian Department of Defence, mainly in the 
fields of safety-critical and security-critical systems. He graduated 25 PhD 
students and 4 Research Masters students.
`,"L");T.addTextSection(`
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
`);T.addQuote(`
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
`,"Queensland University of Technology, 2024");T.addTextSection(`
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
`);T.addTextSection(`
But let's not dwell on despair; instead, let's revisit what was a successful 
three-year research plan. The plan had a budget of $3000 AUD or roughly
&euro; 1,800 for the three years, and I managed to publish three times, 
which meant I was well over budget (thankfully, my wonderful supervisers 
covered the overdraw). It started in the middle of the COVID-15 pandemic, 
and while Brisbane didn't 
have long periods of lockdowns due to the somewhat low reporting of cases, 
it still meant a lot of working from home. 
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
`);T.addYoutubeSection("https://youtube.com/embed/u7f8Fx6BubY","Adam Banham, 2024, Final Seminar, Process Mining with Exogenous Data",`
This clip is a re-recording of the final seminar that I presented in 
August 2024.
`,"");const D=new $("Confirmation Seminar @ QUT","confirmSeminar2022");D.addTextSection(`
The confirmation of candidature for PhD candidates at Queensland University 
of Technology (QUT) represents a key milestone to ensure their future success. 
It occurs at the 12-month mark in the candidature, and the confirmation is an 
internal seminar to assess the candidate's current progress and the future 
aspirations of their research plan. The confirmation consists of a panel of 
peers, where one member is from the supervision team, one from the supporting 
school, and one member external to the supporting school. My consisted of the 
following members:
`);D.addProfile("Professor Arthur ter Hofstede","arthur-ter-hofstede.jpg",`
Arthur ter Hofstede is a professor in the Faculty of Science. From 2010-2018 
he was a Professor at Eindhoven University of Technology in the Netherlands. 
In 2010-2011 he was a Senior Visiting Scholar of Tsinghua University in China 
and in May 2010 a Visiting Professor of Sapienza University of Rome in Italy. 
Since 2015 he is a Visiting Professor of Sun Yat-sen University. His research
contritues to Conceptual, formal, and technological foundations of Business 
Process Automation (e.g. BPM in the cloud) as well as Process Mining, 
specifically data quality, comparative performance analysis,  process risk 
analysis, and visualisation. Work in the area of process automation centers 
on the YAWL (Yet Another Workflow Language) open source workflow management 
system, which is based on the well-known Workflow Patterns Initiative. This 
system is used in industry and provides a test bed for the application of new 
research ideas.
`,"R");D.addProfile("Professor Richi Nayak","richi-nayak.jpg",`
Prof. Richi Nayak is an internationally recognised expert in data mining, text mining 
and web intelligence. She has combined knowledge in these areas very 
successfully with diverse disciplines such as Social Science, Science, 
and Engineering for technology transfer to real-world problems to change 
their practices and methodologies. Her particular research interests are 
machine learning and in recent years she has concentrated her work on text 
mining, personalization, automation, and social network analysis. She has 
published high-quality conference and journal articles and is highly cited 
in her research field. She has received a number of awards and nominations 
for teaching, research and service activities. She is the Applied Data 
Science Program Leader of the University Centre for Data Science (CDS).
`,"L");D.addProfile("Professor Moe T Wynn","moe-wynn.png",`
Prof. Wynn leads the Process Science Academic Program (formerly Business Process 
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
`,"R");D.addTextSection(`
The candidate needs to prepare a working research plan in the form of a report. 
The report should describe the current progress, such as initial investigations, 
work-in-progress papers, and publications. Also, the report must present a 
research plan for the coming two years that is likely to be completed in a 
timely manner, i.e., it should be realistically possible for a candidate to 
complete it in the remaining time left in their candidature. The panel's role 
is to assess the candidate's plan and progress towards a doctorate. QUT 
outlines the outcomes of the confirmation, as it was within my candidature, 
as:
`);D.addQuote(`
The panel assess the candidates capacity to complete the degree successfully 
in a timely fashion and agree on a confirmation outcome. The panel chair 
recommends the confirmation outcome to the Research Degrees Committee (RDC) 
using the confirmation panel report form. After considering the panel's report 
and recommendation, the RDC will either:<br>
<ul style="text-align: left;width:80%;margin:auto;">
    <li>confirm the candidature if certain conditions are met;</li>
    <li>require changes to the planned research program;</li>
    <li>place the candidate under review for up to 3 months if the panel 
    recommends not confirming the candidature.</li>
</ul>
If the candidates progress is still unsatisfactory after the under review 
period, the RDC - on advice from the faculty - will either:<br>
<ul style="text-align: left;width:80%;margin:auto;">
    <li>extend the review period by up to 3 months;</li>
    <li>allow the candidate to Show Cause why the committee should not 
    either:</li>
    <ul style="margin-left:10px">
        <li>academically exclude you with an offer of admission to the 
        Master of Philosophy course;</li>
        <li>academically exclude you from the PhD course with no such 
        offer.</li>
    </ul>
</ul>
`,"Queensland University of Technology, 2024");D.addTextSection(`
While the outcomes seem extreme, most candidates will receive minor/major 
changes, often seen as the ideal outcome from confirmation. The more extreme 
cases occur only in very rare cases, showcasing the wonderful supervisors and 
their experienced mentorship at my school, Information Systems. 
<b>
However, in my case, the presentation and report were enough evidence for the 
panel to recommend one of the rare cases, no changes needed! 
</b>
Reflecting on this moment, it was between Prof. Sander Leemans leaving QUT 
and preparing a submission for a Q1 venue, so I am glad that I could achieve 
this outcome. However, after the supervision team change, Prof. Sander Leemans 
moved from lead to external, which meant I had to change the research plan I 
would follow for the rest of the candidature. This change was not unexpected, 
academic endeavours are like a discussion, and I was only starting the 
conversion at this stage.
`);D.addTextSection(`
Below are the documents I used for my confirmation back in 2022, with all the 
blemishes and mistakes. Please do not hold my current self to the quality of 
these documents. I hope that others at QUT may find some inspiration from 
these documents if they are searching.
`);D.addPdfSection("2024/Adam_Banham___PhD___Confirmation_of_Candidature.pdf","Adam Banham, 2022, Confirmation of Candidature Report");D.addPdfSection("2024/Adam_Banham_PhD_confirmation_presentation.pdf","Adam Banham, 2022, Confirmation of Candidature Seminar Presentation");const V=new $("Research visit at RWTH Aachen","rwthVist2023");V.addTextSection(`
Nearing the end of 2023, I came across the Advanced Research Opportunities 
Program (AROP) through a LinkedIn post by Prof. Wil van der Aalst. 
Seeing it as an opportunity to travel to Europe and have some of the costs 
covered by a leading institution, I brought the idea to my supervisors. 
After some discussion, we developed a research agenda that could allow me 
to visit and ensure that the candidature would not be put on hold. Thankfully, 
Prof. Sander Leemans was happy to be the sponsoring academic for the 
application. The program supports students and academics outside the country 
who want to visit RWTH Aachen.
`);V.addQuote(`
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
`,"RWTH Aachen, 2024");V.addTextSection(`
I was lucky enough to get approved for an AROP grant, and by the 13th of 
December, 2023, I was in Europe until the 20th of March, 2024. During this 
time, I would work closely with Prof. Sander Leemans on a stochastic process 
mining contribution to advance my candidature. The visit was aimed at a 
publication at BPM2024, but unfortunately, it would not get up at the venue. 
However, the work is still a major contribution to my thesis. We would also
work with Dr. Jannis Bertand from KU Leuven on the work as well.
`);V.addTextSection(`
During the visit, I also made a quick visit to Eindhoven University of 
Technology (TU/e) to catch up with Prof. Felix Mannhardt and present a talk 
at the Process Analytics group, led by Prof. Boudewijn van Dongen. The 
presentation was about our recent work with Felix, <i>"Comparing Conformance 
Checking for Decision Mining: An Axiomatic Approach"</i>, which focused on 
understanding the challenges of data-aware conformance checking. It was an 
honour to see and meet the members of the process analytics group at TU/e, 
where process mining began to blossom into the discipline that it is today.
`);V.addPdfSection("2024/Adam_Banham_eindhoven_pa_2024.pdf","My presentation slides for Comparing Conformance Checking for Decision Mining");V.addTextSection(`
Another event that occurred during my visit was a workshop between TU/e, KU 
Leuven, and RWTH Aachen, ELA AI Triangle Workshop on Process Mining where 24 
PhD candidates gave talks about their work and advancements for process mining. 
This workshop was an excellent opportunity to hear and discuss with many other 
candidates focusing on process mining. It was also great to catch up with 
Alexander Stevens, who introduced me to Dr Jari Peeperkorn, Dr Jannis Bertand, 
and his supervisor, Prof. Johannes De Smedt. After the workshop, I also got 
to grab a beer with Prof. Jochen de Weerdt and Prof. Wil M.P van der Aalst.
`);V.addTextSection(`
I am horrible at keeping memories in photo form but below are some highlights 
from the trip.
`);V.addCarousel("Various moments from the European trip to visit RWTH Aachen",{src:"/photos/rwthVist2023/01_RWTH_Aachen.jpg",header:"RWTH Aachen, DE",subtitle:"Informatik 9"},{src:"/photos/rwthVist2023/02_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:"Lousberg"},{src:"/photos/rwthVist2023/03_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:"Lousberg"},{src:"/photos/rwthVist2023/04_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:""},{src:"/photos/rwthVist2023/05_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:"Aachener Dom"},{src:"/photos/rwthVist2023/06_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:"Snow!!!"},{src:"/photos/rwthVist2023/07_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:"Snow!!!"},{src:"/photos/rwthVist2023/08_RWTH_Aachen.jpg",header:"Aachen, DE",subtitle:"Snow!!!"},{src:"/photos/rwthVist2023/09_RWTH_Aachen.jpg",header:"Informatik 9, Aachen, DE",subtitle:"Snow!!!"},{src:"/photos/rwthVist2023/10_TUE_Einhoven.jpg",header:"Eindhoven, NL",subtitle:"Technische Universiteit Eindhoven"},{src:"/photos/rwthVist2023/11_TUE_Einhoven.jpg",header:"Eindhoven, NL",subtitle:"Flying Pins"},{src:"/photos/rwthVist2023/12_TUE_Einhoven.jpg",header:"Eindhoven, NL",subtitle:"Technische Universiteit Eindhoven"},{src:"/photos/rwthVist2023/17_Leuven.jpg",header:"Leuven, BE",subtitle:"Sint-Pieterskerk"},{src:"/photos/rwthVist2023/13_london_bridge.jpg",header:"London, UK",subtitle:"Tower Bridge"},{src:"/photos/rwthVist2023/14_london_park_a.jpg",header:"Milton Keynes, United Kingdom",subtitle:"Bletchley Park"},{src:"/photos/rwthVist2023/14_london_park_b.jpg",header:"Bletchley Park, Milton Keynes, United Kingdom",subtitle:"(Fake) Bombe machine used for code cracking"},{src:"/photos/rwthVist2023/15_BPM_room.jpg",header:"Informatik 9, Aachen, DE",subtitle:"The room with Nick and Tian"},{src:"/photos/rwthVist2023/16_Dom.jpg",header:"Cologne, DE",subtitle:"Kölner Dom"});const c=new $("Agrawal Miner implemented in Koalas","AgrawalMiner2024B");c.addTextSection(`
    While searching through literature for my thesis, I came across an early 
    survey of workflow mining, ''Workflow mining: A survey of issues and 
    approaches'' by W. M. P. van der Aalst, B. F. van Dongen et al., in 2003 
    <a href="#ref-1">[1]</a>.
     In this survey, we can already see many of the problems that process mining 
     today explores, such as discovering a formal description of a process from 
     the executions of a process. The survey also points to one of the earliest 
     works on process discovery, and this post explores this early process 
     discovery approach.
    `);c.addTextSection(`
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
    `);c.addQuote(`
    We present a new approach to address the problem of model construction.
    We describe an algorithm that, given a log of unstructured executions
    of a process, generates a graph model of the process.
    `,"R. Agrawal, D. Gunopulos, and F. Leymann, 1998");c.addTextSection(`
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
    `);c.addQuote(`
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
    `,`
    Def.7, Page 474, R. Agrawal, D. Gunopulos, and F. Leymann, 1998
    `);c.addTextSection(`
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
    `);c.addCode(`
    pip install pmkoalas==0.3.1
    `,"shell","How to install pmkoalas into a local python environment from pypi.");c.addTextSection(`
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
    `);c.addCode(`
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
    `,"python","Code to compute the conformal graph discovered by the Agrawal Miner using a log from the special class.");c.addFigure("AgrawalMiner2024B/agrawal_code_ex_1.svg","A conformal graph discovered by the Agrawal Miner, using the dot digraph supplied by the snippet.");c.addTextSection(`
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
    `);c.addCode(`
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
    `,"python","Code snippet to run the miner on the relaxed samples of a process.");c.addFigure("AgrawalMiner2024B/agrawal_code_ex_2.svg","The resulting dependency graph discovered by the Agrawal Miner.");c.addTextSection(`
    Notably, an assumption of the approaches proposed by R. Agrawal et al. is 
    that their graphs have a single source and sink. However, there is a 
    simple workaround for when the log contains executions with different 
    start activities and end activities. The workaround is to prefix and suffix 
    executions with a pseudo activity. So, for example, if two new activities 
    G,H are introduced to the previous log, producing
    <b>{HABCF, ACDF, ADEFG, AECF}</b>, 
    then following graph in 
    <a href="#figure-3">Figure 3</a>, is found.
    `);c.addCode(`
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
        print(graph.create_dot_form().replace(";",";
"))
        for trace, n in  log: 
            # you are responsible for adding the prefix and suffix after
            # discovery, a copy is used internally for the miner.
            trace = Trace(["start"]+list(trace)+["end"])
            info(f"{trace} accepted by graph? :: {graph.does_not_violate(trace)}")
    
    if __name__ == "__main__":
        main() 
    `,"python","Code snippet to run the miner on the adjusted samples.");c.addFigure("AgrawalMiner2024B/agrawal_code_ex_2b.svg","The resulting dependency graph discovered by the Agrawal Miner when executions cannot agree on starting and ending activities.");c.addTextSection(`
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
    `);c.addCode(`
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
    `,"python","Snippet to run the Agrawal Miner on the considered log. Note testing if an execution is consistent with a graph with cycles is less clear than before.");c.addFigure("AgrawalMiner2024B/agrawal_code_ex_3.svg","A dependency graph discovered from samples of process with cycles.");c.addTextSection(`
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
    `);c.addQuote(`
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
    `,"W. M. P. van der Aalst, B. F. van Dongen, et al., Workflow mining: A survey of issues and approaches");c.addTextSection(`
    To explore the implementation in koalas, I also conducted some testing
    on the runtime using some modern publically avaiable event logs.
    The event logs used were:
    <b> BPIC13, BPIC20, road fines, sepsis</b>.
    However, for testing purposes only the BPIC15 was used to consider 
    runtime performance.
    Where testing consisted of sampling the log and adjusting the traces based
    on the requirements to trigger one of three algorithms proposed by R. 
    Agrawal et al.
    `);c.addFigure("AgrawalMiner2024B/special_runtime.svg","Runtime analysis when only considering adjusted samples from BPIC15  that execute activities exactly once.");c.addFigure("AgrawalMiner2024B/general_runtime.svg","Runtime analysis when only considering adjusted samples from BPIC15  that may execute activities once. Runtime reaching 20 activities was not completed due to runtime.");c.addFigure("AgrawalMiner2024B/opt_runtime.svg","Runtime analysis when only considering adjusted samples from BPIC15  that may execute activities once, after optimisation.");c.addFigure("AgrawalMiner2024B/cyclic_opt_runtime.svg","Runtime analysis when only considering adjusted samples from BPIC15  that may execute activities repeatly, after optimisation.");c.addTextSection(`
    The runtime testing shows that when executions are increased, we see a
    linear increase in runtime; while when the number of activities are 
    increased we see a much larger impact on runtime. This reflects the general
    nature of the algorithms complexity, 
    where m is the number of executions,
    n is the number of activities observed,
    and k is the most times any activity is repeated,
    then at worst the approach is O(m(kn)^3) and at best it is O(mn^2) as 
    reported by R. Agrawal et al.
    `);c.addTextSection(`
    Some additional graphs were computed and are shown below for the curious 
    wretched, interested to see how the approach presents our modern event logs.
    `);c.addFigure("AgrawalMiner2024B/logs/BPIC13_closed.svg","Agrawal miner applied to BPIC13 - closed.");c.addFigure("AgrawalMiner2024B/logs/BPIC13_incidents.svg","Agrawal miner applied to BPIC13 - incidents.");c.addFigure("AgrawalMiner2024B/logs/BPIC13_open.svg","Agrawal miner applied to BPIC13 - open.");c.addFigure("AgrawalMiner2024B/logs/BPIC15.svg","Agrawal miner applied to BPIC15.");c.addFigure("AgrawalMiner2024B/logs/road_fines.svg","Agrawal miner applied to road fines.");c.addFigure("AgrawalMiner2024B/logs/sepsis.svg","Agrawal miner applied to sepsis.");c.addReference(`
    W. M. P. van der Aalst, B. F. van Dongen, J. Herbst, L. Maruster, G. Schimm, and
    A. J. M. M. Weijters, “Workflow mining: A survey of issues and approaches,” Data
    Knowl. Eng., vol. 47, no. 2, pp. 237–267, 2003
    `);c.addReference(`
    R. Agrawal, D. Gunopulos, and F. Leymann, “Mining process models from workflow
    logs,” in EDBT, ser. Lecture Notes in Computer Science, vol. 1377, Springer, 1998,
    pp. 469–483
    `);const I=new $("The Difference between Endo And Exo","DifExoEndo2023");I.addTextSection(`
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
`);I.addTextSection(`
To motivate for process analysis that does not flatten contextual information 
to inform our understanding of processes, two categories of data sources are 
introduced. Endogenous data groups all streams of state changes related to 
the execution of processes. While external data streams, or exogenous data, 
groups all streams of measurements for phenomena that cannot be entirely 
produced or divided from endogenous data. The definitions below provide a 
short statement to delimate streams into these categories.
`);I.addDefintion("Endogenous Streams",`
An endogenous stream is a finite sequence of timestamped state changes that 
describe a historical execution of a process.
`);I.addDefintion("Exogenous Streams",`
An exogenous stream is a possibly finite sequence of timestamped measurements 
that describes the observation of any phenomenon and are not fully determined 
by a process execution.
`);I.addTextSection(`
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
`);I.addFigure("blog/DifExoEndo2023/rose_onion.png","Roseman, Recker, and Flender views on conceptual dimensions around processes [1].");I.addTextSection(`
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
`);I.addFigure("blog/DifExoEndo2023/aalst_onion.png","van der Aalst and Dustdar views on conceptual dimensions around processes [2].");I.addTextSection(`
Thankfully, van der Aalst and Dustdar [2] provide a reconceptualisation of 
the onion layers focusing on data sources and their impact on process 
behaviour, as shown in Figure 2. Their layers focus on the types of streams 
likely to present on each layer. Whereby endogenous streams cover the instance 
and process context layers, while exogenous streams cover the process, social, 
and external context layers. Showcasing that exogenous streams can stem from 
concurrent process executions on the process context layer.
`);I.addTextSection(`
My thesis, 
"<b><i>Process Mining with Exogenous Data</i></b>", 
does not solve and resolve all the differences between endogenous and 
exogenous data for process analysis. However, the work encourages more 
techniques that cater to the intertwinement of both discrete and temporal 
dimensions for process mining.
`);I.addReference(`
M. Rosemann, J. Recker, and C. Flender, “Contextualisation of business 
processes,” Int. J. Bus. Process. Integr. Manag., vol. 3, no. 1, pp. 
47–60, 2008
`);I.addReference(`
W. M. P. van der Aalst and S. Dustdar, “Process mining put into context,” 
IEEE Internet Computing, vol. 16, no. 01, pp. 82–86, 2012
`);const Ht=[D,I,V,c,T];var C=new $("Starting in Academia @ Adelaide University","au-start-25");C.addTextSection(`
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
`);C.addTextSection(`
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
`);C.addCarousel("The 'Big' Attractions along the way to South Australia",{src:"/photos/auStart25/brisbane-2025.jpg",header:"One last look",subtitle:"Brisbane, 2025"},{src:"/photos/auStart25/brisbane-2025-going-away.jpeg",header:"Sendoff drinks!",subtitle:"Brisbane, 2025"},{src:"/photos/auStart25/big-attr-1.jpg",header:"Byron Lighthouse, Australia's Easternmost Point",subtitle:"Byron Bay, 2025"},{src:"/photos/auStart25/big-attr-2.jpg",header:"The Big Banana",subtitle:"Coffs Harbour, 2025"},{src:"/photos/auStart25/big-attr-3.jpg",header:"The Big Kookaburra",subtitle:"Kurri Kurri, 2025"},{src:"/photos/auStart25/big-attr-4.jpg",header:"Sydney Opera House",subtitle:"Sydney, 2025"},{src:"/photos/auStart25/big-attr-5.jpg",header:"The Big Chainsaw",subtitle:"Colac, 2025"},{src:"/photos/auStart25/big-attr-6.jpg",header:"The Twelve Apostles",subtitle:"Princetown, 2025"},{src:"/photos/auStart25/big-attr-7.jpg",header:"The Big Lobster",subtitle:"Kingston SE, 2025"},{src:"/photos/auStart25/big-attr-8.jpg",header:"Big ol' Larry",subtitle:"Kingston SE, 2025"},{src:"/photos/auStart25/big-attr-9.jpg",header:"Birdman of the Coorong",subtitle:"Meningie, 2025"},{src:"/photos/auStart25/big-attr-10.jpg",header:"Cosi's Rhino",subtitle:"Tailem Bend, 2025"});C.addTextSection(`
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
`);C.addProfile("Prof Claudia Szabo","claudia-szabo.jpg",`
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
`);C.addTextSection(`
Prof Claudia has a long history of publications around emergent 
behaviour in complex systems. She describes the nature of the 
problem in a publication @ Winter Simulation Conference 25, 
Complex Systems Modeling and Analysis <a href="#ref-1">[1]</a>.
`);C.addQuote(`
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
`,"Prof Claudia Szabo, Complex Systems Modeling and Analysis, WSC 25");C.addTextSection(`
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
`);C.addTextSection(`
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
`);C.addReference(`
C. Szabo, "Complex Systems Modeling and Analysis," 2024 Winter 
Simulation Conference (WSC), Orlando, FL, USA, 2024, pp. 1-14, 
doi: 10.1109/WSC63780.2024.10838891.
`);C.addReference(`
Reynolds, C. W. 1987. “Flocks, Herds and Schools: A Distributed 
Behavioral Model”. In Proceedings of the 14th Annual
Conference on Computer Graphics and Interactive Techniques, 
SIGGRAPH ’87, 25–34. New York, USA: ACM https:
//doi.org/10.1145/37401.37406.
`);C.addReference(`
Gardner, M. 1970. “The Fantastic Combinations of John Conway’s 
New Solitaire Game “Life””. Scientific American 223:120–123
`);C.addReference(`
Chen, C., S. B. Nagl, and C. D. Clack. 2007. “Specifying, 
Detecting and Analysing Emergent Behaviours in Multi-Level
Agent-Based Simulations”. In Proceedings of the Summer 
Computer Simulation Conference, 969–976. New York, USA:
Association for Computing Machinery, Inc.
`);const jt=[C],Nt=[],Ut={content:Nt},xe=[].concat(Ut.content).concat(Ht).concat(jt);var Ot=[],pe={};for(let e in xe){var Z=xe[e];if(Z.id in pe)throw Error("Found duplicated article id :: "+Z.id);pe[Z.id]=Z,Ot.push(Z.id)}const qt={contentDict:pe},zt=M({divider:[Number,String],...Y()},"VBreadcrumbsDivider"),Gt=j()({name:"VBreadcrumbsDivider",props:zt(),setup(e,o){let{slots:t}=o;return N(()=>i("li",{"aria-hidden":"true",class:A(["v-breadcrumbs-divider",e.class]),style:R(e.style)},[t?.default?.()??e.divider])),{}}}),Qt=M({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...Y(),...ot(nt(),["width","maxWidth"]),...at(),...ie({tag:"li"})},"VBreadcrumbsItem"),Yt=j()({name:"VBreadcrumbsItem",props:Qt(),setup(e,o){let{slots:t,attrs:n}=o;const s=et(e,n),l=v(()=>e.active||s.isActive?.value),{dimensionStyles:r}=tt(e),{textColorClasses:h,textColorStyles:a}=Be(()=>l.value?e.activeColor:e.color);return N(()=>g(e.tag,{class:A(["v-breadcrumbs-item",{"v-breadcrumbs-item--active":l.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:l.value&&e.activeClass},h.value,e.class]),style:R([a.value,r.value,e.style]),"aria-current":l.value?"page":void 0},{default:()=>[s.isLink.value?i("a",Q({class:"v-breadcrumbs-item--link",onClick:s.navigate.value},s.linkProps),[t.default?.()??e.title]):t.default?.()??e.title]})),{}}}),$t=M({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:Ee,items:{type:Array,default:()=>[]},...Y(),...rt(),...Re(),...ie({tag:"ul"})},"VBreadcrumbs"),Kt=j()({name:"VBreadcrumbs",props:$t(),setup(e,o){let{slots:t}=o;const{backgroundColorClasses:n,backgroundColorStyles:s}=te(()=>e.bgColor),{densityClasses:l}=it(e),{roundedClasses:r}=Pe(e);st({VBreadcrumbsDivider:{divider:F(()=>e.divider)},VBreadcrumbsItem:{activeClass:F(()=>e.activeClass),activeColor:F(()=>e.activeColor),color:F(()=>e.color),disabled:F(()=>e.disabled)}});const h=v(()=>e.items.map(a=>typeof a=="string"?{item:{title:a},raw:a}:{item:a,raw:a}));return N(()=>{const a=!!(t.prepend||e.icon);return g(e.tag,{class:A(["v-breadcrumbs",n.value,l.value,r.value,e.class]),style:R([s.value,e.style])},{default:()=>[a&&i("li",{key:"prepend",class:"v-breadcrumbs__prepend"},[t.prepend?g(Me,{key:"prepend-defaults",disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},t.prepend):g(Fe,{key:"prepend-icon",start:!0,icon:e.icon},null)]),h.value.map((m,d,b)=>{let{item:p,raw:x}=m;return i(ee,null,[t.item?.({item:p,index:d})??g(Yt,Q({key:d,disabled:d>=b.length-1},typeof p=="string"?{title:p}:p),{default:t.title?()=>t.title?.({item:p,index:d}):void 0}),d<b.length-1&&g(Gt,null,{default:t.divider?()=>t.divider?.({item:x,index:d}):void 0})])}),t.default?.()]})}),{}}}),Xt=e=>{const{touchstartX:o,touchendX:t,touchstartY:n,touchendY:s}=e,l=.5,r=16;e.offsetX=t-o,e.offsetY=s-n,Math.abs(e.offsetY)<l*Math.abs(e.offsetX)&&(e.left&&t<o-r&&e.left(e),e.right&&t>o+r&&e.right(e)),Math.abs(e.offsetX)<l*Math.abs(e.offsetY)&&(e.up&&s<n-r&&e.up(e),e.down&&s>n+r&&e.down(e))};function Jt(e,o){const t=e.changedTouches[0];o.touchstartX=t.clientX,o.touchstartY=t.clientY,o.start?.({originalEvent:e,...o})}function Zt(e,o){const t=e.changedTouches[0];o.touchendX=t.clientX,o.touchendY=t.clientY,o.end?.({originalEvent:e,...o}),Xt(o)}function ea(e,o){const t=e.changedTouches[0];o.touchmoveX=t.clientX,o.touchmoveY=t.clientY,o.move?.({originalEvent:e,...o})}function ta(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const o={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:t=>Jt(t,o),touchend:t=>Zt(t,o),touchmove:t=>ea(t,o)}}function aa(e,o){const t=o.value,n=t?.parent?e.parentElement:e,s=t?.options??{passive:!0},l=o.instance?.$.uid;if(!n||l===void 0)return;const r=ta(o.value);n._touchHandlers=n._touchHandlers??Object.create(null),n._touchHandlers[l]=r,fe(r).forEach(h=>{n.addEventListener(h,r[h],s)})}function oa(e,o){const t=o.value?.parent?e.parentElement:e,n=o.instance?.$.uid;if(!t?._touchHandlers||n===void 0)return;const s=t._touchHandlers[n];s&&(fe(s).forEach(l=>{t.removeEventListener(l,s[l])}),delete t._touchHandlers[n],fe(t._touchHandlers).length||delete t._touchHandlers)}const ve={mounted:aa,unmounted:oa},We=Symbol.for("vuetify:v-window"),He=Symbol.for("vuetify:v-window-group"),je=M({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},verticalArrows:[Boolean,String],touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},crossfade:Boolean,transitionDuration:Number,...Y(),...ie(),...De()},"VWindow"),Se=j()({name:"VWindow",directives:{vTouch:ve},props:je(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:t}=o;const{themeClasses:n}=Ie(e),{isRtl:s}=Te(),{t:l}=Le(),r=lt(e,He),h=oe(),a=v(()=>s.value?!e.reverse:e.reverse),m=ne(!1),d=v(()=>{if(e.crossfade)return"v-window-crossfade-transition";const u=e.direction==="vertical"?"y":"x",f=(a.value?!m.value:m.value)?"-reverse":"";return`v-window-${u}${f}-transition`}),b=ne(0),p=oe(void 0),x=v(()=>r.items.value.findIndex(u=>r.selected.value.includes(u.id)));ae(x,(u,y)=>{let f;const H={left:0,top:0};ke&&y>=0&&(f=ct(h.value),H.left=f?.scrollLeft,H.top=f?.scrollTop);const X=r.items.value.length,z=X-1;X<=2?m.value=u<y:u===z&&y===0?m.value=!1:u===0&&y===z?m.value=!0:m.value=u<y,G(()=>{if(!ke||!f)return;f.scrollTop!==H.top&&f.scrollTo({...H,behavior:"instant"}),requestAnimationFrame(()=>{if(!f)return;f.scrollTop!==H.top&&f.scrollTo({...H,behavior:"instant"})})})},{flush:"sync"}),ht(We,{transition:d,isReversed:m,transitionCount:b,transitionHeight:p,rootRef:h});const B=F(()=>e.continuous||x.value!==0),E=F(()=>e.continuous||x.value!==r.items.value.length-1);function W(){B.value&&r.prev()}function K(){E.value&&r.next()}const O=v(()=>{const u=[],y={icon:s.value?e.nextIcon:e.prevIcon,class:`v-window__${a.value?"right":"left"}`,onClick:r.prev,"aria-label":l("$vuetify.carousel.prev")};u.push(B.value?t.prev?t.prev({props:y}):g(ge,y,null):i("div",null,null));const f={icon:s.value?e.prevIcon:e.nextIcon,class:`v-window__${a.value?"left":"right"}`,onClick:r.next,"aria-label":l("$vuetify.carousel.next")};return u.push(E.value?t.next?t.next({props:f}):g(ge,f,null):i("div",null,null)),u}),se=v(()=>e.touch===!1?e.touch:{...{left:()=>{a.value?W():K()},right:()=>{a.value?K():W()},start:y=>{let{originalEvent:f}=y;f.stopPropagation()}},...e.touch===!0?{}:e.touch});function q(u){(e.direction==="horizontal"&&u.key==="ArrowLeft"||e.direction==="vertical"&&u.key==="ArrowUp")&&(u.preventDefault(),W(),G(()=>{B.value?P(0):P(1)})),(e.direction==="horizontal"&&u.key==="ArrowRight"||e.direction==="vertical"&&u.key==="ArrowDown")&&(u.preventDefault(),K(),G(()=>{E.value?P(1):P(0)}))}function P(u){const y=O.value[u];if(!y)return;(Array.isArray(y)?y[0]:y).el?.focus()}return N(()=>Ve(g(e.tag,{ref:h,class:A(["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover","v-window--vertical-arrows":!!e.verticalArrows,"v-window--crossfade":!!e.crossfade},n.value,e.class]),style:R([e.style,{"--v-window-transition-duration":dt()?null:S(e.transitionDuration,"ms")}])},{default:()=>[i("div",{class:"v-window__container",style:{height:p.value}},[t.default?.({group:r}),e.showArrows!==!1&&i("div",{class:A(["v-window__controls",{"v-window__controls--left":e.verticalArrows==="left"||e.verticalArrows===!0},{"v-window__controls--right":e.verticalArrows==="right"}]),onKeydown:q},[O.value])]),t.additional?.({group:r})]}),[[ve,se.value]])),{group:r}}}),na=M({color:String,cycle:Boolean,delimiterIcon:{type:Ee,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...je({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),ia=j()({name:"VCarousel",props:na(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:t}=o;const n=Ce(e,"modelValue"),{t:s}=Le(),l=oe();let r=-1;ae(n,a),ae(()=>e.interval,a),ae(()=>e.cycle,d=>{d?a():window.clearTimeout(r)}),ut(h);function h(){!e.cycle||!l.value||(r=window.setTimeout(l.value.group.next,Number(e.interval)>0?Number(e.interval):6e3))}function a(){window.clearTimeout(r),window.requestAnimationFrame(h)}function m(d,b){(e.direction==="horizontal"&&d.key==="ArrowLeft"||e.direction==="vertical"&&d.key==="ArrowUp")&&(d.preventDefault(),b.prev(),G(()=>l.value?.$el.querySelector(".v-btn--active")?.focus())),(e.direction==="horizontal"&&d.key==="ArrowRight"||e.direction==="vertical"&&d.key==="ArrowDown")&&(d.preventDefault(),b.next(),G(()=>l.value?.$el.querySelector(".v-btn--active")?.focus()))}return N(()=>{const d=Se.filterProps(e);return g(Se,Q({ref:l},d,{modelValue:n.value,"onUpdate:modelValue":b=>n.value=b,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:S(e.height)},e.style]}),{default:t.default,additional:b=>{let{group:p}=b;return i(ee,null,[!e.hideDelimiters&&i("div",{class:"v-carousel__controls",style:{left:e.verticalDelimiters==="left"&&e.verticalDelimiters?0:"auto",right:e.verticalDelimiters==="right"?0:"auto"}},[p.items.value.length>0&&g(Me,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[p.items.value.map((x,B)=>{const E={id:`carousel-item-${x.id}`,"aria-label":s("$vuetify.carousel.ariaLabel.delimiter",B+1,p.items.value.length),class:["v-carousel__controls__item",p.isSelected(x.id)&&"v-btn--active"],onClick:()=>p.select(x.id,!0),onKeydown:W=>m(W,p)};return t.item?t.item({props:E,item:x}):g(ge,Q(x,E),null)})]})]),e.progress&&g(It,{absolute:!0,class:"v-carousel__progress",color:typeof e.progress=="string"?e.progress:void 0,modelValue:(p.getItemIndex(n.value)+1)/p.items.value.length*100},null)])},prev:t.prev,next:t.next})}),{}}}),Ne=M({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...Y(),...ft(),...mt()},"VWindowItem"),Ae=j()({name:"VWindowItem",directives:{vTouch:ve},props:Ne(),emits:{"group:selected":e=>!0},setup(e,o){let{slots:t}=o;const n=gt(We),s=pt(e,He),{isBooted:l}=vt();if(!n||!s)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const r=ne(!1),h=v(()=>l.value&&(n.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function a(){!r.value||!n||(r.value=!1,n.transitionCount.value>0&&(n.transitionCount.value-=1,n.transitionCount.value===0&&(n.transitionHeight.value=void 0)))}function m(){r.value||!n||(r.value=!0,n.transitionCount.value===0&&(n.transitionHeight.value=S(n.rootRef.value?.clientHeight)),n.transitionCount.value+=1)}function d(){a()}function b(B){r.value&&G(()=>{!h.value||!r.value||!n||(n.transitionHeight.value=S(B.clientHeight))})}const p=v(()=>{const B=n.isReversed.value?e.reverseTransition:e.transition;return h.value?{name:typeof B!="string"?n.transition.value:B,onBeforeEnter:m,onAfterEnter:a,onEnterCancelled:d,onBeforeLeave:m,onAfterLeave:a,onLeaveCancelled:d,onEnter:b}:!1}),{hasContent:x}=yt(e,s.isSelected);return N(()=>g(bt,{transition:p.value,disabled:!l.value},{default:()=>[Ve(i("div",{class:A(["v-window-item",s.selectedClass.value,e.class]),style:R(e.style)},[x.value&&t.default?.()]),[[wt,s.isSelected.value]])]})),{groupItem:s}}}),sa=M({...kt(),...Ne()},"VCarouselItem"),ra=j()({name:"VCarouselItem",inheritAttrs:!1,props:sa(),setup(e,o){let{slots:t,attrs:n}=o;N(()=>{const s=_e.filterProps(e),l=Ae.filterProps(e);return g(Ae,Q({class:["v-carousel-item",e.class]},l),{default:()=>[g(_e,Q(n,s),t)]})})}}),la={class:"article-viewer"},ca={class:"content-bar"},da={class:"bread-crumbs"},ha=["innerHTML"],ua={key:1,class:"figure"},ma=["id"],fa=["src","alt"],ga=["href"],pa={key:2,class:"quote"},va=["id"],ya=["innerHTML"],wa={class:"quote-person"},ba=["href"],ka={key:3,class:"code"},_a=["id"],xa=["href"],Sa={key:4,class:"profile"},Aa=["src","alt"],Ca={key:5,class:"youtube"},Ta=["innerHTML"],Ia=["id"],Ba={class:"clip-caption"},Pa=["href"],Da=["src"],Ra=["innerHTML"],Ea={key:6,class:"pdf"},Fa=["id"],Ma={class:"file-caption"},La=["href"],Va=["data"],Wa=["src"],Ha={key:7,class:"carousel"},ja=["id"],Na={class:"carousel-caption"},Ua=["href"],Oa={class:"d-flex fill-height align-center pa-4"},qa={class:"text-h3"},za={class:"text-subtitle-1"},Ga={key:8,class:"definition text"},Qa=["innerHTML"],Ya={key:9},$a={key:0},Ka=["id"],Za=_t({__name:"ArticleViewer",props:{articleId:{default:"dummy"}},setup(e){const o=e,t=["Article","Article Title"],n=qt.contentDict,s=v(()=>n[o.articleId]),l=v(()=>s.value==null?t:[{title:"Blogs",disabled:!1,to:"/blog",link:!0},{title:s.value.title,disabled:!1,link:!1}]);return(r,h)=>(w(),k("div",la,[i("div",ca,[i("div",da,[g(Kt,{items:l.value},{prepend:de(()=>[g(Fe,{icon:"mdi-post",size:"small"})]),_:1},8,["items"])]),(w(!0),k(ee,null,he(s.value.getComponents(),(a,m)=>(w(),k("div",{key:m,class:"article-content"},[a.mode==1?(w(),k("div",{key:0,class:"text",innerHTML:a.value},null,8,ha)):a.mode==2?(w(),k("div",ua,[i("section",{id:"figure-"+a.count},[i("img",{src:"/figures/"+a.path,alt:a.alt},null,8,fa),i("p",null,[i("a",{href:"#figure-"+a.count},[i("u",null,"Figure "+_(a.count)+": ",1)],8,ga),J(" "+_(" "+a.alt),1)])],8,ma)])):a.mode==3?(w(),k("div",pa,[i("section",{id:"quote-"+a.count},[i("p",{class:"quote-text",innerHTML:a.value},null,8,ya),i("p",wa,[i("a",{href:"#quote-"+a.count},[i("u",null,_(a.label),1)],8,ba)])],8,va)])):a.mode==4?(w(),k("div",ka,[i("section",{id:"snippet-"+a.count},[g(xt(Qe),{code:a.code,highlightjs:"",lang:a.lang,theme:"github-dark"},null,8,["code","lang"]),i("p",null,[i("a",{href:"#snippet-"+a.count},[i("u",null,"Snippet "+_(a.count)+": ",1)],8,xa),J(" "+_(" "+a.label),1)])],8,_a)])):a.mode==5?(w(),k("div",Sa,[i("div",{class:A({"l-align header":a.align=="L","r-align header":a.align=="R"})},[i("h3",null,_(a.name),1),i("img",{src:"/profiles/"+a.photo,alt:a.name},null,8,Aa)],2),i("div",{class:A({"r-align blur text":a.align=="L","l-align blur text":a.align=="R"})},[i("p",null,_(a.blur),1)],2)])):a.mode==6?(w(),k("div",Ca,[a.pretext.length>0?(w(),k("p",{key:0,class:"pretext text",innerHTML:a.pretext},null,8,Ta)):ue("",!0),i("section",{id:"clip-"+a.clipNo},[i("p",Ba,[i("a",{href:"#clip-"+a.clipNo},[i("u",null,"Clip "+_(a.clipNo)+": ",1)],8,Pa),J(" "+_(" "+a.title),1)]),i("iframe",{class:"youtube-clip-frame",src:a.youtube,allow:"accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,8,Da)],8,Ia),a.posttext.length>0?(w(),k("p",{key:1,class:"postext text",innerHTML:a.posttext},null,8,Ra)):ue("",!0)])):a.mode==7?(w(),k("div",Ea,[i("section",{id:"file-"+a.fileNo},[i("p",Ma,[i("a",{href:"#file-"+a.fileNo},[i("u",null,"File "+_(a.fileNo)+": ",1)],8,La),J(" "+_(" "+a.title),1)]),i("object",{class:"pdf-embed",data:"/docs/blog/"+a.file,type:"application/pdf"},[i("embed",{src:"/docs/blog/"+a.file+"#zoom=FitW",type:"application/pdf"},null,8,Wa)],8,Va)],8,Fa)])):a.mode==8?(w(),k("div",Ha,[i("section",{id:"carousel-"+a.carouselNo},[i("p",Na,[i("a",{href:"#carousel-"+a.carouselNo},[i("u",null,"Carousel "+_(a.carouselNo)+": ",1)],8,Ua),J(" "+_(" "+a.title),1)]),g(ia,{progress:!0,"hide-delimiters":!0},{default:de(()=>[(w(!0),k(ee,null,he(a.photos,(d,b)=>(w(),St(ra,{key:b,src:d.src},{default:de(()=>[i("div",Oa,[i("div",null,[i("h3",qa,_(d.header),1),i("span",za,_(d.subtitle),1)])])]),_:2},1032,["src"]))),128))]),_:2},1024)],8,ja)])):a.mode==9?(w(),k("div",Ga,[i("h4",null," Definition "+_(a.defNo)+": "+_(a.name),1),i("p",{innerHTML:a.content},null,8,Qa)])):(w(),k("div",Ya,[i("p",null,_(a),1)]))]))),128)),s.value.getReferences().length>0?(w(),k("h2",$a," References: ")):ue("",!0),i("ol",null,[(w(!0),k(ee,null,he(s.value.getReferences(),(a,m)=>(w(),k("section",{id:"ref-"+(m+1),key:m,class:"reference"},[i("li",null,_(a.value),1)],8,Ka))),128))])])]))}});export{Za as default};
//# sourceMappingURL=ArticleViewer-BiHSh3ns.js.map
