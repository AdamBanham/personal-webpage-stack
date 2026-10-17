import{L as e,Nt as t,O as n,P as r,Pt as i,Q as a,R as o,_ as s,_t as c,c as l,d as u,et as d,f,ft as p,jt as m,k as h,l as g,mt as _,r as v,tt as ee,u as y,ut as b,v as x,w as S,y as C,z as w}from"./runtime-core.esm-bundler-C7VbFZnF.js";import{$ as T,At as te,D as E,Dt as D,Rt as O,Wt as k,b as A,c as ne,f as re,g as ie,jt as ae,m as oe,p as se,r as j,s as ce,t as le,v as ue,w as M,x as N,xt as P,y as de,zt as F}from"./router-qGD3F8AL.js";import{B as fe,C as pe,D as me,H as he,J as I,L,O as ge,R as _e,S as ve,U as ye,W as R,Y as be,b as z,c as xe,d as B,k as Se,l as Ce,v as we,x as Te,y as V}from"./app-2v4iUkJD.js";import{t as Ee}from"./vue-code-block.es-CvbsqJY1.js";var De=F({divider:[Number,String],...O()},`VBreadcrumbsDivider`),Oe=M()({name:`VBreadcrumbsDivider`,props:De(),setup(e,n){let{slots:r}=n;return N(()=>g(`li`,{"aria-hidden":`true`,class:m([`v-breadcrumbs-divider`,e.class]),style:t(e.style)},[r?.default?.()??e.divider])),{}}}),ke=F({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...O(),...D(de(),[`width`,`maxWidth`]),...le(),...I({tag:`li`})},`VBreadcrumbsItem`),Ae=M()({name:`VBreadcrumbsItem`,props:ke(),setup(e,r){let{slots:i,attrs:a}=r,o=j(e,a),s=l(()=>e.active||o.isActive?.value),{dimensionStyles:c}=A(e),{textColorClasses:u,textColorStyles:d}=ue(()=>s.value?e.activeColor:e.color);return N(()=>x(e.tag,{class:m([`v-breadcrumbs-item`,{"v-breadcrumbs-item--active":s.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:s.value&&e.activeClass},u.value,e.class]),style:t([d.value,c.value,e.style]),"aria-current":s.value?`page`:void 0},{default:()=>[o.isLink.value?g(`a`,n({class:`v-breadcrumbs-item--link`,onClick:o.navigate.value},o.linkProps),[i.default?.()??e.title]):i.default?.()??e.title]})),{}}}),je=F({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:`/`},icon:z,items:{type:Array,default:()=>[]},...O(),...me(),...he(),...I({tag:`ul`})},`VBreadcrumbs`),Me=M()({name:`VBreadcrumbs`,props:je(),setup(e,r){let{slots:i}=r,{backgroundColorClasses:a,backgroundColorStyles:o}=ie(()=>e.bgColor),{densityClasses:s}=ge(e),{roundedClasses:c}=ye(e);E({VBreadcrumbsDivider:{divider:_(()=>e.divider)},VBreadcrumbsItem:{activeClass:_(()=>e.activeClass),activeColor:_(()=>e.activeColor),color:_(()=>e.color),disabled:_(()=>e.disabled)}});let u=l(()=>e.items.map(e=>typeof e==`string`?{item:{title:e},raw:e}:{item:e,raw:e}));return N(()=>{let r=!!(i.prepend||e.icon);return x(e.tag,{class:m([`v-breadcrumbs`,a.value,s.value,c.value,e.class]),style:t([o.value,e.style])},{default:()=>[r&&g(`li`,{key:`prepend`,class:`v-breadcrumbs__prepend`},[i.prepend?x(R,{key:`prepend-defaults`,disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},i.prepend):x(V,{key:`prepend-icon`,start:!0,icon:e.icon},null)]),u.value.map((e,t,r)=>{let{item:a,raw:o}=e;return g(v,null,[i.item?.({item:a,index:t})??x(Ae,n({key:t,disabled:t>=r.length-1},typeof a==`string`?{title:a}:a),{default:i.title?()=>i.title?.({item:a,index:t}):void 0}),t<r.length-1&&x(Oe,null,{default:i.divider?()=>i.divider?.({item:o,index:t}):void 0})])}),i.default?.()]})}),{}}}),Ne=e=>{let{touchstartX:t,touchendX:n,touchstartY:r,touchendY:i}=e,a=.5;e.offsetX=n-t,e.offsetY=i-r,Math.abs(e.offsetY)<a*Math.abs(e.offsetX)&&(e.left&&n<t-16&&e.left(e),e.right&&n>t+16&&e.right(e)),Math.abs(e.offsetX)<a*Math.abs(e.offsetY)&&(e.up&&i<r-16&&e.up(e),e.down&&i>r+16&&e.down(e))};function Pe(e,t){let n=e.changedTouches[0];t.touchstartX=n.clientX,t.touchstartY=n.clientY,t.start?.({originalEvent:e,...t})}function Fe(e,t){let n=e.changedTouches[0];t.touchendX=n.clientX,t.touchendY=n.clientY,t.end?.({originalEvent:e,...t}),Ne(t)}function Ie(e,t){let n=e.changedTouches[0];t.touchmoveX=n.clientX,t.touchmoveY=n.clientY,t.move?.({originalEvent:e,...t})}function Le(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:e=>Pe(e,t),touchend:e=>Fe(e,t),touchmove:e=>Ie(e,t)}}function Re(e,t){let n=t.value,r=n?.parent?e.parentElement:e,i=n?.options??{passive:!0},a=t.instance?.$.uid;if(!r||a===void 0)return;let o=Le(t.value);r._touchHandlers=r._touchHandlers??Object.create(null),r._touchHandlers[a]=o,P(o).forEach(e=>{r.addEventListener(e,o[e],i)})}function ze(e,t){let n=t.value?.parent?e.parentElement:e,r=t.instance?.$.uid;if(!n?._touchHandlers||r===void 0)return;let i=n._touchHandlers[r];i&&(P(i).forEach(e=>{n.removeEventListener(e,i[e])}),delete n._touchHandlers[r],P(n._touchHandlers).length||delete n._touchHandlers)}var H={mounted:Re,unmounted:ze},U=Symbol.for(`vuetify:v-window`),W=Symbol.for(`vuetify:v-window-group`),Be=F({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:`$next`},prevIcon:{type:[Boolean,String,Function,Object],default:`$prev`},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e==`boolean`||e===`hover`},verticalArrows:[Boolean,String],touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:`horizontal`},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:`v-window-item--active`},mandatory:{type:[Boolean,String],default:`force`},crossfade:Boolean,transitionDuration:Number,...O(),...I(),...ce()},`VWindow`),Ve=M()({name:`VWindow`,directives:{vTouch:H},props:Be(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:r}=n,{themeClasses:i}=ne(e),{isRtl:s}=se(),{t:c}=re(),u=ve(e,W),d=b(),f=l(()=>s.value?!e.reverse:e.reverse),v=p(!1),y=l(()=>e.crossfade?`v-window-crossfade-transition`:`v-window-${e.direction===`vertical`?`y`:`x`}${(f.value?!v.value:v.value)?`-reverse`:``}-transition`),S=p(0),C=b(void 0),w=l(()=>u.items.value.findIndex(e=>u.selected.value.includes(e.id)));a(w,(e,t)=>{let n,r={left:0,top:0};te&&t>=0&&(n=be(d.value),r.left=n?.scrollLeft,r.top=n?.scrollTop);let i=u.items.value.length,a=i-1;i<=2?v.value=e<t:e===a&&t===0?v.value=!1:e===0&&t===a?v.value=!0:v.value=e<t,h(()=>{te&&n&&(n.scrollTop!==r.top&&n.scrollTo({...r,behavior:`instant`}),requestAnimationFrame(()=>{n&&n.scrollTop!==r.top&&n.scrollTo({...r,behavior:`instant`})}))})},{flush:`sync`}),o(U,{transition:y,isReversed:v,transitionCount:S,transitionHeight:C,rootRef:d});let E=_(()=>e.continuous||w.value!==0),D=_(()=>e.continuous||w.value!==u.items.value.length-1);function O(){E.value&&u.prev()}function k(){D.value&&u.next()}let A=l(()=>{let t=[],n={icon:s.value?e.nextIcon:e.prevIcon,class:`v-window__${f.value?`right`:`left`}`,onClick:u.prev,"aria-label":c(`$vuetify.carousel.prev`)};t.push(E.value?r.prev?r.prev({props:n}):x(B,n,null):g(`div`,null,null));let i={icon:s.value?e.prevIcon:e.nextIcon,class:`v-window__${f.value?`left`:`right`}`,onClick:u.next,"aria-label":c(`$vuetify.carousel.next`)};return t.push(D.value?r.next?r.next({props:i}):x(B,i,null):g(`div`,null,null)),t}),ie=l(()=>e.touch===!1?e.touch:{left:()=>{f.value?O():k()},right:()=>{f.value?k():O()},start:e=>{let{originalEvent:t}=e;t.stopPropagation()},...e.touch===!0?{}:e.touch});function oe(t){(e.direction===`horizontal`&&t.key===`ArrowLeft`||e.direction===`vertical`&&t.key===`ArrowUp`)&&(t.preventDefault(),O(),h(()=>{E.value?j(0):j(1)})),(e.direction===`horizontal`&&t.key===`ArrowRight`||e.direction===`vertical`&&t.key===`ArrowDown`)&&(t.preventDefault(),k(),h(()=>{D.value?j(1):j(0)}))}function j(e){let t=A.value[e];t&&(Array.isArray(t)?t[0]:t).el?.focus()}return N(()=>ee(x(e.tag,{ref:d,class:m([`v-window`,{"v-window--show-arrows-on-hover":e.showArrows===`hover`,"v-window--vertical-arrows":!!e.verticalArrows,"v-window--crossfade":!!e.crossfade},i.value,e.class]),style:t([e.style,{"--v-window-transition-duration":ae()?null:T(e.transitionDuration,`ms`)}])},{default:()=>[g(`div`,{class:`v-window__container`,style:{height:C.value}},[r.default?.({group:u}),e.showArrows!==!1&&g(`div`,{class:m([`v-window__controls`,{"v-window__controls--left":e.verticalArrows===`left`||e.verticalArrows===!0},{"v-window__controls--right":e.verticalArrows===`right`}]),onKeydown:oe},[A.value])]),r.additional?.({group:u})]}),[[H,ie.value]])),{group:u}}}),He=F({color:String,cycle:Boolean,delimiterIcon:{type:z,default:`$delimiter`},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...Be({continuous:!0,mandatory:`force`,showArrows:!0})},`VCarousel`),Ue=M()({name:`VCarousel`,props:He(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:i}=t,o=oe(e,`modelValue`),{t:s}=re(),c=b(),l=-1;a(o,d),a(()=>e.interval,d),a(()=>e.cycle,e=>{e?d():window.clearTimeout(l)}),r(u);function u(){e.cycle&&c.value&&(l=window.setTimeout(c.value.group.next,Number(e.interval)>0?Number(e.interval):6e3))}function d(){window.clearTimeout(l),window.requestAnimationFrame(u)}function f(t,n){(e.direction===`horizontal`&&t.key===`ArrowLeft`||e.direction===`vertical`&&t.key===`ArrowUp`)&&(t.preventDefault(),n.prev(),h(()=>c.value?.$el.querySelector(`.v-btn--active`)?.focus())),(e.direction===`horizontal`&&t.key===`ArrowRight`||e.direction===`vertical`&&t.key===`ArrowDown`)&&(t.preventDefault(),n.next(),h(()=>c.value?.$el.querySelector(`.v-btn--active`)?.focus()))}return N(()=>{let t=Ve.filterProps(e);return x(Ve,n({ref:c},t,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:[`v-carousel`,{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:T(e.height)},e.style]}),{default:i.default,additional:t=>{let{group:r}=t;return g(v,null,[!e.hideDelimiters&&g(`div`,{class:`v-carousel__controls`,style:{left:e.verticalDelimiters===`left`&&e.verticalDelimiters?0:`auto`,right:e.verticalDelimiters===`right`?0:`auto`}},[r.items.value.length>0&&x(R,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:`x-small`,variant:`text`}},scoped:!0},{default:()=>[r.items.value.map((e,t)=>{let a={id:`carousel-item-${e.id}`,"aria-label":s(`$vuetify.carousel.ariaLabel.delimiter`,t+1,r.items.value.length),class:[`v-carousel__controls__item`,r.isSelected(e.id)&&`v-btn--active`],onClick:()=>r.select(e.id,!0),onKeydown:e=>f(e,r)};return i.item?i.item({props:a,item:e}):x(B,n(e,a),null)})]})]),e.progress&&x(we,{absolute:!0,class:`v-carousel__progress`,color:typeof e.progress==`string`?e.progress:void 0,modelValue:(r.getItemIndex(o.value)+1)/r.items.value.length*100},null)])},prev:i.prev,next:i.next})}),{}}}),We=F({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...O(),...Te(),...xe()},`VWindowItem`),Ge=M()({name:`VWindowItem`,directives:{vTouch:H},props:We(),emits:{"group:selected":e=>!0},setup(e,n){let{slots:r}=n,i=S(U),a=pe(e,W),{isBooted:o}=Se();if(!i||!a)throw Error(`[Vuetify] VWindowItem must be used inside VWindow`);let s=p(!1),c=l(()=>o.value&&(i.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function u(){s.value&&i&&(s.value=!1,i.transitionCount.value>0&&(--i.transitionCount.value,i.transitionCount.value===0&&(i.transitionHeight.value=void 0)))}function d(){!s.value&&i&&(s.value=!0,i.transitionCount.value===0&&(i.transitionHeight.value=T(i.rootRef.value?.clientHeight)),i.transitionCount.value+=1)}function f(){u()}function _(e){s.value&&h(()=>{c.value&&s.value&&i&&(i.transitionHeight.value=T(e.clientHeight))})}let v=l(()=>{let t=i.isReversed.value?e.reverseTransition:e.transition;return c.value?{name:typeof t==`string`?t:i.transition.value,onBeforeEnter:d,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:d,onAfterLeave:u,onLeaveCancelled:f,onEnter:_}:!1}),{hasContent:y}=Ce(e,a.isSelected);return N(()=>x(fe,{transition:v.value,disabled:!o.value},{default:()=>[ee(g(`div`,{class:m([`v-window-item`,a.selectedClass.value,e.class]),style:t(e.style)},[y.value&&r.default?.()]),[[k,a.isSelected.value]])]})),{groupItem:a}}}),Ke=F({..._e(),...We()},`VCarouselItem`),qe=M()({name:`VCarouselItem`,inheritAttrs:!1,props:Ke(),setup(e,t){let{slots:r,attrs:i}=t;N(()=>{let t=L.filterProps(e),a=Ge.filterProps(e);return x(Ge,n({class:[`v-carousel-item`,e.class]},a),{default:()=>[x(L,n(i,t),r)]})})}}),G=class{constructor(e,t){this.title=e,this.id=t,this.components=[],this.references=[],this.figures=0,this.snippets=0,this.quotes=0,this.clips=0,this.files=0,this.carousels=0,this.defintions=0}addTextSection(e){this.components.push(new Je(e))}addQuote(e,t){this.quotes+=1,this.components.push(new Xe(e,t,this.quotes))}addReference(e){this.references.push(new Qe(e))}addCode(e,t,n){this.snippets+=1,this.components.push(new Ze(e,t,n,this.snippets))}addFigure(e,t){this.figures+=1,this.components.push(new Ye(e,t,this.figures))}addProfile(e,t,n,r){this.components.push(new $e(e,t,n,r))}addYoutubeSection(e,t,n,r){this.clips+=1,this.components.push(new et(e,t,n,r,this.clips))}addPdfSection(e,t){this.files+=1,this.components.push(new tt(e,t,this.files))}addCarousel(e,...t){this.carousels+=1,this.components.push(new nt(e,t,this.carousels))}addDefintion(e,t){this.defintions+=1,this.components.push(new rt(e,t,this.defintions))}getComponents(){return this.components}getReferences(){return this.references}},K={text:1,figure:2,quote:3,code:4,profile:5,youtube:6,pdf:7,carousel:8,definition:9},Je=class{constructor(e){this.mode=K.text,this.value=`<p> `+e+` </p>`}},Ye=class{constructor(e,t,n){this.mode=K.figure,this.path=e,this.alt=t,this.count=n}},Xe=class{constructor(e,t,n){this.value=e,this.label=t,this.mode=K.quote,this.count=n}},Ze=class{constructor(e,t,n,r){this.mode=K.code,this.code=e,this.lang=t,this.label=n,this.count=r}},Qe=class{constructor(e){this.value=e}},$e=class{constructor(e,t,n,r){this.mode=K.profile,this.name=e,this.photo=t,this.blur=n,this.align=r??`L`}},et=class{constructor(e,t,n,r,i){this.mode=K.youtube,this.youtube=e,this.title=t,this.pretext=n,this.posttext=r,this.clipNo=i}},tt=class{constructor(e,t,n){this.mode=K.pdf,this.file=e,this.title=t,this.fileNo=n}},nt=class{constructor(e,t,n){this.mode=K.carousel,this.title=e,this.photos=t,this.carouselNo=n}},rt=class{constructor(e,t,n){this.mode=K.definition,this.name=e,this.content=t,this.defNo=n}},q=new G(`Final Seminar @ QUT`,`FinalSeminar2024A`);q.addYoutubeSection(`https://www.youtube.com/embed/0laVKLJye9g`,`A short introduction to process mining with exogenous data.`,`
If you are after a quick introduction to my thesis, then the clip below 
discusses the motivation of the contributions presented in my thesis.
`,`
However, if you interested in hearing about the journey towards a doctorate
at the Queendland University of Techonology, or at least my own experience, 
then read on. At the end of the blog, a full recording of the final seminar 
is included for the interested <br>(see this <a href="#clip-2"><u>clip</u></a>).
`),q.addTextSection(`
Reflecting on the past three years of my candidature, my final seminar 
represents the beginning of the closure of the candidature. The Australian 
system for PhDs, or at least the procedures at my university (Queensland  
University of Technology), consists of several phases which lead to a 
candidate receiving a doctorate. A successful candidate must pass all of 
these phases with a recommendation for the university to confer the doctorate.
`),q.addQuote(`
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
`,`Queensland University of Technology, 2024`),q.addTextSection(`
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
`),q.addProfile(`Professor Moe T Wynn`,`moe-wynn.png`,`
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
`,`L`),q.addProfile(`Doctor Alizera Nili`,`alizera-nili.jpeg`,`
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
`,`R`),q.addProfile(`Adjunct Professor Colin Fidge`,`colin-fidge.png`,`
Prior to his retirement Prof. Colin Fidge pursued a four-decade teaching and 
research career in high-integrity software engineering, modelling and analysis 
of complex, computer-based systems, and enterprise system re-engineering. In 
retirement he continues to advise on research in the Schools of Computer 
Science and Information Systems, Queensland University of Technology. He has 
been awarded 17 Australian Research Council grants, and led nine research 
projects for industry and the Australian Department of Defence, mainly in the 
fields of safety-critical and security-critical systems. He graduated 25 PhD 
students and 4 Research Masters students.
`,`L`),q.addTextSection(`
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
`),q.addQuote(`
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
`,`Queensland University of Technology, 2024`),q.addTextSection(`
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
`),q.addTextSection(`
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
`),q.addYoutubeSection(`https://youtube.com/embed/u7f8Fx6BubY`,`Adam Banham, 2024, Final Seminar, Process Mining with Exogenous Data`,`
This clip is a re-recording of the final seminar that I presented in 
August 2024.
`,``);var J=new G(`Confirmation Seminar @ QUT`,`confirmSeminar2022`);J.addTextSection(`
The confirmation of candidature for PhD candidates at Queensland University 
of Technology (QUT) represents a key milestone to ensure their future success. 
It occurs at the 12-month mark in the candidature, and the confirmation is an 
internal seminar to assess the candidate's current progress and the future 
aspirations of their research plan. The confirmation consists of a panel of 
peers, where one member is from the supervision team, one from the supporting 
school, and one member external to the supporting school. My consisted of the 
following members:
`),J.addProfile(`Professor Arthur ter Hofstede`,`arthur-ter-hofstede.jpg`,`
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
`,`R`),J.addProfile(`Professor Richi Nayak`,`richi-nayak.jpg`,`
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
`,`L`),J.addProfile(`Professor Moe T Wynn`,`moe-wynn.png`,`
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
`,`R`),J.addTextSection(`
The candidate needs to prepare a working research plan in the form of a report. 
The report should describe the current progress, such as initial investigations, 
work-in-progress papers, and publications. Also, the report must present a 
research plan for the coming two years that is likely to be completed in a 
timely manner, i.e., it should be realistically possible for a candidate to 
complete it in the remaining time left in their candidature. The panel's role 
is to assess the candidate's plan and progress towards a doctorate. QUT 
outlines the outcomes of the confirmation, as it was within my candidature, 
as:
`),J.addQuote(`
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
`,`Queensland University of Technology, 2024`),J.addTextSection(`
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
`),J.addTextSection(`
Below are the documents I used for my confirmation back in 2022, with all the 
blemishes and mistakes. Please do not hold my current self to the quality of 
these documents. I hope that others at QUT may find some inspiration from 
these documents if they are searching.
`),J.addPdfSection(`2024/Adam_Banham___PhD___Confirmation_of_Candidature.pdf`,`Adam Banham, 2022, Confirmation of Candidature Report`),J.addPdfSection(`2024/Adam_Banham_PhD_confirmation_presentation.pdf`,`Adam Banham, 2022, Confirmation of Candidature Seminar Presentation`);var Y=new G(`Research visit at RWTH Aachen`,`rwthVist2023`);Y.addTextSection(`
Nearing the end of 2023, I came across the Advanced Research Opportunities 
Program (AROP) through a LinkedIn post by Prof. Wil van der Aalst. 
Seeing it as an opportunity to travel to Europe and have some of the costs 
covered by a leading institution, I brought the idea to my supervisors. 
After some discussion, we developed a research agenda that could allow me 
to visit and ensure that the candidature would not be put on hold. Thankfully, 
Prof. Sander Leemans was happy to be the sponsoring academic for the 
application. The program supports students and academics outside the country 
who want to visit RWTH Aachen.
`),Y.addQuote(`
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
`,`RWTH Aachen, 2024`),Y.addTextSection(`
I was lucky enough to get approved for an AROP grant, and by the 13th of 
December, 2023, I was in Europe until the 20th of March, 2024. During this 
time, I would work closely with Prof. Sander Leemans on a stochastic process 
mining contribution to advance my candidature. The visit was aimed at a 
publication at BPM2024, but unfortunately, it would not get up at the venue. 
However, the work is still a major contribution to my thesis. We would also
work with Dr. Jannis Bertand from KU Leuven on the work as well.
`),Y.addTextSection(`
During the visit, I also made a quick visit to Eindhoven University of 
Technology (TU/e) to catch up with Prof. Felix Mannhardt and present a talk 
at the Process Analytics group, led by Prof. Boudewijn van Dongen. The 
presentation was about our recent work with Felix, <i>"Comparing Conformance 
Checking for Decision Mining: An Axiomatic Approach"</i>, which focused on 
understanding the challenges of data-aware conformance checking. It was an 
honour to see and meet the members of the process analytics group at TU/e, 
where process mining began to blossom into the discipline that it is today.
`),Y.addPdfSection(`2024/Adam_Banham_eindhoven_pa_2024.pdf`,`My presentation slides for Comparing Conformance Checking for Decision Mining`),Y.addTextSection(`
Another event that occurred during my visit was a workshop between TU/e, KU 
Leuven, and RWTH Aachen, ELA AI Triangle Workshop on Process Mining where 24 
PhD candidates gave talks about their work and advancements for process mining. 
This workshop was an excellent opportunity to hear and discuss with many other 
candidates focusing on process mining. It was also great to catch up with 
Alexander Stevens, who introduced me to Dr Jari Peeperkorn, Dr Jannis Bertand, 
and his supervisor, Prof. Johannes De Smedt. After the workshop, I also got 
to grab a beer with Prof. Jochen de Weerdt and Prof. Wil M.P van der Aalst.
`),Y.addTextSection(`
I am horrible at keeping memories in photo form but below are some highlights 
from the trip.
`),Y.addCarousel(`Various moments from the European trip to visit RWTH Aachen`,{src:`/photos/rwthVist2023/01_RWTH_Aachen.jpg`,header:`RWTH Aachen, DE`,subtitle:`Informatik 9`},{src:`/photos/rwthVist2023/02_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:`Lousberg`},{src:`/photos/rwthVist2023/03_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:`Lousberg`},{src:`/photos/rwthVist2023/04_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:``},{src:`/photos/rwthVist2023/05_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:`Aachener Dom`},{src:`/photos/rwthVist2023/06_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:`Snow!!!`},{src:`/photos/rwthVist2023/07_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:`Snow!!!`},{src:`/photos/rwthVist2023/08_RWTH_Aachen.jpg`,header:`Aachen, DE`,subtitle:`Snow!!!`},{src:`/photos/rwthVist2023/09_RWTH_Aachen.jpg`,header:`Informatik 9, Aachen, DE`,subtitle:`Snow!!!`},{src:`/photos/rwthVist2023/10_TUE_Einhoven.jpg`,header:`Eindhoven, NL`,subtitle:`Technische Universiteit Eindhoven`},{src:`/photos/rwthVist2023/11_TUE_Einhoven.jpg`,header:`Eindhoven, NL`,subtitle:`Flying Pins`},{src:`/photos/rwthVist2023/12_TUE_Einhoven.jpg`,header:`Eindhoven, NL`,subtitle:`Technische Universiteit Eindhoven`},{src:`/photos/rwthVist2023/17_Leuven.jpg`,header:`Leuven, BE`,subtitle:`Sint-Pieterskerk`},{src:`/photos/rwthVist2023/13_london_bridge.jpg`,header:`London, UK`,subtitle:`Tower Bridge`},{src:`/photos/rwthVist2023/14_london_park_a.jpg`,header:`Milton Keynes, United Kingdom`,subtitle:`Bletchley Park`},{src:`/photos/rwthVist2023/14_london_park_b.jpg`,header:`Bletchley Park, Milton Keynes, United Kingdom`,subtitle:`(Fake) Bombe machine used for code cracking`},{src:`/photos/rwthVist2023/15_BPM_room.jpg`,header:`Informatik 9, Aachen, DE`,subtitle:`The room with Nick and Tian`},{src:`/photos/rwthVist2023/16_Dom.jpg`,header:`Cologne, DE`,subtitle:`Kölner Dom`});var X=new G(`Agrawal Miner implemented in Koalas`,`AgrawalMiner2024B`);X.addTextSection(`
    While searching through literature for my thesis, I came across an early 
    survey of workflow mining, ''Workflow mining: A survey of issues and 
    approaches'' by W. M. P. van der Aalst, B. F. van Dongen et al., in 2003 
    <a href="#ref-1">[1]</a>.
     In this survey, we can already see many of the problems that process mining 
     today explores, such as discovering a formal description of a process from 
     the executions of a process. The survey also points to one of the earliest 
     works on process discovery, and this post explores this early process 
     discovery approach.
    `),X.addTextSection(`
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
    `),X.addQuote(`
    We present a new approach to address the problem of model construction.
    We describe an algorithm that, given a log of unstructured executions
    of a process, generates a graph model of the process.
    `,`R. Agrawal, D. Gunopulos, and F. Leymann, 1998`),X.addTextSection(`
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
    `),X.addQuote(`
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
    `),X.addTextSection(`
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
    `),X.addCode(`
    pip install pmkoalas==0.3.1
    `,`shell`,`How to install pmkoalas into a local python environment from pypi.`),X.addTextSection(`
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
    `),X.addCode(`
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
    `,`python`,`Code to compute the conformal graph discovered by the Agrawal Miner using a log from the special class.`),X.addFigure(`AgrawalMiner2024B/agrawal_code_ex_1.svg`,`A conformal graph discovered by the Agrawal Miner, using the dot digraph supplied by the snippet.`),X.addTextSection(`
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
    `),X.addCode(`
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
    `,`python`,`Code snippet to run the miner on the relaxed samples of a process.`),X.addFigure(`AgrawalMiner2024B/agrawal_code_ex_2.svg`,`The resulting dependency graph discovered by the Agrawal Miner.`),X.addTextSection(`
    Notably, an assumption of the approaches proposed by R. Agrawal et al. is 
    that their graphs have a single source and sink. However, there is a 
    simple workaround for when the log contains executions with different 
    start activities and end activities. The workaround is to prefix and suffix 
    executions with a pseudo activity. So, for example, if two new activities 
    G,H are introduced to the previous log, producing
    <b>{HABCF, ACDF, ADEFG, AECF}</b>, 
    then following graph in 
    <a href="#figure-3">Figure 3</a>, is found.
    `),X.addCode(`
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
    `,`python`,`Code snippet to run the miner on the adjusted samples.`),X.addFigure(`AgrawalMiner2024B/agrawal_code_ex_2b.svg`,`The resulting dependency graph discovered by the Agrawal Miner when executions cannot agree on starting and ending activities.`),X.addTextSection(`
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
    `),X.addCode(`
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
    `,`python`,`Snippet to run the Agrawal Miner on the considered log. Note testing if an execution is consistent with a graph with cycles is less clear than before.`),X.addFigure(`AgrawalMiner2024B/agrawal_code_ex_3.svg`,`A dependency graph discovered from samples of process with cycles.`),X.addTextSection(`
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
    `),X.addQuote(`
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
    `,`W. M. P. van der Aalst, B. F. van Dongen, et al., Workflow mining: A survey of issues and approaches`),X.addTextSection(`
    To explore the implementation in koalas, I also conducted some testing
    on the runtime using some modern publically avaiable event logs.
    The event logs used were:
    <b> BPIC13, BPIC20, road fines, sepsis</b>.
    However, for testing purposes only the BPIC15 was used to consider 
    runtime performance.
    Where testing consisted of sampling the log and adjusting the traces based
    on the requirements to trigger one of three algorithms proposed by R. 
    Agrawal et al.
    `),X.addFigure(`AgrawalMiner2024B/special_runtime.svg`,`Runtime analysis when only considering adjusted samples from BPIC15  that execute activities exactly once.`),X.addFigure(`AgrawalMiner2024B/general_runtime.svg`,`Runtime analysis when only considering adjusted samples from BPIC15  that may execute activities once. Runtime reaching 20 activities was not completed due to runtime.`),X.addFigure(`AgrawalMiner2024B/opt_runtime.svg`,`Runtime analysis when only considering adjusted samples from BPIC15  that may execute activities once, after optimisation.`),X.addFigure(`AgrawalMiner2024B/cyclic_opt_runtime.svg`,`Runtime analysis when only considering adjusted samples from BPIC15  that may execute activities repeatly, after optimisation.`),X.addTextSection(`
    The runtime testing shows that when executions are increased, we see a
    linear increase in runtime; while when the number of activities are 
    increased we see a much larger impact on runtime. This reflects the general
    nature of the algorithms complexity, 
    where m is the number of executions,
    n is the number of activities observed,
    and k is the most times any activity is repeated,
    then at worst the approach is O(m(kn)^3) and at best it is O(mn^2) as 
    reported by R. Agrawal et al.
    `),X.addTextSection(`
    Some additional graphs were computed and are shown below for the curious 
    wretched, interested to see how the approach presents our modern event logs.
    `),X.addFigure(`AgrawalMiner2024B/logs/BPIC13_closed.svg`,`Agrawal miner applied to BPIC13 - closed.`),X.addFigure(`AgrawalMiner2024B/logs/BPIC13_incidents.svg`,`Agrawal miner applied to BPIC13 - incidents.`),X.addFigure(`AgrawalMiner2024B/logs/BPIC13_open.svg`,`Agrawal miner applied to BPIC13 - open.`),X.addFigure(`AgrawalMiner2024B/logs/BPIC15.svg`,`Agrawal miner applied to BPIC15.`),X.addFigure(`AgrawalMiner2024B/logs/road_fines.svg`,`Agrawal miner applied to road fines.`),X.addFigure(`AgrawalMiner2024B/logs/sepsis.svg`,`Agrawal miner applied to sepsis.`),X.addReference(`
    W. M. P. van der Aalst, B. F. van Dongen, J. Herbst, L. Maruster, G. Schimm, and
    A. J. M. M. Weijters, “Workflow mining: A survey of issues and approaches,” Data
    Knowl. Eng., vol. 47, no. 2, pp. 237–267, 2003
    `),X.addReference(`
    R. Agrawal, D. Gunopulos, and F. Leymann, “Mining process models from workflow
    logs,” in EDBT, ser. Lecture Notes in Computer Science, vol. 1377, Springer, 1998,
    pp. 469–483
    `);var Z=new G(`The Difference between Endo And Exo`,`DifExoEndo2023`);Z.addTextSection(`
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
`),Z.addTextSection(`
To motivate for process analysis that does not flatten contextual information 
to inform our understanding of processes, two categories of data sources are 
introduced. Endogenous data groups all streams of state changes related to 
the execution of processes. While external data streams, or exogenous data, 
groups all streams of measurements for phenomena that cannot be entirely 
produced or divided from endogenous data. The definitions below provide a 
short statement to delimate streams into these categories.
`),Z.addDefintion(`Endogenous Streams`,`
An endogenous stream is a finite sequence of timestamped state changes that 
describe a historical execution of a process.
`),Z.addDefintion(`Exogenous Streams`,`
An exogenous stream is a possibly finite sequence of timestamped measurements 
that describes the observation of any phenomenon and are not fully determined 
by a process execution.
`),Z.addTextSection(`
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
`),Z.addFigure(`blog/DifExoEndo2023/rose_onion.png`,`Roseman, Recker, and Flender views on conceptual dimensions around processes [1].`),Z.addTextSection(`
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
`),Z.addFigure(`blog/DifExoEndo2023/aalst_onion.png`,`van der Aalst and Dustdar views on conceptual dimensions around processes [2].`),Z.addTextSection(`
Thankfully, van der Aalst and Dustdar [2] provide a reconceptualisation of 
the onion layers focusing on data sources and their impact on process 
behaviour, as shown in Figure 2. Their layers focus on the types of streams 
likely to present on each layer. Whereby endogenous streams cover the instance 
and process context layers, while exogenous streams cover the process, social, 
and external context layers. Showcasing that exogenous streams can stem from 
concurrent process executions on the process context layer.
`),Z.addTextSection(`
My thesis, 
"<b><i>Process Mining with Exogenous Data</i></b>", 
does not solve and resolve all the differences between endogenous and 
exogenous data for process analysis. However, the work encourages more 
techniques that cater to the intertwinement of both discrete and temporal 
dimensions for process mining.
`),Z.addReference(`
M. Rosemann, J. Recker, and C. Flender, “Contextualisation of business 
processes,” Int. J. Bus. Process. Integr. Manag., vol. 3, no. 1, pp. 
47–60, 2008
`),Z.addReference(`
W. M. P. van der Aalst and S. Dustdar, “Process mining put into context,” 
IEEE Internet Computing, vol. 16, no. 01, pp. 82–86, 2012
`);var it=[J,Z,Y,X,q],Q=new G(`Starting in Academia @ Adelaide University`,`au-start-25`);Q.addTextSection(`
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
`),Q.addTextSection(`
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
`),Q.addCarousel(`The 'Big' Attractions along the way to South Australia`,{src:`/photos/auStart25/brisbane-2025.jpg`,header:`One last look`,subtitle:`Brisbane, 2025`},{src:`/photos/auStart25/brisbane-2025-going-away.jpeg`,header:`Sendoff drinks!`,subtitle:`Brisbane, 2025`},{src:`/photos/auStart25/big-attr-1.jpg`,header:`Byron Lighthouse, Australia's Easternmost Point`,subtitle:`Byron Bay, 2025`},{src:`/photos/auStart25/big-attr-2.jpg`,header:`The Big Banana`,subtitle:`Coffs Harbour, 2025`},{src:`/photos/auStart25/big-attr-3.jpg`,header:`The Big Kookaburra`,subtitle:`Kurri Kurri, 2025`},{src:`/photos/auStart25/big-attr-4.jpg`,header:`Sydney Opera House`,subtitle:`Sydney, 2025`},{src:`/photos/auStart25/big-attr-5.jpg`,header:`The Big Chainsaw`,subtitle:`Colac, 2025`},{src:`/photos/auStart25/big-attr-6.jpg`,header:`The Twelve Apostles`,subtitle:`Princetown, 2025`},{src:`/photos/auStart25/big-attr-7.jpg`,header:`The Big Lobster`,subtitle:`Kingston SE, 2025`},{src:`/photos/auStart25/big-attr-8.jpg`,header:`Big ol' Larry`,subtitle:`Kingston SE, 2025`},{src:`/photos/auStart25/big-attr-9.jpg`,header:`Birdman of the Coorong`,subtitle:`Meningie, 2025`},{src:`/photos/auStart25/big-attr-10.jpg`,header:`Cosi's Rhino`,subtitle:`Tailem Bend, 2025`}),Q.addTextSection(`
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
`),Q.addProfile(`Prof Claudia Szabo`,`claudia-szabo.jpg`,`
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
`),Q.addTextSection(`
Prof Claudia has a long history of publications around emergent 
behaviour in complex systems. She describes the nature of the 
problem in a publication @ Winter Simulation Conference 25, 
Complex Systems Modeling and Analysis <a href="#ref-1">[1]</a>.
`),Q.addQuote(`
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
`,`Prof Claudia Szabo, Complex Systems Modeling and Analysis, WSC 25`),Q.addTextSection(`
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
`),Q.addTextSection(`
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
`),Q.addReference(`
C. Szabo, "Complex Systems Modeling and Analysis," 2024 Winter 
Simulation Conference (WSC), Orlando, FL, USA, 2024, pp. 1-14, 
doi: 10.1109/WSC63780.2024.10838891.
`),Q.addReference(`
Reynolds, C. W. 1987. “Flocks, Herds and Schools: A Distributed 
Behavioral Model”. In Proceedings of the 14th Annual
Conference on Computer Graphics and Interactive Techniques, 
SIGGRAPH ’87, 25–34. New York, USA: ACM https:
//doi.org/10.1145/37401.37406.
`),Q.addReference(`
Gardner, M. 1970. “The Fantastic Combinations of John Conway’s 
New Solitaire Game “Life””. Scientific American 223:120–123
`),Q.addReference(`
Chen, C., S. B. Nagl, and C. D. Clack. 2007. “Specifying, 
Detecting and Analysing Emergent Behaviours in Multi-Level
Agent-Based Simulations”. In Proceedings of the Summer 
Computer Simulation Conference, 969–976. New York, USA:
Association for Computing Machinery, Inc.
`);var at=[Q],ot=[].concat({content:[]}.content,it,at),st=[],$={};for(let e in ot){let t=ot[e];if(t.id in $)throw Error(`Found duplicated article id :: `+t.id);$[t.id]=t,st.push(t.id)}var ct={contentDict:$,contentkeys:st},lt={class:`article-viewer`},ut={class:`content-bar`},dt={class:`bread-crumbs`},ft=[`innerHTML`],pt={key:1,class:`figure`},mt=[`id`],ht=[`src`,`alt`],gt=[`href`],_t={key:2,class:`quote`},vt=[`id`],yt=[`innerHTML`],bt={class:`quote-person`},xt=[`href`],St={key:3,class:`code`},Ct=[`id`],wt=[`href`],Tt={key:4,class:`profile`},Et=[`src`,`alt`],Dt={key:5,class:`youtube`},Ot=[`innerHTML`],kt=[`id`],At={class:`clip-caption`},jt=[`href`],Mt=[`src`],Nt=[`innerHTML`],Pt={key:6,class:`pdf`},Ft=[`id`],It={class:`file-caption`},Lt=[`href`],Rt=[`data`],zt=[`src`],Bt={key:7,class:`carousel`},Vt=[`id`],Ht={class:`carousel-caption`},Ut=[`href`],Wt={class:`d-flex fill-height align-center pa-4`},Gt={class:`text-h3`},Kt={class:`text-subtitle-1`},qt={key:8,class:`definition text`},Jt=[`innerHTML`],Yt={key:9},Xt={key:0},Zt=[`id`],Qt=C({__name:`ArticleViewer`,props:{articleId:{default:`dummy`}},setup(t){let n=t,r=[`Article`,`Article Title`],a=ct.contentDict,o=l(()=>a[n.articleId]),p=l(()=>o.value==null?r:[{title:`Blogs`,disabled:!1,to:`/blog`,link:!0},{title:o.value.title,disabled:!1,link:!1}]);return(t,n)=>(e(),f(`div`,lt,[g(`div`,ut,[g(`div`,dt,[x(Me,{items:p.value},{prepend:d(()=>[x(V,{icon:`mdi-post`,size:`small`})]),_:1},8,[`items`])]),(e(!0),f(v,null,w(o.value.getComponents(),(t,n)=>(e(),f(`div`,{key:n,class:`article-content`},[t.mode==1?(e(),f(`div`,{key:0,class:`text`,innerHTML:t.value},null,8,ft)):t.mode==2?(e(),f(`div`,pt,[g(`section`,{id:`figure-`+t.count},[g(`img`,{src:`/figures/`+t.path,alt:t.alt},null,8,ht),g(`p`,null,[g(`a`,{href:`#figure-`+t.count},[g(`u`,null,`Figure `+i(t.count)+`: `,1)],8,gt),s(` `+i(` `+t.alt),1)])],8,mt)])):t.mode==3?(e(),f(`div`,_t,[g(`section`,{id:`quote-`+t.count},[g(`p`,{class:`quote-text`,innerHTML:t.value},null,8,yt),g(`p`,bt,[g(`a`,{href:`#quote-`+t.count},[g(`u`,null,i(t.label),1)],8,xt)])],8,vt)])):t.mode==4?(e(),f(`div`,St,[g(`section`,{id:`snippet-`+t.count},[x(c(Ee),{code:t.code,highlightjs:``,lang:t.lang,theme:`github-dark`},null,8,[`code`,`lang`]),g(`p`,null,[g(`a`,{href:`#snippet-`+t.count},[g(`u`,null,`Snippet `+i(t.count)+`: `,1)],8,wt),s(` `+i(` `+t.label),1)])],8,Ct)])):t.mode==5?(e(),f(`div`,Tt,[g(`div`,{class:m({"l-align header":t.align==`L`,"r-align header":t.align==`R`})},[g(`h3`,null,i(t.name),1),g(`img`,{src:`/profiles/`+t.photo,alt:t.name},null,8,Et)],2),g(`div`,{class:m({"r-align blur text":t.align==`L`,"l-align blur text":t.align==`R`})},[g(`p`,null,i(t.blur),1)],2)])):t.mode==6?(e(),f(`div`,Dt,[t.pretext.length>0?(e(),f(`p`,{key:0,class:`pretext text`,innerHTML:t.pretext},null,8,Ot)):u(``,!0),g(`section`,{id:`clip-`+t.clipNo},[g(`p`,At,[g(`a`,{href:`#clip-`+t.clipNo},[g(`u`,null,`Clip `+i(t.clipNo)+`: `,1)],8,jt),s(` `+i(` `+t.title),1)]),g(`iframe`,{class:`youtube-clip-frame`,src:t.youtube,allow:`accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share`,referrerpolicy:`strict-origin-when-cross-origin`,allowfullscreen:``},null,8,Mt)],8,kt),t.posttext.length>0?(e(),f(`p`,{key:1,class:`postext text`,innerHTML:t.posttext},null,8,Nt)):u(``,!0)])):t.mode==7?(e(),f(`div`,Pt,[g(`section`,{id:`file-`+t.fileNo},[g(`p`,It,[g(`a`,{href:`#file-`+t.fileNo},[g(`u`,null,`File `+i(t.fileNo)+`: `,1)],8,Lt),s(` `+i(` `+t.title),1)]),g(`object`,{class:`pdf-embed`,data:`/docs/blog/`+t.file,type:`application/pdf`},[g(`embed`,{src:`/docs/blog/`+t.file+`#zoom=FitW`,type:`application/pdf`},null,8,zt)],8,Rt)],8,Ft)])):t.mode==8?(e(),f(`div`,Bt,[g(`section`,{id:`carousel-`+t.carouselNo},[g(`p`,Ht,[g(`a`,{href:`#carousel-`+t.carouselNo},[g(`u`,null,`Carousel `+i(t.carouselNo)+`: `,1)],8,Ut),s(` `+i(` `+t.title),1)]),x(Ue,{progress:!0,"hide-delimiters":!0},{default:d(()=>[(e(!0),f(v,null,w(t.photos,(t,n)=>(e(),y(qe,{key:n,src:t.src},{default:d(()=>[g(`div`,Wt,[g(`div`,null,[g(`h3`,Gt,i(t.header),1),g(`span`,Kt,i(t.subtitle),1)])])]),_:2},1032,[`src`]))),128))]),_:2},1024)],8,Vt)])):t.mode==9?(e(),f(`div`,qt,[g(`h4`,null,` Definition `+i(t.defNo)+`: `+i(t.name),1),g(`p`,{innerHTML:t.content},null,8,Jt)])):(e(),f(`div`,Yt,[g(`p`,null,i(t),1)]))]))),128)),o.value.getReferences().length>0?(e(),f(`h2`,Xt,` References: `)):u(``,!0),g(`ol`,null,[(e(!0),f(v,null,w(o.value.getReferences(),(t,n)=>(e(),f(`section`,{id:`ref-`+(n+1),key:n,class:`reference`},[g(`li`,null,i(t.value),1)],8,Zt))),128))])])]))}});export{Qt as default};
//# sourceMappingURL=ArticleViewer-C_7pRNeQ.js.map