import{L as e,M as t,P as n,Pt as r,Y as i,_ as a,c as o,f as s,l as c,ut as l,v as u,y as d}from"./runtime-core.esm-bundler-C7VbFZnF.js";import{d as f,n as p,nt as m}from"./app-2v4iUkJD.js";import{a as h,n as g,r as _,s as v,t as y}from"./grid-iRhTu87-.js";import{$ as b,At as x,B as ee,Bt as S,D as C,E as w,F as te,G as ne,Gt as T,H as E,Ht as D,I as O,It as k,L as A,Nn as re,O as ie,Ot as ae,P as oe,R as se,Sn as j,Tn as M,Tt as ce,V as N,Vn as le,Vt as ue,W as P,Z as de,a as fe,an as F,at as pe,b as me,bn as he,bt as ge,c as _e,d as ve,dn as ye,et as be,fn as I,i as xe,in as Se,ln as Ce,lt as we,mt as Te,nn as Ee,o as De,on as L,p as Oe,pn as ke,q as Ae,r as je,sn as R,t as Me,u as Ne,un as z,vt as Pe,wt as Fe,xt as Ie,y as Le,z as Re,zn as ze,zt as Be}from"./snapping-6EwLI9Cw.js";import{t as Ve}from"./copy-paste-B23IyssU.js";import{t as He}from"./modeling-IYklxCm9.js";import{i as Ue,n as We,r as Ge,t as Ke}from"./useMathJax-QXbdQdKa.js";function B(e,t,n,r,i,a,o,s,c,l,u,d,f){this._create=e,this._elementFactory=t,this._lassoTool=n,this._palette=r,this._connect=i,this._registry=a,this._modeling=o,this._canvas=s,this._bus=c,this._textRenderer=l,this._importer=u,this._exporting=d,this._svgExporting=f,r.registerProvider(this),this._bus.on(`diagram.init`,e=>{setTimeout(()=>{v(s)},100),setTimeout(()=>{v(s)},150)})}B.$inject=[`create`,`elementFactory`,`lassoTool`,`palette`,`connect`,`elementRegistry`,`modeling`,`canvas`,`eventBus`,`textRenderer`,`importing`,`exporting`,`svgExporting`],B.prototype.getPaletteEntries=function(){let e=this._create,t=this._elementFactory,n=this._lassoTool,r=this._registry,i=this._modeling,a=this._canvas,o=this._bus;this._connect,this._textRenderer;let s=this._importer,c=this._exporting,l=this._svgExporting;return{"lasso-tool":{group:`tools`,className:`mdi-lasso mdi`,title:`Activate Lasso Tool`,action:{click:function(e){n.activateSelection(e)}}},"tool-separator":{group:`tools`,separator:!0},"create-place":{group:`create`,className:`mdi-circle-outline mdi`,title:`Add Place`,action:{click:function(n){let r=t.createPlace({x:0,y:0});e.start(n,r)}}},"create-transition":{group:`create`,className:`mdi-square-rounded-outline mdi`,title:`Add Transition`,action:{click:function(n){let r=t.createTransition({x:0,y:0});e.start(n,r)}}},"create-separator":{group:`create`,separator:!0},"import-model":{group:`model`,className:`mdi-import mdi`,title:`Import Model`,action:{click:function(e){let t=document.createElement(`input`);t.type=`file`,t.accept=`.pnml`,t.onchange=e=>{Array.from(t.files)[0].text().then(e=>{s.fire(`importing.load`,{text:e}),setTimeout(()=>{v(a),v(a)},75)})},t.click()}}},"export-model":{group:`model`,className:`mdi-export mdi`,title:`Export Model`,action:{click:function(e){let t=c.fire(`exporting.export`),n=new Blob([t],{type:`text/plain`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=`petri_net.pnml`,r.click(),URL.revokeObjectURL(n),r.remove()}}},"export-svg":{group:`model`,className:`mdi-content-save-move-outline mdi`,title:`Export SVG`,action:{click:function(e){let t=l.fire(`exporting.svg.export`),n=new Blob([t],{type:`text/plain`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=`petir_net.svg`,r.click(),URL.revokeObjectURL(n),r.remove()}}},"model-separator":{group:`model`,separator:!0},fitview:{group:`view`,className:`mdi-overscan mdi`,title:`Fit to Screen`,action:{click:function(e){v(a)}}},fullscreen:{group:`view`,className:`mdi-fullscreen mdi`,title:`Toggle Fullscreen`,action:{click:function(e){o.fire(`editor.fullscreen.toggle`,{}),setTimeout(()=>{v(a),v(a)},75)}}},"view-separator":{group:`view`,separator:!0},"clear-model":{group:`clear`,className:`mdi-trash-can-outline mdi`,title:`clear all elements`,action:{click:function(e){let n=r.getAll().filter(e=>!e.id.includes(`implicitroot`));n.length>0&&(o.fire(`formal.clear`,{}),n.forEach(e=>t.releaseIdentifer(e)),i.removeElements(n)),o.fire(`local.storage.clear`)}}},"reset-model":{group:`clear`,className:`mdi-restore mdi`,title:`Reset to Default Model`,action:{click:function(e){o.fire(`local.storage.clear`);let t=o.fire(`local.storage.find`);t&&s.fire(`importing.load`,{text:t}),setTimeout(()=>{v(a),v(a)},75)}}}}};function V(e){return e.type?e.type===`place`:!1}function H(e){return e.type?e.type===`transition`:!1}function U(e){return e.type?e.type===`flow`:e.id.startsWith(`flow`)}var qe=class extends x{constructor(e,t){super(),this._lastStateId=0,this._lastConnectionId=0,this._seen=[],this._bus=e,this._textRenderer=t}logIdentifer(e){this._seen.includes(e)||this._seen.push(e)}releaseIdentifer(e){this._seen.includes(e)&&(this._seen=this._seen.filter(t=>t!==e))}checkIdentifer(e){return!this._seen.includes(e)}getNextPlaceId(){let e=`place-${this._lastStateId++}`;for(;!this.checkIdentifer(e);)e=`place-${this._lastStateId++}`;return this.logIdentifer(e),e}getNextTransitionId(){let e=`transition-${this._lastStateId++}`;for(;!this.checkIdentifer(e);)e=`transition-${this._lastStateId++}`;return this.logIdentifer(e),e}getNextFlowId(){let e=`flow-${this._lastConnectionId++}`;for(;!this.checkIdentifer(e);)e=`flow-${this._lastConnectionId++}`;return this.logIdentifer(e),e}createPlace(e){let t={id:e.id?e.id:this.getNextPlaceId(),type:`place`,x:e.x,y:e.y,cx:25,cy:25,width:50,height:50,r:25};return this._bus.fire(`formal.create.place`,{element:t}),t}createTransition(e,t=!1){let n={id:e.id?e.id:this.getNextTransitionId(),type:`transition`,x:e.x,y:e.y,silent:t,width:t?30:60,height:60,labelText:e.labelText?e.labelText:`action`};return this._bus.fire(`formal.create.transition`,{element:n}),n}createFlow(e){let t={id:e.id?e.id:this.getNextFlowId(),type:`flow`,waypoints:e.waypoints||[k(e.source),k(e.target)],source:e.source,target:e.target};return this._bus.fire(`formal.create.flow`,{element:t}),t}};qe.$inject=[`eventBus`,`textRenderer`];function W(e,t,n,r,i,a,o,s){this._create=e,this._elementFactory=t,this._connect=n,this._modeling=i,this._eventBus=a,this._registry=o,this._select=s,r.registerProvider(this)}W.$inject=[`create`,`elementFactory`,`connect`,`contextPad`,`modeling`,`eventBus`,`elementRegistry`,`selection`],W.prototype.getContextPadEntries=function(e){let t=this._connect,n=this._modeling,r=this._elementFactory;this._create,this._registry;let i=this._select,a=this._eventBus;function o(t,r,i){a.fire(`pad.delete`,{elements:[e]}),n.removeElements([e])}function s(e,n,r){t.start(e,n,r)}function c(e,t,r){n.toggleTransitionType(t)}function l(e,t){let r=t.source,o=t.target,s=[{x:o.x,y:o.y},{x:r.x,y:r.y}];t.source=o,t.target=r,t.waypoints=s,n.removeConnection(t);let c=n.createConnection(o,r,t,r.parent);n.layoutConnection(c),a.fire(`elements.changed`,{elements:[c,t,o,r]}),i.select(c)}function u(e,t,o=!1){let s=r.createTransition({x:t.x+150,y:t.y+t.height/2},o);r.logIdentifer(s.id),s=n.createShape(s,{x:s.x,y:s.y},t.parent,1);let c={source:t,target:s,waypoints:[{x:t.x,y:t.y},{x:s.x,y:s.y}]},l=r.createFlow(c);r.logIdentifer(l.id);let u=n.connect(t,s,l,t.parent);n.layoutConnection(u),n.moveElements([s,t,u],{x:0,y:0}),a.fire(`elements.changed`,{elements:[s,t,u]}),i.select(s)}function d(e,t){let o=r.createPlace({x:t.x+150,y:t.y+t.height/2});r.logIdentifer(o.id),o=n.createShape(o,{x:o.x,y:o.y},t.parent,1);let s={source:t,target:o,waypoints:[{x:t.x,y:t.y},{x:o.x,y:o.y}]},c=r.createFlow(s);r.logIdentifer(c.id);let l=n.connect(t,o,c,t.parent);n.layoutConnection(l),n.moveElements([o,t,l],{x:0,y:0}),a.fire(`elements.changed`,{elements:[o,t,l]}),i.select(o)}let f={};return f.delete={action:{click:o},className:`context-pad-delete`,html:`<div class="entry mdi-delete mdi editor-hover"/>`,title:`delete`,group:`edit`},ue(e)?f:U(e)?(f.flip={action:{click:l},class:`context-pad-flip`,html:`<div class="entry mdi mdi-arrow-left-right editor-hover"/>`,title:`flip direction`,group:`edit`},f):(H(e)&&(f.switch={action:{click:c},class:`context-pad-switch`,html:`<div class="entry mdi mdi-toggle-switch mdi editor-hover"/>`,title:e.silent?`make visible`:`make silent`,group:`edit`}),V(e)&&(f[`create-trans`]={action:{click:u},class:`context-pad-create-trans`,html:`<div class="entry mdi mdi-square-rounded-outline editor-hover"/>`,title:`add transition`,group:`add`},f[`create-sil-trans`]={action:{click:(e,t)=>u(e,t,!0)},class:`context-pad-create-sil-trans`,html:`<div class="entry mdi mdi-square-rounded editor-hover"/>`,title:`add silent transition`,group:`add`}),H(e)&&(f[`create-place`]={action:{click:d},class:`context-pad-create-place`,html:`<div class="entry mdi mdi-circle-outline editor-hover"/>`,title:`add place`,group:`add`}),f.connect={action:{click:s,dragstart:s},className:`context-pad-contect`,html:`<div class="entry mdi-arrow-right-thick mdi editor-hover"/>`,title:`connect`,group:`join`},f)};function Je(e){return!e||!e.trim()}function Ye(e){return H(e)}function Xe(e){return Ye(e)?e.stateLabel||null:ue(e)?e.text||null:e.arcLabel||null}var Ze=2e3;function G(e,t,n,r,i,a){this._factory=t,this._canvas=n,this._modeling=i,this._textRenderer=a,this._bus=e,r.registerProvider(this),e.on(`element.dblclick`,function(e){o(e.element,!0)}),e.on([`autoPlace.start`,`canvas.viewbox.changing`,`drag.init`,`element.mousedown`,`popupMenu.open`,`root.set`,`selection.changed`],function(){r.isActive()&&r.complete()}),e.on([`shape.remove`,`connection.remove`],Ze,function(e){r.isActive(e.element)&&r.cancel()}),e.on([`commandStack.changed`],function(e){r.isActive()&&r.cancel()}),e.on(`directEditing.activate`,function(e){}),e.on(`create.end`,500,function(e){let t=e.context,n=t.shape,r=e.context.canExecute;e.isTouch||r&&(t.hints&&t.hints.createElementsBehavior===!1||o(n))}),e.on(`autoPlace.end`,500,function(e){o(e.shape)});function o(e,t){r.activate(e)}}G.$inject=[`eventBus`,`elementFactory`,`canvas`,`directEditing`,`modeling`,`textRenderer`],G.prototype.activate=function(e){if(!H(e)||e.silent)return;let t=Xe(e);if(t===void 0)return;let n={text:t},r=this.getEditingBBox(e);M(n,r);let i={},a=n.style||{};return M(a,{backgroundColor:`rgba(0,0,0,0.5)`,padding:`3px`,"border-radius":`5px`,color:`red`,border:null}),M(n,{options:i,style:a}),n},G.prototype.getEditingBBox=function(e){let t=this._canvas,n=e.label||e,r=t.getAbsoluteBBox(n);r.x+r.width/2,r.y+r.height/2;let i={x:r.x,y:r.y},a=t.zoom(),o=this._textRenderer.getDefaultStyle(),s=this._textRenderer.getExternalStyle();return s.fontSize*a,s.lineHeight,o.fontSize*a,o.lineHeight,{bounds:i,style:o}},G.prototype.update=function(e,t,n,r){Je(t)?t=``:Ye(e)&&(e.labelText=t,this._bus.fire(`elements.changed`,{elements:[e]}))};var Qe=class extends me{constructor(e){super(e)}getOrdering(e,t){return U(e)?{index:1,parent:t}:{index:-1,parent:t}}};Qe.$inject=[`eventBus`];var $e=Math.sqrt,et=Math.min,tt=Math.max,nt=Math.abs;function rt(e){return e**2}var K=.1,it=class extends ge{constructor(e,t,n,r){super(e);let i=this;this.postExecute([`connection.layout`,`connection.updateWaypoints`],function(e){let n=e.context;if((n.hints||{}).labelBehavior===!1)return;let r=n.connection.label,a;r&&r.parent&&(a=i.getVisibleLabelAdjustment(e),t.moveShape(r,a))})}getVisibleLabelAdjustment(e){let t=e.context,n=t.connection,r=n.label,i=M({},t.hints),a=t.newWaypoints||n.waypoints,o=t.oldWaypoints;return i.startChanged===void 0&&(i.startChanged=!!i.connectionStart),i.endChanged===void 0&&(i.endChanged=!!i.connectionEnd),this.getLabelAdjustment(r,a,o,i)}getLabelAdjustment(e,t,n,r){let i=k(e);return this.getAnchorPointAdjustment(i,t,n,r).delta}findNewLineStartIndex(e,t,n,r){let i=n.segmentIndex,a=t.length-e.length;if(r.segmentMove){let e=r.segmentMove.segmentStartIndex,t=r.segmentMove.newSegmentStartIndex;return i===e?t:i>=t?i+a<t?t:i+a:i}if(r.bendpointMove){let e=r.bendpointMove.insert,o=r.bendpointMove.bendpointIndex,s;return a===0?i:(i>=o&&(s=e?i+1:i-1),i<o&&(s=i,e&&n.type!==`bendpoint`&&o-1===i&&q(t,o)<n.relativeLocation&&s++),s)}return a===0?i:r.connectionStart&&i===0?0:r.connectionEnd&&i===e.length-2?t.length-2:Math.floor((t.length-2)/2)}getAnchorPointAdjustment(e,t,n,r){let i=0,a=0,o={point:e,delta:{x:0,y:0}},s=mt(e,n),c=s.segmentIndex,l=ft(n,t,s,r);if(l<0||l>t.length-2||l===null)return o;let u=st(n,c),d=st(t,l),f=s.position,p=at(u,f),m=ot(u,d);if(s.type===`bendpoint`){let r=t.length-n.length,c=s.bendpointIndex,l=n[c];if(t.indexOf(l)!==-1)return o;if(r===0){let n=t[c];return i=n.x-s.position.x,a=n.y-s.position.y,{delta:{x:i,y:a},point:{x:e.x+i,y:e.y+a}}}r<0&&c!==0&&c<n.length-1&&(p=q(n,c))}let h={x:(d[1].x-d[0].x)*p+d[0].x,y:(d[1].y-d[0].y)*p+d[0].y},g=E({x:e.x-f.x,y:e.y-f.y},m);return i=h.x+g.x-e.x,a=h.y+g.y-e.y,{point:Be(h),delta:Be({x:i,y:a})}}};function at(e,t){let n=N(e[0],e[1]),r=N(e[0],t);return n===0?0:r/n}function ot(e,t){let n=ee(e);return ee(t)-n}function q(e,t){let n=N(e[t-1],e[t]);return n/(n+N(e[t],e[t+1]))}function st(e,t){return[e[t],e[t+1]]}function J(e,t){return $e(rt(e.x-t.x)+rt(e.y-t.y))}function ct(e,t){return nt(e.x-t.x)<=K&&nt(e.y-t.y)<=K}function lt(e,t,n){return ut(e.x,t.x,n.x)&&ut(e.y,t.y,n.y)}function ut(e,t,n){return e>=et(t,n)-K&&e<=tt(t,n)+K}function dt(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function ft(e,t,n,r){let i=n.segmentIndex,a=t.length-e.length;if(r.segmentMove){let e=r.segmentMove.segmentStartIndex,t=r.segmentMove.newSegmentStartIndex;return i===e?t:i>=t?i+a<t?t:i+a:i}if(r.bendpointMove){let e=r.bendpointMove.insert,o=r.bendpointMove.bendpointIndex,s;return a===0?i:(i>=o&&(s=e?i+1:i-1),i<o&&(s=i,e&&n.type!==`bendpoint`&&o-1===i&&q(t,o)<n.relativeLocation&&s++),s)}return a===0?i:r.connectionStart&&i===0?0:r.connectionEnd&&i===e.length-2?t.length-2:Math.floor((t.length-2)/2)}function pt(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=n.x-e.x,s=n.y-e.y,c=i*i+a*a,l=i*o+a*s,u=o*o+s*s-r*r,d=l/c,f=u/c,p=d*d-f;if(p<0&&p>-1e-6&&(p=0),p<0)return[];let m=$e(p),h=-d+m,g=-d-m,_={x:e.x-i*h,y:e.y-a*h};return p===0?[_]:[_,{x:e.x-i*g,y:e.y-a*g}].filter(function(n){return lt(n,e,t)})}function mt(e,t){let n=0,r,i,a,o,s,c,l,u,d,f,p;for(n=0;n<t.length-1;n++){if(r=t[n],i=t[n+1],ct(r,i)?l=[r]:(a=J(e,r),o=J(e,i),c=et(a,o),l=pt(r,i,e,c)),l.length<1)throw Error(`expected between [1, 2] circle -> line intersections`);l.length===1&&(u={type:`bendpoint`,position:l[0],segmentIndex:n,bendpointIndex:ct(r,l[0])?n:n+1}),l.length===2&&(s=dt(l[0],l[1]),u={type:`segment`,position:s,segmentIndex:n,relativeLocation:J(r,s)/J(r,i)}),d=J(u.position,e),(!p||f>d)&&(p=u,f=d)}return p}it.$inject=[`eventBus`,`modeling`,`elementFactory`,`textRenderer`];var ht={__depends__:[Ie,_e],__init__:[`examplePaletteProvider`,`contextPadProvider`,`labelEditingProvider`,`orderingProvidier`,`labelBehaviour`],examplePaletteProvider:[`type`,B],contextPadProvider:[`type`,W],labelEditingProvider:[`type`,G],orderingProvidier:[`type`,Qe],labelBehaviour:[`type`,it]},gt=1500,Y=`#01031b`,_t=`#ebdf3f`,vt={fontFamily:`sans-serif`,fontSize:16,fontWeight:`normal`,textLength:50,textAnchor:`middle`,dominantBaseline:`middle`},yt={fontFamily:`sans-serif`,fontSize:10,fontWeight:`normal`,textAnchor:`middle`,dominantBaseline:`middle`},bt=class extends Se{constructor(e,t,n,r){super(e,1);let i=this;this._textRender=r;let a=gt;e.on([`render.shape`],a,function(e,t){e.type;let n=t.element,r=t.gfx,a=t.attrs;if(i.canRender(n))return i.drawShape(r,n,a)}),e.on([`render.connection`],1450,function(e,t){e.type;let n=t.element,r=t.gfx,a=t.attrs;if(i.canRender(n))return i.drawConnection(r,n,a)}),this.CONNECTION_STYLE=t.style({strokeWidth:3,stroke:`#222222`,strokeLinecap:`round`,strokeLinejoin:`round`,fill:`none`}),this.PLACE_STYLE=t.style({fill:`#f5f5f5`,stroke:`#222222`,strokeWidth:2}),this.TRANSITION_STYLE=t.style({fill:`#eea159`,stroke:`#222222`,strokeWidth:2}),this.SILENT_TRANSITION_STYLE=t.style({fill:`#404040`,stroke:`#222222`,strokeWidth:2});let o=z(`defs`,{});this._setupMarkers(o),F(n.getActiveLayer(),o)}_setupMarkers(e){let t=z(`marker`,{id:`src-place-arrow`,viewbox:`0 0 5 5`,refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:`auto-start-reverse`,stroke:`#222222`,fill:`#222222`}),n=z(`marker`,{id:`src-trans-arrow`,viewbox:`0 0 5 5`,refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:`auto-start-reverse`,stroke:`#222222`,fill:`#222222`}),r=z(`marker`,{id:`src-silent-trans-arrow`,viewbox:`0 0 5 5`,refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:`auto-start-reverse`,stroke:`#222222`,fill:`#222222`}),i=z(`marker`,{id:`connect-hover-arrow`,viewbox:`0 0 5 5`,refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:`auto-start-reverse`,stroke:`#5671e7`,fill:`#5671e7`}),a=z(`path`,{d:`M 0 0 L 5 2.5 L 0 5 z`});F(t,a),a=z(`path`,{d:`M 0 0 L 5 2.5 L 0 5 z`}),F(n,a),a=z(`path`,{d:`M 0 0 L 5 2.5 L 0 5 z`}),F(r,a),a=z(`path`,{d:`M 0 0 L 5 2.5 L 0 5 z`}),F(i,a),F(e,t),F(e,n),F(e,r),F(e,i)}canRender(e){return!0}trimId(e){return e.split(`-`)[0][0]+e.split(`-`)[1]}drawShape(e,t,n){let r=[],i=z(`g`,{});if(V(t)){let e=this.createCircleForState(t,this.PLACE_STYLE);r.push(this.createShadowForState(e)),r.push(e),r.push(this.drawShapeId(t))}else if(H(t)){let e=this.drawTransition(t,this.TRANSITION_STYLE);r.push(this.drawTransitionShadow(e)),r.push(e);let n=this.drawTransitionLabel(t);n&&r.push(n),r.push(this.drawTransitionId(t))}else U(t)&&r.push(this._drawSimpleConnection(e,t,n));for(let e of r)F(i,e);return F(e,i),i}createCircleForState(e,t){let n=z(`circle`,t||{});return L(n,{cx:e.cx,cy:e.cy,r:e.r,fill:n.fill}),e.selected&&L(n,{fill:_t}),n}createShadowForState(e){let t=Ce(e);return L(t,{opacity:.25,cx:parseFloat(e.attributes.cx.nodeValue)+2.5,cy:parseFloat(e.attributes.cy.nodeValue)+2.5}),t}drawTransitionId(e){let t=z(`text`,M({opacity:.75,x:-1*e.width*.1,y:e.height*1.1,fill:Y},yt));return t.textContent=this.trimId(e.id),t}drawShapeId(e){let t=z(`text`,M({opacity:.75,x:-1.25,y:50,fill:Y},yt));return t.textContent=this.trimId(e.id),t}drawTransition(e,t){let n=z(`rect`,t||{});return L(n,{x:0,y:0}),e.silent?(L(n,{width:e.width,height:e.height,rx:10}),L(n,this.SILENT_TRANSITION_STYLE)):L(n,{width:e.width,height:e.height,rx:10}),n}drawTransitionLabel(e){if(e.silent)return null;let t=z(`text`,M({x:e.silent?-20:30,y:e.silent?e.height:30,fill:Y},vt));return e.labelText.length>0&&!e.silent?t.textContent=e.labelText:(t.textContent=`t`+e.id.split(`-`)[1],L(t,{textLength:0})),t}drawTransitionShadow(e){let t=Ce(e);return L(t,{opacity:.25,x:parseFloat(e.attributes.x.nodeValue)+3,y:parseFloat(e.attributes.y.nodeValue)+3}),t}_drawSimpleConnection(e,t,n){if(!t.waypoints||t.waypoints.length<2)return e;Array.from(t.waypoints);let r=Ee(t.waypoints,M({},this.CONNECTION_STYLE),5);return t.target?V(t.target)?L(r,{"marker-end":`url(#src-place-arrow)`}):H(t.target)&&(t.target.silent?L(r,{"marker-end":`url(#src-silent-trans-arrow`}):L(r,{"marker-end":`url(#src-trans-arrow)`})):L(r,{"marker-end":`url(#connect-hover-arrow)`}),F(e,r),e}drawConnection(e,t,n){return this._drawSimpleConnection(e,t,n)}};bt.$inject=[`eventBus`,`styles`,`canvas`,`textRenderer`];var xt=12,St=1.2,Ct=`#01031b`,wt=30;function Tt(e){let t=M({fontFamily:`Arial, sans-serif`,fontSize:xt,fontWeight:`normal`,color:Ct,background:`rgba(0,0,0,0.5)`,lineHeight:St},e&&e.defaultStyle||{}),n=parseInt(t.fontSize,10)-1,r=M({},t,{fontSize:n},e&&e.externalStyle||{}),i=new Fe({style:t});this.getExternalLabelBounds=function(e,t){let n=i.getDimensions(t,{box:{width:90,height:30},style:r});return{x:Math.round(e.x+e.width/2-n.width/2),y:Math.round(e.y),width:Math.ceil(n.width),height:Math.ceil(n.height)}},this.getTextAnnotationBounds=function(e,n){let r=i.getDimensions(n,{box:e,style:t,align:`left-top`,padding:5});return{x:e.x,y:e.y,width:e.width,height:Math.max(wt,Math.round(r.height))}},this.createText=function(e,t){return i.createText(e,t||{})},this.getDefaultStyle=function(){return t},this.getExternalStyle=function(){return r}}Tt.$inject=[`config.textRenderer`];var Et={__init__:[`petriRenderer`],petriRenderer:[`type`,bt],textRenderer:[`type`,Tt]},Dt={__init__:[`elementFactory`],elementFactory:[`type`,qe]},Ot=class extends ve{constructor(e,t,n){super(e,t,n)}getHandlers(){return super.getHandlers()}toggleTransitionType(e){if(H(e)){e.width=e.silent?60:30,e.silent=!e.silent;let t={elements:[e].concat(e.incoming,e.outgoing)};this._eventBus.fire(`elements.changed`,t),this.moveElements(t.elements,{x:0,y:0})}}removeElements(e){return this._eventBus.fire(`elements.delete`,{elements:e}),super.removeElements(e)}};Ot.$inject=[`eventBus`,`elementFactory`,`commandStack`];var kt={__init__:[`modeling`],modeling:[`type`,Ot]},At=class extends Ae{constructor(e,t,n){super(e),this.init()}init(){this.addRule(`element.copy`,e=>!0),this.addRule(`connection.create`,this.connectionCreate.bind(this))}connectionCreate(e){return!!(V(e.source)&&H(e.target)||H(e.source)&&V(e.target))}};m(At,`$inject`,[`eventBus`,`modeling`,`selection`]);var jt={__init__:[`petriNetRules`],petriNetRules:[`type`,At]};function Mt(e,t,n,r,i){this._factory=i;function a(e,t){return r.allowed(`connection.create`,{source:e,target:t})}function o(e,t){return a(t,e)}e.on(`connect.hover`,function(e){let t=e.context,n=t.start,r=e.hover,i;t.hover=r,i=t.canExecute=a(n,r),!ze(i)&&(i===!1?(i=t.canExecute=o(n,r),!ze(i)&&i!==!1&&(t.source=r,t.target=n)):(t.source=n,t.target=r))}),e.on([`connect.out`,`connect.cleanup`],function(e){let t=e.context;t.hover=null,t.source=null,t.target=null,t.canExecute=!1}),e.on(`connect.end`,function(t){let r=t.context,a=r.canExecute,o=r.connectionStart,s={x:t.x,y:t.y},c=r.source,l=r.target;if(!a)return!1;r.id;let u={connectionStart:Nt(r)?s:o,connectionEnd:Nt(r)?o:s};le(a);let d=i.createFlow({source:c,target:l});r.connection=n.connect(c,l,d,u),n.layoutConnection(r.connection),e.fire(`elements.changed`,{elements:[c,l,r.connection]})}),this.start=function(e,n,r,i){le(r)||(i=r,r=k(n)),t.init(e,`connect`,{autoActivate:i,data:{shape:n,type:`flow`,context:{start:n,type:`flow`,connectionStart:r,id:this._factory.getNextFlowId()}}})}}Mt.$inject=[`eventBus`,`dragging`,`modeling`,`rules`,`elementFactory`];function Nt(e){let t=e.hover,n=e.source,r=e.target;return t&&n&&t===n&&n!==r}var Pt={__depends__:[we,P,ne],__init__:[`connect`],connect:[`type`,Mt]},X=20,Ft={__init__:[`layouter`],layouter:[`type`,class extends Ne{constructor(){super()}makePoint(e){return k(e)}layoutConnection(e,t){let n=e.source,r=e.target,i=e.waypoints||[];if(!n||!r)return super.layoutConnection(e,t);let a=i.slice(1,-1),o=Ue(n),s=Ue(r);for(let e of[o,s])e.x-=X/2,e.y-=X/2,e.width+=X,e.height+=X;let c,l;i.length<=2?(c=i[0],l=i[i.length-1]):(c=a[0],l=a[a.length-1]),We(c,o)&&(c=this.makePoint(i[1])),We(l,s)&&(l=this.makePoint(i[i.length-2]));let u=Ge(c,o).vertex,d=Ge(l,s).vertex;return[u,...a,d]}}]},It={"<":`&lt;`,">":`&gt;`,"'":`&apos;`,'"':`&quot;`,"&":`&amp;`},Lt=class{constructor(e,t,n,r,i){m(this,`_modeling`,void 0),m(this,`_factory`,void 0),m(this,`_canvas`,void 0),m(this,`_registry`,void 0),m(this,`_bus`,void 0),this._modeling=e,this._factory=t,this._canvas=n,this._registry=r,this._bus=i,this._bus.on(`importing.load`,this.load.bind(this))}fire(e,t){return this._bus.fire(e,t)}load(e){if(e.text===void 0)throw Error(`No text provided to load`);let t=new DOMParser().parseFromString(this.decode(e.text),`application/xml`);if(t.getElementsByTagName(`parsererror`).length>0)throw Error(`Failed to parse XML ::`+t.getElementsByTagName(`parsererror`)[0].textContent.trim());this.import(t)}decode(e){let t=e;for(let e in It)t=t.replace(It[e],e);return t}import(e){try{this._import(e)}catch(e){throw alert(`Failed to parse and load in system :: `+e),e}}_import(e){let t=this._registry.getAll().filter(e=>!e.id.includes(`implicitroot`));t.length>0&&(this._bus.fire(`formal.clear`,{}),t.forEach(e=>this._factory.releaseIdentifer(e)),this._modeling.removeElements(t));let n={},r=e.getElementsByTagName(`place`);for(let e of r){var i=e.attributes,a=e.getElementsByTagName(`graphics`)[0].getElementsByTagName(`position`)[0],o={id:i.id.value,x:parseInt(a.attributes.x.value),y:parseInt(a.attributes.y.value)},s=this._factory.createPlace(o);this._factory.logIdentifer(s.id);let t=this._modeling.createShape(s,{x:s.x+s.width/2,y:s.y+s.height/2},this._canvas.getRootElement(),1);n[t.id]=t}let c=e.getElementsByTagName(`transition`);for(let e of c){var i=e.attributes,a=e.getElementsByTagName(`graphics`)[0].getElementsByTagName(`position`)[0];let t=this.decode(e.getElementsByTagName(`name`)[0].textContent).trim();var o={id:i.id.value,x:parseInt(a.attributes.x.value),y:parseInt(a.attributes.y.value),labelText:t},s=this._factory.createTransition(o,i.invisible.value==`true`);this._factory.logIdentifer(s.id);let r=this._modeling.createShape(s,{x:s.x+s.width/2,y:s.y+s.height/2},this._canvas.getRootElement(),1);n[r.id]=r}let l=e.getElementsByTagName(`arc`);for(let e of l){var i=e.attributes;let t=n[i.source.value],r=n[i.target.value];if(e.getElementsByTagName(`graphics`).length>0){var u=[];for(var a of e.getElementsByTagName(`graphics`)[0].getElementsByTagName(`position`))u.push({x:parseInt(a.attributes.x.value),y:parseInt(a.attributes.y.value)});u=u.map(e=>({x:e.x,y:e.y}))}else var u=[{x:t.x,y:t.y},{x:r.x,y:r.y}];var o={id:i.id.value,source:t,target:r,waypoints:u},s=this._factory.createFlow(o);this._factory.logIdentifer(s.id);let c=this._modeling.createConnection(t,r,s,this._canvas.getRootElement());this._modeling.layoutConnection(c),n[s.id]=c}let d=this._bus,f=this._modeling,p=1;for(let e in n){let t=n[e];setTimeout(()=>{f.moveShape(t,{x:.01,y:.01},!1,{recurse:!1,layout:!0}),d.fire(`element.changed`,{element:t}),d.fire(`elements.changed`,{elements:[t]})},p),p+=1}}};m(Lt,`$inject`,[`modeling`,`elementFactory`,`canvas`,`elementRegistry`,`eventBus`]);var Rt={__init__:[`importing`],importing:[`type`,Lt]},Z=[];for(let e=0;e<256;++e)Z.push((e+256).toString(16).slice(1));function zt(e,t=0){return(Z[e[t+0]]+Z[e[t+1]]+Z[e[t+2]]+Z[e[t+3]]+`-`+Z[e[t+4]]+Z[e[t+5]]+`-`+Z[e[t+6]]+Z[e[t+7]]+`-`+Z[e[t+8]]+Z[e[t+9]]+`-`+Z[e[t+10]]+Z[e[t+11]]+Z[e[t+12]]+Z[e[t+13]]+Z[e[t+14]]+Z[e[t+15]]).toLowerCase()}var Bt,Vt=new Uint8Array(16);function Ht(){if(!Bt){if(typeof crypto>`u`||!crypto.getRandomValues)throw Error(`crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported`);Bt=crypto.getRandomValues.bind(crypto)}return Bt(Vt)}var Ut={randomUUID:typeof crypto<`u`&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function Wt(e,t,n){if(Ut.randomUUID&&!t&&!e)return Ut.randomUUID();e=e||{};let r=e.random??e.rng?.()??Ht();if(r.length<16)throw Error(`Random bytes length must be >= 16`);if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){if(n=n||0,n<0||n+16>t.length)throw RangeError(`UUID byte range ${n}:${n+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[n+e]=r[e];return t}return zt(r)}function Q(e,...t){return(...n)=>{let r=n[n.length-1]||{},i=[e[0]];return t.forEach((t,a)=>{let o=Number.isInteger(t)?n[t]:r[t];i.push(o,e[a+1])}),i.join(``)}}var Gt=`<?xml version="1.0" encoding="UTF-8"?>
<pnml>
<net type="http://www.pnml.org/version-2009/grammar/pnmlcoremodel" id="Generated by Petri Net Editor">
    <name>
        <text>Generated by Petri Net Editor</text>
    </name>
    <page id="page-1">
`,Kt=`   </page>
</net>
</pnml>
`,qt=Q`       <place id="${`id`}">
            <name>
                <text>${`name`}</text>
            </name>
            <graphics>
                <position x="${`x`}" y="${`y`}"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="${`UUID`}" />
`;Q`           <initialMarking>
                <text>${`marking`}</text>
            </initialMarking>
`,Q`           <finalMarking>
                <text>${`marking`}</text>
            </finalMarking>
`;var Jt=`       </place>
`,Yt=Q`       <transition id="${`id`}" invisible="${`silent`}">
            <name>
                <text>${`name`}</text>
            </name>
            <graphics>
                <position x="${`x`}" y="${`y`}"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="${`UUID`}" activity="${`activity`}"/>
`,Xt=`       </transition>
`,Zt=Q`       <arc id="${`id`}" source="${`src`}" target="${`tgt`}">
            <toolspecific tool="ProM" version="6.4" localNodeID="${`UUID`}" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
`,Qt=Q`                <position x="${`x`}" y="${`y`}"/>
`,$t=`           </graphics>       
        </arc>
`,en={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&apos;`,'"':`&quot;`},tn=class{constructor(e,t){m(this,`_bus`,void 0),m(this,`_registry`,void 0),m(this,`_xml`,void 0),this._bus=e,this._registry=t,this._xml=``,this._bus.on(`exporting.export`,this.export.bind(this))}fire(e){return this._bus.fire(e)}encode(e){let t=e;for(let e in en)t=t.replace(e,en[e]);return t}export(){this._xml=this.createHead();let e=this,t=V,n=this._registry.filter(t);var r=function(t,n){return e.serialise(e,t,n)};n.forEach(r),t=H,n=this._registry.filter(t);var r=function(t,n){return e.serialise(e,t,n)};n.forEach(r),t=U,n=this._registry.filter(t);var r=function(t,n){return e.serialise(e,t,n)};return n.forEach(r),this._xml+this.createTail()}createHead(){return Gt}serialise(e,t,n){V(t)?e._xml+=e._serialisePlace(e,t,n):H(t)?e._xml+=e._serialiseTransition(e,t,n):U(t)?e._xml+=e._serialiseFlow(e,t,n):console.error(`Unknown element type: ${t.type}`)}_serialisePlace(e,t,n){let r=Wt();return``+qt({id:t.id,name:t.id,x:parseInt(t.x),y:parseInt(t.y),UUID:r})+Jt}_serialiseTransition(e,t,n){let r=Wt();return``+Yt({id:t.id,name:t.labelText,silent:t.silent,x:parseInt(t.x),y:parseInt(t.y),activity:t.silent?`$invisible$`:``,UUID:r})+Xt}_serialiseFlow(e,t,n){let r=Wt(),i=``+Zt({id:t.id,src:t.source.id,tgt:t.target.id,UUID:r});for(let e of t.waypoints)i+=Qt({x:parseInt(e.x),y:parseInt(e.y)});return i+$t}createTail(){return Kt}};m(tn,`$inject`,[`eventBus`,`elementRegistry`]);var nn=class{constructor(e,t){m(this,`_bus`,void 0),m(this,`_canvas`,void 0),this._bus=e,this._canvas=t,this._bus.on(`exporting.svg.export`,this.export.bind(this))}fire(e){return this._bus.fire(e)}export(){let e;try{let t=this._canvas.getActiveLayer(),n=j(`:scope > defs`,this._canvas._svg),r=ye(t),i=n?`<defs>`+ye(n)+`</defs>`:``,a=t.getBBox();e=`<?xml version="1.0" encoding="utf-8"?>
<!-- created with the help of adam banham / http://adambanham.io -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="`+a.width+`" height="`+a.height+`" viewBox="`+a.x+` `+a.y+` `+a.width+` `+a.height+`" version="1.1">`+i+r+`</svg>`}catch(e){return alert(`Unable to serialise svg :: `+e),null}return e}};m(nn,`$inject`,[`eventBus`,`canvas`]);var rn={__init__:[`exporting`,`svgExporting`],exporting:[`type`,tn],svgExporting:[`type`,nn]},an=`<?xml version="1.0" encoding="UTF-8"?>
<pnml>
<net type="http://www.pnml.org/version-2009/grammar/pnmlcoremodel" id="Generated by Petri Net Editor">
    <name>
        <text>Generated by Petri Net Editor</text>
    </name>
    <page id="page-1">
       <place id="place-1">
            <name>
                <text>place-1</text>
            </name>
            <graphics>
                <position x="-9" y="-75"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="c5110944-0c3e-4d34-9a58-594234a39d04" />
       </place>
       <place id="place-2">
            <name>
                <text>place-2</text>
            </name>
            <graphics>
                <position x="222" y="-74"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="e6019761-d099-44b9-82f9-9d9ff276267b" />
       </place>
       <place id="place-3">
            <name>
                <text>place-3</text>
            </name>
            <graphics>
                <position x="221" y="100"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="fca9446f-dd25-4606-b1a0-d9f745ded21b" />
       </place>
       <place id="place-4">
            <name>
                <text>place-4</text>
            </name>
            <graphics>
                <position x="455" y="-74"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="eba459f1-02e1-420b-86c7-e97e7e663456" />
       </place>
       <place id="place-5">
            <name>
                <text>place-5</text>
            </name>
            <graphics>
                <position x="455" y="100"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="c75fcd11-30a7-48fd-84ca-562f9fad859e" />
       </place>
       <place id="place-6">
            <name>
                <text>place-6</text>
            </name>
            <graphics>
                <position x="647" y="14"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="faa61271-aad1-4ad3-b07a-076412abc8d1" />
       </place>
       <transition id="transition-1" invisible="true">
            <name>
                <text>action</text>
            </name>
            <graphics>
                <position x="103" y="-79"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="16e41e1c-88c0-4689-9ae8-4ea3f3c83960" activity="$invisible$"/>
       </transition>
       <transition id="transition-2" invisible="false">
            <name>
                <text>a</text>
            </name>
            <graphics>
                <position x="329" y="-80"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="cc453140-89a3-4b96-8363-1c90ef4cc2de" activity=""/>
       </transition>
       <transition id="transition-3" invisible="false">
            <name>
                <text>b</text>
            </name>
            <graphics>
                <position x="329" y="9"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="6842f382-41d3-4a25-99a8-9b34f428d12e" activity=""/>
       </transition>
       <transition id="transition-4" invisible="false">
            <name>
                <text>c</text>
            </name>
            <graphics>
                <position x="329" y="95"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="8d25f840-d6c9-44d5-b6b7-fa5f15ac8924" activity=""/>
       </transition>
       <transition id="transition-5" invisible="true">
            <name>
                <text>action</text>
            </name>
            <graphics>
                <position x="344" y="184"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="256a3b5b-f555-4e01-982f-fc681c7fdff7" activity="$invisible$"/>
       </transition>
       <transition id="transition-6" invisible="true">
            <name>
                <text>action</text>
            </name>
            <graphics>
                <position x="554" y="9"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="343c7a38-18e1-4aa7-94e3-7052fd3f8642" activity="$invisible$"/>
       </transition>
       <arc id="flow-12" source="place-1" target="transition-1">
            <toolspecific tool="ProM" version="6.4" localNodeID="96347a09-fde3-4688-b57a-43e0a633c653" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="40" y="-50"/>
                <position x="103" y="-50"/>
           </graphics>       
        </arc>
       <arc id="flow-14" source="transition-1" target="place-3">
            <toolspecific tool="ProM" version="6.4" localNodeID="85265561-da5e-476d-81ae-415bceb38c06" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="118" y="-19"/>
                <position x="118" y="124"/>
                <position x="221" y="124"/>
           </graphics>       
        </arc>
       <arc id="flow-16" source="transition-1" target="place-2">
            <toolspecific tool="ProM" version="6.4" localNodeID="e757674a-9be4-4493-ba33-2791a6e643da" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="133" y="-49"/>
                <position x="222" y="-49"/>
           </graphics>       
        </arc>
       <arc id="flow-17" source="place-2" target="transition-2">
            <toolspecific tool="ProM" version="6.4" localNodeID="0d282f4d-bcc1-42a7-b587-cd28cbd489af" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="272" y="-50"/>
                <position x="329" y="-50"/>
           </graphics>       
        </arc>
       <arc id="flow-19" source="transition-3" target="place-4">
            <toolspecific tool="ProM" version="6.4" localNodeID="c4b20458-a91d-4d8a-b336-c1a4d276b3c0" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="389" y="39"/>
                <position x="479" y="39"/>
                <position x="479" y="-24"/>
           </graphics>       
        </arc>
       <arc id="flow-21" source="transition-2" target="place-4">
            <toolspecific tool="ProM" version="6.4" localNodeID="e2a74903-ab8b-43e3-88d7-f878d6280ed5" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="389" y="-50"/>
                <position x="455" y="-50"/>
           </graphics>       
        </arc>
       <arc id="flow-22" source="place-3" target="transition-4">
            <toolspecific tool="ProM" version="6.4" localNodeID="76289e8a-9185-4c1e-b115-edc52536e0db" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="271" y="125"/>
                <position x="329" y="125"/>
           </graphics>       
        </arc>
       <arc id="flow-23" source="transition-4" target="place-5">
            <toolspecific tool="ProM" version="6.4" localNodeID="59c043a5-5f3d-4818-8c0e-62d4a59c8e08" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="389" y="125"/>
                <position x="455" y="125"/>
           </graphics>       
        </arc>
       <arc id="flow-24" source="place-5" target="transition-5">
            <toolspecific tool="ProM" version="6.4" localNodeID="5d01cee2-cbee-4d41-8702-5d84ef2ce0c2" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="480" y="150"/>
                <position x="480" y="214"/>
                <position x="374" y="214"/>
           </graphics>       
        </arc>
       <arc id="flow-26" source="transition-5" target="place-3">
            <toolspecific tool="ProM" version="6.4" localNodeID="dd144555-1505-4c1f-aee0-a25d9c324213" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="344" y="214"/>
                <position x="247" y="214"/>
                <position x="246" y="150"/>
           </graphics>       
        </arc>
       <arc id="flow-27" source="place-5" target="transition-6">
            <toolspecific tool="ProM" version="6.4" localNodeID="8ce721d8-c3bf-48bf-be9a-38e55659ebdd" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="505" y="125"/>
                <position x="569" y="126"/>
                <position x="569" y="69"/>
           </graphics>       
        </arc>
       <arc id="flow-29" source="place-4" target="transition-6">
            <toolspecific tool="ProM" version="6.4" localNodeID="bed604c4-46d1-4034-89d8-6a22ffe94788" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="505" y="-50"/>
                <position x="569" y="-52"/>
                <position x="569" y="9"/>
           </graphics>       
        </arc>
       <arc id="flow-30" source="transition-6" target="place-6">
            <toolspecific tool="ProM" version="6.4" localNodeID="b7006ee3-f605-468b-9477-5a09575cdb52" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="584" y="39"/>
                <position x="647" y="39"/>
           </graphics>       
        </arc>
       <arc id="flow-1" source="place-3" target="transition-3">
            <toolspecific tool="ProM" version="6.4" localNodeID="5d5af9de-769c-4418-986c-27ce72bf0726" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="246" y="100"/>
                <position x="246" y="50"/>
                <position x="329" y="50"/>
           </graphics>       
        </arc>
       <arc id="flow-4" source="place-2" target="transition-3">
            <toolspecific tool="ProM" version="6.4" localNodeID="8713f9fc-10c9-406a-8852-c209590d5fed" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="243" y="-24"/>
                <position x="243" y="33"/>
                <position x="329" y="33"/>
           </graphics>       
        </arc>
       <arc id="flow-8" source="transition-3" target="place-5">
            <toolspecific tool="ProM" version="6.4" localNodeID="6b28f711-3663-4ce5-8d00-5f152dc0150b" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="359" y="56"/>
                <position x="479" y="56"/>
                <position x="479" y="100"/>
           </graphics>       
        </arc>
   </page>
</net>
</pnml>
`,$=`petriNetDocument`,on=class{constructor(e,t){m(this,`_bus`,void 0),m(this,`_importing`,void 0),this._bus=e,this._importing=t,this._bus.on(`diagram.init`,()=>{setTimeout(()=>{let e=this.find();e?this._importing.fire(`importing.load`,{text:e}):console.log(`No document found in local storage, starting fresh.`)},100)}),this._bus.on(`local.storage.set`,this.set.bind(this)),this._bus.on(`local.storage.get`,this.get.bind(this)),this._bus.on(`local.storage.clear`,this.clear.bind(this)),this._bus.on(`local.storage.find`,this.find.bind(this))}fire(e,t){this._bus.fire(e,t)}find(){try{return localStorage.getItem($)||(this.set({content:an}),an)}catch(e){console.error(`Failed to retrieve document from local storage:`,e)}return null}get(){try{return localStorage.getItem($)}catch(e){return console.error(`Failed to get item from local storage with key ${$}:`,e),null}}clear(){localStorage.removeItem($)}set(e){if(e.content)try{localStorage.setItem($,e.content)}catch(e){console.error(`Failed to save document to local storage:`,e)}else throw Error(`Invalid context for local storage set event`)}};m(on,`$inject`,[`eventBus`,`importing`]);var sn={__init__:[`localSessionStorage`],localSessionStorage:[`type`,on]},cn=class{constructor(e,t,n){m(this,`_bus`,void 0),m(this,`_exporting`,void 0),m(this,`_local`,void 0),this._bus=e,this._exporting=t,this._local=n,this._bus.on(`elements.changed`,250,this.reflect.bind(this))}reflect(e){let t=this._exporting.fire(`exporting.export`);this._local.fire(`local.storage.set`,{content:t})}};m(cn,`$inject`,[`eventBus`,`exporting`,`localSessionStorage`]);var ln={__init__:[`cacheReflection`],cacheReflection:[`type`,cn]},un=class extends h{constructor(e,t,n,r,i,a,o,s){super(e,t,n,r,i,a,o,s),m(this,`_elementFactory`,void 0),this._elementFactory=r,i.on(`copyPaste.copyElement`,750,this.copyElementData.bind(this))}createShape(e){let t=Object.assign({},e);console.log(`createShape`,t);let n;return V(e)?(t.id=this._elementFactory.getNextPlaceId(),n=this._elementFactory.createPlace(t)):H(e)?(t.id=this._elementFactory.getNextTransitionId(),n=this._elementFactory.createTransition(t,t.silent)):(t.id=this._elementFactory.getNextFlowId(),n=this._elementFactory.createFlow(t)),n}copyElementData(e){let t=e.descriptor,n=e.element;t.type=n.type,H(n)&&(t.silent=n.silent,t.labelText=n.labelText)}};m(un,`$inject`,[`canvas`,`create`,`clipboard`,`elementFactory`,`eventBus`,`modeling`,`mouse`,`rules`]);var dn={__init__:[`copyPaste`],copyPaste:[`type`,un]};function fn(e,t,n,r,i,a){function o(e,t,n){let r=e.index,i=e.point,a,o,s,c,l,u;return r<=0||e.bendpoint?!1:(a=t[r-1],o=t[r],s=D(a,o),c=T(a,o),l=Math.abs(i.x-s.x),u=Math.abs(i.y-s.y),c&&l<=n&&u<=n)}function s(e,t){let n=e.waypoints,r,i,a,o;return t.index<=0||t.bendpoint||(r={start:n[t.index-1],end:n[t.index]},i=T(r.start,r.end),!i)?null:(a=i===`h`?r.end.x-r.start.x:r.end.y-r.start.y,o=se(a)/2,o)}function c(e,n){let a=n.waypoints,c=Re(t,a,e),l;if(c)return l=s(n,c),o(c,a,l)?i.start(e,n,c.index):r.start(e,n,c.index,!c.bendpoint),!0}function l(e,t,r){S(r)&&he.bind(e,t,function(e){n.triggerMouseEvent(t,e,r),e.stopPropagation()})}function u(e,n){let r=t.getLayer(`overlays`),i=j(`.djs-bendpoints[data-element-id="`+Pe(e.id)+`"]`,r);return!i&&n&&(i=z(`g`),L(i,{"data-element-id":e.id}),R(i).add(`djs-bendpoints`),F(r,i),l(i,`mousedown`,e),l(i,`click`,e),l(i,`dblclick`,e)),i}function d(e,t){return j(`.djs-segment-dragger[data-segment-idx="`+e+`"]`,t)}function f(e,t){t.waypoints.forEach(function(t,n){let r=O(e);F(e,r),ae(r,t.x,t.y)}),O(e,`floating`)}function p(e,t){let n=t.waypoints,r,i,a;for(let o=1;o<n.length;o++)r=n[o-1],i=n[o],T(r,i)&&(a=A(e,r,i),L(a,{"data-segment-idx":o}),l(a,`mousemove`,t))}function m(e){re(ke(`.`+oe,e),function(e){I(e)})}function h(e){re(ke(`.`+te,e),function(e){I(e)})}function g(e){if(!S(e))return;let t=u(e);return t||(t=u(e,!0),f(t,e),p(t,e)),t}function _(e){let t=u(e);t&&(h(t),m(t),p(t,e),f(t,e))}function v(e,t){let n=j(`.floating`,e),r=t.point;n&&ae(n,r.x,r.y)}function y(e,t,n){let r=d(t.index,e),i=n[t.index-1],a=n[t.index],o=t.point,s=D(i,a),c=T(i,a),l,u;r&&(l=pn(r),u={x:o.x-s.x,y:o.y-s.y},c===`v`&&(u={x:u.y,y:u.x}),ae(l,u.x,u.y))}e.on(`connection.changed`,function(e){_(e.element)}),e.on(`connection.remove`,function(e){let t=u(e.element);t&&I(t)}),e.on(`element.marker.update`,function(e){if(!S(e.element))return;let t=e.element,n;n=g(t),e.add?R(n).add(e.marker):R(n).remove(e.marker)}),e.on(`element.mousemove`,function(e){if(!S(e.element))return;let n=e.element,r=n.waypoints,i,a;if(r){if(i=u(n,!0),a=Re(t,r,e.originalEvent),!a)return;v(i,a),a.bendpoint||y(i,a,r)}}),e.on(`element.mousedown`,function(e){if(!S(e.element)||!Te(e))return;let t=e.originalEvent,n=e.element;return c(t,n)}),e.on(`selection.changed`,function(e){let t=e.newSelection[0];t&&t.waypoints&&g(t)}),e.on(`element.hover`,function(e){if(!S(e.element))return;let t=e.element;g(t),n.registerEvent(e.gfx,`mousemove`,`element.mousemove`)}),e.on(`element.out`,function(e){S(e.element)&&n.unregisterEvent(e.gfx,`mousemove`,`element.mousemove`)}),e.on(`element.updateId`,function(e){if(!S(e.element))return;let t=e.element,n=e.newId,r=u(t);r&&L(r,{"data-element-id":n})});let b=null;e.on([`bendpoint.move.move`,`bendpoint.move.end`,`connectionSegment.move.move`,`connectionSegment.move.end`],100,function(e){b&&clearTimeout(b),b=setTimeout(function(){a.layoutConnection(e.context.connection),b=null},20)}),this.addHandles=g,this.updateHandles=_,this.getBendpointsContainer=u,this.getSegmentDragger=d}fn.$inject=[`eventBus`,`canvas`,`interactionEvents`,`bendpointMove`,`connectionSegmentMove`,`modeling`];function pn(e){return j(`.djs-visual`,e)}var mn={__init__:[`bendpoints`],bendpoints:[`type`,fn]};function hn(e){let{container:t,additionalModules:n=[Et]}=e,r=[pe,C,w,de,Le,je,He,be,ie,fe,De,xe,P,we,b,Me,Oe,Ie,P,g,_,Ve],i=[ht,Pt,Dt,kt,jt,y,Ft,Rt,rn,sn,ln,dn,mn];return new ce({canvas:{container:t},modules:[...r,...i,...n],defaultRenderer:[`type`,Et]})}var gn={class:`editor-content`},_n={ref:`editor-pn-math`,class:`net-compontents editor-outter-box-shadow`},vn={class:`net`},yn={class:`net-states`},bn={class:`net-header`},xn={class:`net-states`},Sn={class:`net-header`},Cn={class:`net-states`},wn={class:`net-header`},Tn={class:`net-states`},En={class:`net-header`},Dn=p(d({__name:`EditorPN`,setup(d){let p=i(`container`),m=i(`canvas`),h=i(`editor-pn-math`),g=l([]),_=l([]),v=l([]),y=null;function b(e){return e.split(`-`)[0][0]+`_{`+e.split(`-`)[1]+`}`}let x=o(()=>`\\begin{align*} \\{ `+g.value.map(e=>e.label).join(`, `)+` \\}\\end{align*}`),ee=o(()=>{let e=[];return _.value.forEach(t=>{let n=t.silent?`silent`:t.label;e.includes(n)||e.push(n)}),e}),S=o(()=>`\\begin{align*} \\{ `+_.value.map(e=>b(e.id)).join(`, `)+` \\}\\end{align*}`),C=o(()=>`\\begin{align*} \\{ `+_.value.map(e=>{let t=e.silent?`\\tau`:e.label;return b(e.id)+`\\rightarrow`+(e.silent?t:`\\text{'`+t+`'}`)}).join(`, `)+` \\}\\end{align*}`),w=o(()=>`\\begin{align*} \\{`+v.value.map(e=>`(`+b(e.src)+`, `+b(e.tgt)+`)`).join(`, `)+` \\}\\end{align*}`),{typeset:te}=Ke(h,[x,S,C,w]);function ne(e){let t=e.element;t.type===`place`?g.value.push({id:t.id,label:t.labelText||b(t.id),silent:t.silent||!1}):t.type===`transition`?_.value.push({id:t.id,label:t.labelText||b(t.id),silent:t.silent||!1}):t.type===`flow`&&v.value.push({id:t.id,src:t.source.id,tgt:t.target.id})}function T(e){let t=e.elements,n=new Set;t.forEach(e=>{n.add(e.id),(e.type===`place`||e.type===`transition`)&&v.value.filter(t=>t.src===e.id||t.tgt===e.id).forEach(e=>n.add(e.id))}),g.value=g.value.filter(e=>!n.has(e.id)),_.value=_.value.filter(e=>!n.has(e.id)),v.value=v.value.filter(e=>!n.has(e.id))}function E(e){if(e.type!==`transition`)return;let t=_.value.find(t=>t.id===e.id);t&&(t.label=e.labelText,t.silent=e.silent)}function D(e){e.elements?e.elements.forEach(E):E(e.element)}function O(){g.value=[],_.value=[],v.value=[]}function k(){p.value?.classList.toggle(`fullscreen`)}function A(e){let t={places:x,transitions:S,flow:w,labels:C}[e].value;navigator.clipboard.writeText(t)}return n(()=>{y=hn({container:m.value}),y.invoke([`eventBus`,function(e){e.on(`editor.fullscreen.toggle`,50,()=>{k()}),e.on([`formal.create.place`,`formal.create.transition`,`formal.create.flow`],50,e=>{ne(e)}),e.on([`pad.delete`,`elements.delete`],50,e=>{T(e)}),e.on([`element.changed`,`elements.changed`],50,e=>{D(e)}),e.on([`formal.clear`],50,()=>{O()})}]),te()}),t(()=>{y&&(y.destroy(),y=null)}),(t,n)=>(e(),s(`div`,gn,[n[5]||(n[5]=c(`div`,{class:`editor-header`},[c(`h4`,null,[a(` This is an editor to create Petri nets, powered by `),c(`a`,{href:`https://github.com/bpmn-io/diagram-js/tree/develop`,target:`_blank`},` diagram-js `),a(`. `)]),c(`p`,null,[a(` For more information on the formalism and its structure see: `),c(`a`,{href:`/docs/editors/ts/Adam_Banham___petri_nets.pdf`,target:`_blank`},`A Brief Introduction to Petri Nets`),a(`. `)]),c(`p`,null,` Notably, the editor is still a bit fragile and can crash. `)],-1)),c(`div`,{ref_key:`container`,ref:p,class:`editor-canvas-ts-container editor-outter-box-shadow editor-canvas`},[c(`div`,{ref_key:`canvas`,ref:m,class:`editor`,id:`ts-editor`},null,512)],512),c(`div`,_n,[n[4]||(n[4]=c(`h3`,null,` Petri Net Components `,-1)),c(`div`,vn,[c(`div`,yn,[c(`div`,bn,[c(`h4`,null,` Places, or \\(P\\) (`+r(g.value.length)+`)`,1),u(f,{icon:`mdi-content-copy`,rounded:!0,variant:`text`,onClick:n[0]||(n[0]=()=>A(`places`))})]),c(`p`,null,r(x.value),1)]),c(`div`,xn,[c(`div`,Sn,[c(`h4`,null,` Transitions, or \\(T\\) (`+r(_.value.length)+`)`,1),u(f,{icon:`mdi-content-copy`,rounded:!0,variant:`text`,onClick:n[1]||(n[1]=()=>A(`transitions`))})]),c(`p`,null,r(S.value),1)]),c(`div`,Cn,[c(`div`,wn,[c(`h4`,null,` Flows, or \\(F\\) (`+r(v.value.length)+`)`,1),u(f,{icon:`mdi-content-copy`,rounded:!0,variant:`text`,onClick:n[2]||(n[2]=()=>A(`flow`))})]),c(`p`,null,r(w.value),1)]),c(`div`,Tn,[c(`div`,En,[c(`h4`,null,` Labels, or \\(\\lambda\\) (`+r(ee.value.length)+`)`,1),u(f,{icon:`mdi-content-copy`,rounded:!0,variant:`text`,onClick:n[3]||(n[3]=()=>A(`labels`))})]),c(`p`,null,r(C.value),1)])])],512)]))}}),[[`__scopeId`,`data-v-76b63d6f`]]);export{Dn as default};
//# sourceMappingURL=EditorPN-BdZH2lp5.js.map