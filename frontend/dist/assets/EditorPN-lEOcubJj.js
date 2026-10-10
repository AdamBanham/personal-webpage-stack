var pt=Object.defineProperty;var gt=(r,e,t)=>e in r?pt(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var T=(r,e,t)=>gt(r,typeof e!="symbol"?e+"":e,t);import{E as ht,b as W,i as ze,a as A,O as ft,C as mt,r as vt,c as _e,d as ne,e as be,f as Xe,D as yt,B as xt,h as N,j as C,l as L,m as we,n as _t,T as bt,V as wt,u as Et,p as Ee,q as Te,S as qe,R as me,s as Tt,o as It,w as q,x as Ie,W as se,v as O,k as ce,X as Se,Y as St,_ as Pt,$ as le,a0 as Pe,a1 as Q,a2 as Mt,a3 as Me,a4 as Nt,a5 as Ne,a6 as Le,a7 as Lt,a8 as kt,a9 as Ct,y as Dt,U as Rt,z as Ft,A as At,F as $t,G as Bt,L as jt,H as Ot,I as Ut,J as Ht,K as Gt,P as Vt,Z as Yt,N as zt,Q as Xt}from"./RuleProvider-BwAU3sly.js";import{M as qt}from"./index-lb7Qb_Af.js";import{s as B,C as Wt,G as Kt,E as Zt,b as Jt}from"./index-NqkUDmpb.js";import{C as Qt}from"./index-CB9ms7vh.js";import{m as ke,c as Ce,g as De,u as ei}from"./useMathJax-B687j0gO.js";import{d as ti,aw as de,ab as ii,ax as ri,o as ni,c as oi,a as E,b as ee,t as U,E as te,a9 as ie,f as ue,j as Y,_ as ai}from"./app-bSaJObPU.js";function ye(r,e,t,i,o,n,a,c,d,u,g,h,v){this._create=r,this._elementFactory=e,this._lassoTool=t,this._palette=i,this._connect=o,this._registry=n,this._modeling=a,this._canvas=c,this._bus=d,this._textRenderer=u,this._importer=g,this._exporting=h,this._svgExporting=v,i.registerProvider(this),this._bus.on("diagram.init",y=>{setTimeout(()=>{B(c)},100),setTimeout(()=>{B(c)},150)})}ye.$inject=["create","elementFactory","lassoTool","palette","connect","elementRegistry","modeling","canvas","eventBus","textRenderer","importing","exporting","svgExporting"];ye.prototype.getPaletteEntries=function(){var r=this._create,e=this._elementFactory,t=this._lassoTool,i=this._registry,o=this._modeling,n=this._canvas,a=this._bus;this._connect,this._textRenderer;var c=this._importer,d=this._exporting,u=this._svgExporting;return{"lasso-tool":{group:"tools",className:"mdi-lasso mdi",title:"Activate Lasso Tool",action:{click:function(g){t.activateSelection(g)}}},"tool-separator":{group:"tools",separator:!0},"create-place":{group:"create",className:"mdi-circle-outline mdi",title:"Add Place",action:{click:function(g){var h=e.createPlace({x:0,y:0});r.start(g,h)}}},"create-transition":{group:"create",className:"mdi-square-rounded-outline mdi",title:"Add Transition",action:{click:function(g){var h=e.createTransition({x:0,y:0});r.start(g,h)}}},"create-separator":{group:"create",separator:!0},"import-model":{group:"model",className:"mdi-import mdi",title:"Import Model",action:{click:function(g){let h=document.createElement("input");h.type="file",h.accept=".pnml",h.onchange=v=>{Array.from(h.files)[0].text().then(f=>{c.fire("importing.load",{text:f}),setTimeout(()=>{B(n),B(n)},75)})},h.click()}}},"export-model":{group:"model",className:"mdi-export mdi",title:"Export Model",action:{click:function(g){const h=d.fire("exporting.export"),v=new Blob([h],{type:"text/plain"}),y=document.createElement("a");y.href=URL.createObjectURL(v),y.download="petri_net.pnml",y.click(),URL.revokeObjectURL(v),y.remove()}}},"export-svg":{group:"model",className:"mdi-content-save-move-outline mdi",title:"Export SVG",action:{click:function(g){const h=u.fire("exporting.svg.export"),v=new Blob([h],{type:"text/plain"}),y=document.createElement("a");y.href=URL.createObjectURL(v),y.download="petir_net.svg",y.click(),URL.revokeObjectURL(v),y.remove()}}},"model-separator":{group:"model",separator:!0},fitview:{group:"view",className:"mdi-overscan mdi",title:"Fit to Screen",action:{click:function(g){B(n)}}},fullscreen:{group:"view",className:"mdi-fullscreen mdi",title:"Toggle Fullscreen",action:{click:function(g){a.fire("editor.fullscreen.toggle",{}),setTimeout(()=>{B(n),B(n)},75)}}},"view-separator":{group:"view",separator:!0},"clear-model":{group:"clear",className:"mdi-trash-can-outline mdi",title:"clear all elements",action:{click:function(g){var h=i.getAll().filter(v=>!v.id.includes("implicitroot"));h.length>0&&(a.fire("formal.clear",{}),h.forEach(v=>e.releaseIdentifer(v)),o.removeElements(h)),a.fire("local.storage.clear")}}},"reset-model":{group:"clear",className:"mdi-restore mdi",title:"Reset to Default Model",action:{click:function(g){a.fire("local.storage.clear");let h=a.fire("local.storage.find");h&&c.fire("importing.load",{text:h}),setTimeout(()=>{B(n),B(n)},75)}}}}};const j=25,F=60;function H(r){return r.type?r.type==="place":!1}function D(r){return r.type?r.type==="transition":!1}function K(r){return r.type?r.type==="flow":r.id.startsWith("flow")}class We extends ht{constructor(e,t){super(),this._lastStateId=0,this._lastConnectionId=0,this._seen=[],this._bus=e,this._textRenderer=t}logIdentifer(e){this._seen.includes(e)||this._seen.push(e)}releaseIdentifer(e){this._seen.includes(e)&&(this._seen=this._seen.filter(t=>t!==e))}checkIdentifer(e){return!this._seen.includes(e)}getNextPlaceId(){for(var e=`place-${this._lastStateId++}`;!this.checkIdentifer(e);)e=`place-${this._lastStateId++}`;return this.logIdentifer(e),e}getNextTransitionId(){for(var e=`transition-${this._lastStateId++}`;!this.checkIdentifer(e);)e=`transition-${this._lastStateId++}`;return this.logIdentifer(e),e}getNextFlowId(){for(var e=`flow-${this._lastConnectionId++}`;!this.checkIdentifer(e);)e=`flow-${this._lastConnectionId++}`;return this.logIdentifer(e),e}createPlace(e){var t={id:e.id?e.id:this.getNextPlaceId(),type:"place",x:e.x,y:e.y,cx:j,cy:j,width:j*2,height:j*2,r:j};return this._bus.fire("formal.create.place",{element:t}),t}createTransition(e,t=!1){var i={id:e.id?e.id:this.getNextTransitionId(),type:"transition",x:e.x,y:e.y,silent:t,width:t?F/2:F,height:F,labelText:e.labelText?e.labelText:"action"};return this._bus.fire("formal.create.transition",{element:i}),i}createFlow(e){var t={id:e.id?e.id:this.getNextFlowId(),type:"flow",waypoints:e.waypoints||[W(e.source),W(e.target)],source:e.source,target:e.target};return this._bus.fire("formal.create.flow",{element:t}),t}}We.$inject=["eventBus","textRenderer"];function xe(r,e,t,i,o,n,a,c){this._create=r,this._elementFactory=e,this._connect=t,this._modeling=o,this._eventBus=n,this._registry=a,this._select=c,i.registerProvider(this)}xe.$inject=["create","elementFactory","connect","contextPad","modeling","eventBus","elementRegistry","selection"];xe.prototype.getContextPadEntries=function(r){var e=this._connect,t=this._modeling,i=this._elementFactory;this._create,this._registry;var o=this._select,n=this._eventBus;function a(y,f,x){n.fire("pad.delete",{elements:[r]}),t.removeElements([r])}function c(y,f,x){e.start(y,f,x)}function d(y,f,x){t.toggleTransitionType(f)}function u(y,f){var x=f.source,_=f.target,w=[{x:_.x,y:_.y},{x:x.x,y:x.y}];f.source=_,f.target=x,f.waypoints=w,t.removeConnection(f);var P=t.createConnection(_,x,f,x.parent);t.layoutConnection(P),n.fire("elements.changed",{elements:[P,f,_,x]}),o.select(P)}function g(y,f,x=!1){var _=i.createTransition({x:f.x+150,y:f.y+f.height/2},x);i.logIdentifer(_.id),_=t.createShape(_,{x:_.x,y:_.y},f.parent,1);var w={source:f,target:_,waypoints:[{x:f.x,y:f.y},{x:_.x,y:_.y}]},P=i.createFlow(w);i.logIdentifer(P.id);const k=t.connect(f,_,P,f.parent);t.layoutConnection(k),t.moveElements([_,f,k],{x:0,y:0}),n.fire("elements.changed",{elements:[_,f,k]}),o.select(_)}function h(y,f){var x=i.createPlace({x:f.x+150,y:f.y+f.height/2});i.logIdentifer(x.id),x=t.createShape(x,{x:x.x,y:x.y},f.parent,1);var _={source:f,target:x,waypoints:[{x:f.x,y:f.y},{x:x.x,y:x.y}]},w=i.createFlow(_);i.logIdentifer(w.id);const P=t.connect(f,x,w,f.parent);t.layoutConnection(P),t.moveElements([x,f,P],{x:0,y:0}),n.fire("elements.changed",{elements:[x,f,P]}),o.select(x)}var v={};return v.delete={action:{click:a},className:"context-pad-delete",html:'<div class="entry mdi-delete mdi editor-hover"/>',title:"delete",group:"edit"},ze(r)?v:K(r)?(v.flip={action:{click:u},class:"context-pad-flip",html:'<div class="entry mdi mdi-arrow-left-right editor-hover"/>',title:"flip direction",group:"edit"},v):(D(r)&&(v.switch={action:{click:d},class:"context-pad-switch",html:'<div class="entry mdi mdi-toggle-switch mdi editor-hover"/>',title:r.silent?"make visible":"make silent",group:"edit"}),H(r)&&(v["create-trans"]={action:{click:g},class:"context-pad-create-trans",html:'<div class="entry mdi mdi-square-rounded-outline editor-hover"/>',title:"add transition",group:"add"},v["create-sil-trans"]={action:{click:(y,f)=>g(y,f,!0)},class:"context-pad-create-sil-trans",html:'<div class="entry mdi mdi-square-rounded editor-hover"/>',title:"add silent transition",group:"add"}),D(r)&&(v["create-place"]={action:{click:h},class:"context-pad-create-place",html:'<div class="entry mdi mdi-circle-outline editor-hover"/>',title:"add place",group:"add"}),v.connect={action:{click:c,dragstart:c},className:"context-pad-contect",html:'<div class="entry mdi-arrow-right-thick mdi editor-hover"/>',title:"connect",group:"join"},v)};function si(r){return!r||!r.trim()}function Ke(r){return D(r)}function ci(r){return Ke(r)?r.stateLabel||null:ze(r)?r.text||null:r.arcLabel||null}var li=2e3;function Z(r,e,t,i,o,n){this._factory=e,this._canvas=t,this._modeling=o,this._textRenderer=n,this._bus=r,i.registerProvider(this),r.on("element.dblclick",function(c){a(c.element)}),r.on(["autoPlace.start","canvas.viewbox.changing","drag.init","element.mousedown","popupMenu.open","root.set","selection.changed"],function(){i.isActive()&&i.complete()}),r.on(["shape.remove","connection.remove"],li,function(c){i.isActive(c.element)&&i.cancel()}),r.on(["commandStack.changed"],function(c){i.isActive()&&i.cancel()}),r.on("directEditing.activate",function(c){}),r.on("create.end",500,function(c){var d=c.context,u=d.shape,g=c.context.canExecute,h=c.isTouch;h||g&&(d.hints&&d.hints.createElementsBehavior===!1||a(u))}),r.on("autoPlace.end",500,function(c){a(c.shape)});function a(c,d){i.activate(c)}}Z.$inject=["eventBus","elementFactory","canvas","directEditing","modeling","textRenderer"];Z.prototype.activate=function(r){if(D(r)&&!r.silent){var e=ci(r);if(e!==void 0){var t={text:e},i=this.getEditingBBox(r);A(t,i);var o={},n=t.style||{};return A(n,{backgroundColor:"rgba(0,0,0,0.5)",padding:"3px","border-radius":"5px",color:"red",border:null}),A(t,{options:o,style:n}),t}}};Z.prototype.getEditingBBox=function(r){var e=this._canvas,t=r.label||r,i=e.getAbsoluteBBox(t);i.x+i.width/2,i.y+i.height/2;var o={x:i.x,y:i.y},n=e.zoom(),a=this._textRenderer.getDefaultStyle(),c=this._textRenderer.getExternalStyle();c.fontSize*n,c.lineHeight,a.fontSize*n,a.lineHeight;var d=a;return{bounds:o,style:d}};Z.prototype.update=function(r,e,t,i){if(si(e)){e="";return}if(Ke(r)){r.labelText=e,this._bus.fire("elements.changed",{elements:[r]});return}};class Ze extends ft{constructor(e){super(e)}getOrdering(e,t){return K(e)?{index:1,parent:t}:{index:-1,parent:t}}}Ze.$inject=["eventBus"];var Je=Math.sqrt,Qe=Math.min,di=Math.max,Re=Math.abs;function Fe(r){return Math.pow(r,2)}var oe=.1;class et extends mt{constructor(e,t,i,o){super(e);var n=this;this.postExecute(["connection.layout","connection.updateWaypoints"],function(a){var c=a.context,d=c.hints||{};if(d.labelBehavior!==!1){var u=c.connection,g=u.label,h;!g||!g.parent||(h=n.getVisibleLabelAdjustment(a),t.moveShape(g,h))}})}getVisibleLabelAdjustment(e){var t=e.context,i=t.connection,o=i.label,n=A({},t.hints),a=t.newWaypoints||i.waypoints,c=t.oldWaypoints;return typeof n.startChanged>"u"&&(n.startChanged=!!n.connectionStart),typeof n.endChanged>"u"&&(n.endChanged=!!n.connectionEnd),this.getLabelAdjustment(o,a,c,n)}getLabelAdjustment(e,t,i,o){var n=W(e);return this.getAnchorPointAdjustment(n,t,i,o).delta}findNewLineStartIndex(e,t,i,o){var n=i.segmentIndex,a=t.length-e.length;if(o.segmentMove){var c=o.segmentMove.segmentStartIndex,d=o.segmentMove.newSegmentStartIndex;return n===c?d:n>=d?n+a<d?d:n+a:n}if(o.bendpointMove){var u=o.bendpointMove.insert,g=o.bendpointMove.bendpointIndex,h;if(a===0)return n;if(n>=g&&(h=u?n+1:n-1),n<g&&(h=n,u&&i.type!=="bendpoint"&&g-1===n)){var v=ve(t,g);v<i.relativeLocation&&h++}return h}return a===0?n:o.connectionStart&&n===0?0:o.connectionEnd&&n===e.length-2?t.length-2:Math.floor((t.length-2)/2)}getAnchorPointAdjustment(e,t,i,o){var n=0,a=0,c={point:e,delta:{x:0,y:0}},d=vi(e,i),u=d.segmentIndex,g=fi(i,t,d,o);if(g<0||g>t.length-2||g===null)return c;var h=Ae(i,u),v=Ae(t,g),y=d.position,f=ui(h,y),x=pi(h,v);if(d.type==="bendpoint"){var _=t.length-i.length,w=d.bendpointIndex,P=i[w];if(t.indexOf(P)!==-1)return c;if(_===0){var k=t[w];return n=k.x-d.position.x,a=k.y-d.position.y,{delta:{x:n,y:a},point:{x:e.x+n,y:e.y+a}}}_<0&&w!==0&&w<i.length-1&&(f=ve(i,w))}var R={x:(v[1].x-v[0].x)*f+v[0].x,y:(v[1].y-v[0].y)*f+v[0].y},p=vt({x:e.x-y.x,y:e.y-y.y},x);return n=R.x+p.x-e.x,a=R.y+p.y-e.y,{point:_e(R),delta:_e({x:n,y:a})}}}function ui(r,e){var t=ne(r[0],r[1]),i=ne(r[0],e);return t===0?0:i/t}function pi(r,e){var t=be(r),i=be(e);return i-t}function ve(r,e){var t=ne(r[e-1],r[e]),i=ne(r[e],r[e+1]),o=t/(t+i);return o}function Ae(r,e){return[r[e],r[e+1]]}function z(r,e){return Je(Fe(r.x-e.x)+Fe(r.y-e.y))}function $e(r,e){return Re(r.x-e.x)<=oe&&Re(r.y-e.y)<=oe}function gi(r,e,t){return Be(r.x,e.x,t.x)&&Be(r.y,e.y,t.y)}function Be(r,e,t){return r>=Qe(e,t)-oe&&r<=di(e,t)+oe}function hi(r,e){return{x:(r.x+e.x)/2,y:(r.y+e.y)/2}}function fi(r,e,t,i){var o=t.segmentIndex,n=e.length-r.length;if(i.segmentMove){var a=i.segmentMove.segmentStartIndex,c=i.segmentMove.newSegmentStartIndex;return o===a?c:o>=c?o+n<c?c:o+n:o}if(i.bendpointMove){var d=i.bendpointMove.insert,u=i.bendpointMove.bendpointIndex,g;if(n===0)return o;if(o>=u&&(g=d?o+1:o-1),o<u&&(g=o,d&&t.type!=="bendpoint"&&u-1===o)){var h=ve(e,u);h<t.relativeLocation&&g++}return g}return n===0?o:i.connectionStart&&o===0?0:i.connectionEnd&&o===r.length-2?e.length-2:Math.floor((e.length-2)/2)}function mi(r,e,t,i){var o=e.x-r.x,n=e.y-r.y,a=t.x-r.x,c=t.y-r.y,d=o*o+n*n,u=o*a+n*c,g=a*a+c*c-i*i,h=u/d,v=g/d,y=h*h-v;if(y<0&&y>-1e-6&&(y=0),y<0)return[];var f=Je(y),x=-h+f,_=-h-f,w={x:r.x-o*x,y:r.y-n*x};if(y===0)return[w];var P={x:r.x-o*_,y:r.y-n*_};return[w,P].filter(function(k){return gi(k,r,e)})}function vi(r,e){var t=0,i,o,n,a,c,d,u,g,h,v,y;for(t=0;t<e.length-1;t++){if(i=e[t],o=e[t+1],$e(i,o)?u=[i]:(n=z(r,i),a=z(r,o),d=Qe(n,a),u=mi(i,o,r,d)),u.length<1)throw new Error("expected between [1, 2] circle -> line intersections");u.length===1&&(g={type:"bendpoint",position:u[0],segmentIndex:t,bendpointIndex:$e(i,u[0])?t:t+1}),u.length===2&&(c=hi(u[0],u[1]),g={type:"segment",position:c,segmentIndex:t,relativeLocation:z(i,c)/z(i,o)}),h=z(g.position,r),(!y||v>h)&&(y=g,v=h)}return y}et.$inject=["eventBus","modeling","elementFactory","textRenderer"];const yi={__depends__:[Xe,yt],__init__:["examplePaletteProvider","contextPadProvider","labelEditingProvider","orderingProvidier","labelBehaviour"],examplePaletteProvider:["type",ye],contextPadProvider:["type",xe],labelEditingProvider:["type",Z],orderingProvidier:["type",Ze],labelBehaviour:["type",et]};var xi=1500;const pe="#01031b",_i="#ebdf3f",bi={fontFamily:"sans-serif",fontSize:16,fontWeight:"normal",textLength:F-10,textAnchor:"middle",dominantBaseline:"middle"},je={fontFamily:"sans-serif",fontSize:10,fontWeight:"normal",textAnchor:"middle",dominantBaseline:"middle"};class tt extends xt{constructor(e,t,i,o){super(e,1);var n=this;this._textRender=o;var a=xi;e.on(["render.shape"],a,function(d,u){d.type;var g=u.element,h=u.gfx,v=u.attrs;if(n.canRender(g))return n.drawShape(h,g,v)}),e.on(["render.connection"],a-50,function(d,u){d.type;var g=u.element,h=u.gfx,v=u.attrs;if(n.canRender(g))return n.drawConnection(h,g,v)}),this.CONNECTION_STYLE=t.style({strokeWidth:3,stroke:"#222222",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"}),this.PLACE_STYLE=t.style({fill:"#f5f5f5",stroke:"#222222",strokeWidth:2}),this.TRANSITION_STYLE=t.style({fill:"#eea159",stroke:"#222222",strokeWidth:2}),this.SILENT_TRANSITION_STYLE=t.style({fill:"#404040",stroke:"#222222",strokeWidth:2});var c=N("defs",{});this._setupMarkers(c),C(i.getActiveLayer(),c)}_setupMarkers(e){var t=N("marker",{id:"src-place-arrow",viewbox:"0 0 5 5",refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:"auto-start-reverse",stroke:"#222222",fill:"#222222"}),i=N("marker",{id:"src-trans-arrow",viewbox:"0 0 5 5",refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:"auto-start-reverse",stroke:"#222222",fill:"#222222"}),o=N("marker",{id:"src-silent-trans-arrow",viewbox:"0 0 5 5",refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:"auto-start-reverse",stroke:"#222222",fill:"#222222"}),n=N("marker",{id:"connect-hover-arrow",viewbox:"0 0 5 5",refX:2.5,refY:2.5,markerWidth:5,markerHeight:5,strokeWidth:0,orient:"auto-start-reverse",stroke:"#5671e7",fill:"#5671e7"}),a=N("path",{d:"M 0 0 L 5 2.5 L 0 5 z"});C(t,a),a=N("path",{d:"M 0 0 L 5 2.5 L 0 5 z"}),C(i,a),a=N("path",{d:"M 0 0 L 5 2.5 L 0 5 z"}),C(o,a),a=N("path",{d:"M 0 0 L 5 2.5 L 0 5 z"}),C(n,a),C(e,t),C(e,i),C(e,o),C(e,n)}canRender(e){return!0}trimId(e){return e.split("-")[0][0]+e.split("-")[1]}drawShape(e,t,i){var o=[],n=N("g",{});if(H(t)){var a=this.createCircleForState(t,this.PLACE_STYLE);o.push(this.createShadowForState(a)),o.push(a),o.push(this.drawShapeId(t))}else if(D(t)){var c=this.drawTransition(t,this.TRANSITION_STYLE);o.push(this.drawTransitionShadow(c)),o.push(c);let u=this.drawTransitionLabel(t);u&&o.push(u),o.push(this.drawTransitionId(t))}else K(t)&&o.push(this._drawSimpleConnection(e,t,i));for(var d of o)C(n,d);return C(e,n),n}createCircleForState(e,t){var i=N("circle",t||{});return L(i,{cx:e.cx,cy:e.cy,r:e.r,fill:i.fill}),e.selected&&L(i,{fill:_i}),i}createShadowForState(e){var t=we(e);return L(t,{opacity:.25,cx:parseFloat(e.attributes.cx.nodeValue)+j*.1,cy:parseFloat(e.attributes.cy.nodeValue)+j*.1}),t}drawTransitionId(e){var t=N("text",A({opacity:.75,x:-1*e.width*.1,y:e.height*1.1,fill:pe},je));return t.textContent=this.trimId(e.id),t}drawShapeId(e){var t=N("text",A({opacity:.75,x:-1*j*.05,y:j*2,fill:pe},je));return t.textContent=this.trimId(e.id),t}drawTransition(e,t){var i=N("rect",t||{});return L(i,{x:0,y:0}),e.silent?(L(i,{width:e.width,height:e.height,rx:10}),L(i,this.SILENT_TRANSITION_STYLE)):L(i,{width:e.width,height:e.height,rx:10}),i}drawTransitionLabel(e){if(e.silent)return null;var t=N("text",A({x:e.silent?F/-3:F/2,y:e.silent?e.height:F/2,fill:pe},bi));return e.labelText.length>0&&!e.silent?t.textContent=e.labelText:(t.textContent="t"+e.id.split("-")[1],L(t,{textLength:0})),t}drawTransitionShadow(e){var t=we(e);return L(t,{opacity:.25,x:parseFloat(e.attributes.x.nodeValue)+F*.05,y:parseFloat(e.attributes.y.nodeValue)+F*.05}),t}_drawSimpleConnection(e,t,i){if(!t.waypoints||t.waypoints.length<2)return e;Array.from(t.waypoints);var o=_t(t.waypoints,A({},this.CONNECTION_STYLE),5);return t.target?H(t.target)?L(o,{"marker-end":"url(#src-place-arrow)"}):D(t.target)&&(t.target.silent?L(o,{"marker-end":"url(#src-silent-trans-arrow"}):L(o,{"marker-end":"url(#src-trans-arrow)"})):L(o,{"marker-end":"url(#connect-hover-arrow)"}),C(e,o),e}drawConnection(e,t,i){return this._drawSimpleConnection(e,t,i)}}tt.$inject=["eventBus","styles","canvas","textRenderer"];var wi=12,Ei=1.2;const Ti="#01031b";var Ii=30;function it(r){var e=A({fontFamily:"Arial, sans-serif",fontSize:wi,fontWeight:"normal",color:Ti,background:"rgba(0,0,0,0.5)",lineHeight:Ei},r&&r.defaultStyle||{}),t=parseInt(e.fontSize,10)-1,i=A({},e,{fontSize:t},r&&r.externalStyle||{}),o=new bt({style:e});this.getExternalLabelBounds=function(n,a){var c=o.getDimensions(a,{box:{width:90,height:30},style:i});return{x:Math.round(n.x+n.width/2-c.width/2),y:Math.round(n.y),width:Math.ceil(c.width),height:Math.ceil(c.height)}},this.getTextAnnotationBounds=function(n,a){var c=o.getDimensions(a,{box:n,style:e,align:"left-top",padding:5});return{x:n.x,y:n.y,width:n.width,height:Math.max(Ii,Math.round(c.height))}},this.createText=function(n,a){return o.createText(n,a||{})},this.getDefaultStyle=function(){return e},this.getExternalStyle=function(){return i}}it.$inject=["config.textRenderer"];const Oe={__init__:["petriRenderer"],petriRenderer:["type",tt],textRenderer:["type",it]},Si={__init__:["elementFactory"],elementFactory:["type",We]};class rt extends wt{constructor(e,t,i){super(e,t,i)}getHandlers(){var e=super.getHandlers();return e}toggleTransitionType(e){if(D(e)){e.silent?e.width=F:e.width=F/2,e.silent=!e.silent;var t={elements:[e].concat(e.incoming).concat(e.outgoing)};this._eventBus.fire("elements.changed",t),this.moveElements(t.elements,{x:0,y:0})}}removeElements(e){return this._eventBus.fire("elements.delete",{elements:e}),super.removeElements(e)}}rt.$inject=["eventBus","elementFactory","commandStack"];const Pi={__init__:["modeling"],modeling:["type",rt]};class nt extends Et{constructor(e,t,i){super(e),this.init()}init(){this.addRule("element.copy",e=>!0),this.addRule("connection.create",this.connectionCreate.bind(this))}connectionCreate(e){return H(e.source)&&D(e.target)?!0:!!(D(e.source)&&H(e.target))}}T(nt,"$inject",["eventBus","modeling","selection"]);const Mi={__init__:["petriNetRules"],petriNetRules:["type",nt]};function ot(r,e,t,i,o){this._factory=o;function n(c,d){return i.allowed("connection.create",{source:c,target:d})}function a(c,d){return n(d,c)}r.on("connect.hover",function(c){var d=c.context,u=d.start,g=c.hover,h;if(d.hover=g,h=d.canExecute=n(u,g),!Ee(h)){if(h!==!1){d.source=u,d.target=g;return}h=d.canExecute=a(u,g),!Ee(h)&&h!==!1&&(d.source=g,d.target=u)}}),r.on(["connect.out","connect.cleanup"],function(c){var d=c.context;d.hover=null,d.source=null,d.target=null,d.canExecute=!1}),r.on("connect.end",function(c){var d=c.context,u=d.canExecute,g=d.connectionStart,h={x:c.x,y:c.y},v=d.source,y=d.target;if(!u)return!1;d.id;var f={connectionStart:Ue(d)?h:g,connectionEnd:Ue(d)?g:h};Te(u);var x=o.createFlow({source:v,target:y});d.connection=t.connect(v,y,x,f),t.layoutConnection(d.connection),r.fire("elements.changed",{elements:[v,y,d.connection]})}),this.start=function(c,d,u,g){Te(u)||(g=u,u=W(d)),e.init(c,"connect",{autoActivate:g,data:{shape:d,type:"flow",context:{start:d,type:"flow",connectionStart:u,id:this._factory.getNextFlowId()}}})}}ot.$inject=["eventBus","dragging","modeling","rules","elementFactory"];function Ue(r){var e=r.hover,t=r.source,i=r.target;return e&&t&&e===t&&t!==i}const Ni={__depends__:[qe,me,Tt],__init__:["connect"],connect:["type",ot]},re=20;class Li extends It{constructor(){super()}makePoint(e){return W(e)}layoutConnection(e,t){let i=e.source,o=e.target,n=e.waypoints||[];if(!i||!o)return super.layoutConnection(e,t);var a=n.slice(1,-1);let c=ke(i),d=ke(o);for(let f of[c,d])f.x-=re/2,f.y-=re/2,f.width+=re,f.height+=re;let u,g;n.length<=2?(u=n[0],g=n[n.length-1]):(u=a[0],g=a[a.length-1]),Ce(u,c)&&(u=this.makePoint(n[1])),Ce(g,d)&&(g=this.makePoint(n[n.length-2]));let h=De(u,c).vertex,v=De(g,d).vertex;return[h,...a,v]}}const ki={__init__:["layouter"],layouter:["type",Li]},He={"<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;","&":"&amp;"};class at{constructor(e,t,i,o,n){T(this,"_modeling");T(this,"_factory");T(this,"_canvas");T(this,"_registry");T(this,"_bus");this._modeling=e,this._factory=t,this._canvas=i,this._registry=o,this._bus=n,this._bus.on("importing.load",this.load.bind(this))}fire(e,t){return this._bus.fire(e,t)}load(e){if(e.text===void 0)throw new Error("No text provided to load");var t=new DOMParser,i=t.parseFromString(this.decode(e.text),"application/xml");if(i.getElementsByTagName("parsererror").length>0)throw new Error("Failed to parse XML ::"+i.getElementsByTagName("parsererror")[0].textContent.trim());this.import(i)}decode(e){var t=e;for(const i in He)t=t.replace(He[i],i);return t}import(e){try{this._import(e)}catch(t){throw alert("Failed to parse and load in system :: "+t),t}}_import(e){var t=this._registry.getAll().filter(s=>!s.id.includes("implicitroot"));t.length>0&&(this._bus.fire("formal.clear",{}),t.forEach(s=>this._factory.releaseIdentifer(s)),this._modeling.removeElements(t));var i={},o=e.getElementsByTagName("place");for(var n of o){var a=n.attributes,c=n.getElementsByTagName("graphics")[0].getElementsByTagName("position")[0],d={id:a.id.value,x:parseInt(c.attributes.x.value),y:parseInt(c.attributes.y.value)},u=this._factory.createPlace(d);this._factory.logIdentifer(u.id);const s=this._modeling.createShape(u,{x:u.x+u.width/2,y:u.y+u.height/2},this._canvas.getRootElement(),1);i[s.id]=s}var g=e.getElementsByTagName("transition");for(var h of g){var a=h.attributes,c=h.getElementsByTagName("graphics")[0].getElementsByTagName("position")[0],v=this.decode(h.getElementsByTagName("name")[0].textContent).trim(),d={id:a.id.value,x:parseInt(c.attributes.x.value),y:parseInt(c.attributes.y.value),labelText:v},u=this._factory.createTransition(d,a.invisible.value=="true");this._factory.logIdentifer(u.id);const S=this._modeling.createShape(u,{x:u.x+u.width/2,y:u.y+u.height/2},this._canvas.getRootElement(),1);i[S.id]=S}var y=e.getElementsByTagName("arc");for(var f of y){var a=f.attributes,x=i[a.source.value],_=i[a.target.value];if(f.getElementsByTagName("graphics").length>0){var w=[],P=f.getElementsByTagName("graphics")[0].getElementsByTagName("position");for(var c of P)w.push({x:parseInt(c.attributes.x.value),y:parseInt(c.attributes.y.value)});w=w.map(S=>({x:S.x,y:S.y}))}else var w=[{x:x.x,y:x.y},{x:_.x,y:_.y}];var d={id:a.id.value,source:x,target:_,waypoints:w},u=this._factory.createFlow(d);this._factory.logIdentifer(u.id);const I=this._modeling.createConnection(x,_,u,this._canvas.getRootElement());this._modeling.layoutConnection(I),i[u.id]=I}var k=this._bus,R=this._modeling,p=1;for(var l in i){const s=i[l];setTimeout(()=>{R.moveShape(s,{x:.01,y:.01},!1,{recurse:!1,layout:!0}),k.fire("element.changed",{element:s}),k.fire("elements.changed",{elements:[s]})},p),p+=1}}}T(at,"$inject",["modeling","elementFactory","canvas","elementRegistry","eventBus"]);const Ci={__init__:["importing"],importing:["type",at]},M=[];for(let r=0;r<256;++r)M.push((r+256).toString(16).slice(1));function Di(r,e=0){return(M[r[e+0]]+M[r[e+1]]+M[r[e+2]]+M[r[e+3]]+"-"+M[r[e+4]]+M[r[e+5]]+"-"+M[r[e+6]]+M[r[e+7]]+"-"+M[r[e+8]]+M[r[e+9]]+"-"+M[r[e+10]]+M[r[e+11]]+M[r[e+12]]+M[r[e+13]]+M[r[e+14]]+M[r[e+15]]).toLowerCase()}let ge;const Ri=new Uint8Array(16);function Fi(){if(!ge){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");ge=crypto.getRandomValues.bind(crypto)}return ge(Ri)}const Ai=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ge={randomUUID:Ai};function he(r,e,t){if(Ge.randomUUID&&!r)return Ge.randomUUID();r=r||{};const i=r.random??r.rng?.()??Fi();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Di(i)}function ae(r,...e){return(...t)=>{const i=t[t.length-1]||{},o=[r[0]];return e.forEach((n,a)=>{const c=Number.isInteger(n)?t[n]:i[n];o.push(c,r[a+1])}),o.join("")}}const $i="http://www.pnml.org/version-2009/grammar/pnmlcoremodel",Bi=`<?xml version="1.0" encoding="UTF-8"?>
<pnml>
<net type="${$i}" id="Generated by Petri Net Editor">
    <name>
        <text>Generated by Petri Net Editor</text>
    </name>
    <page id="page-1">
`,ji=`   </page>
</net>
</pnml>
`,Oi=ae`       <place id="${"id"}">
            <name>
                <text>${"name"}</text>
            </name>
            <graphics>
                <position x="${"x"}" y="${"y"}"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="${"UUID"}" />
`,Ui=`       </place>
`,Hi=ae`       <transition id="${"id"}" invisible="${"silent"}">
            <name>
                <text>${"name"}</text>
            </name>
            <graphics>
                <position x="${"x"}" y="${"y"}"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="${"UUID"}" activity="${"activity"}"/>
`,Gi=`       </transition>
`,Vi=ae`       <arc id="${"id"}" source="${"src"}" target="${"tgt"}">
            <toolspecific tool="ProM" version="6.4" localNodeID="${"UUID"}" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
`,Yi=ae`                <position x="${"x"}" y="${"y"}"/>
`,zi=`           </graphics>       
        </arc>
`,Ve={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"};class st{constructor(e,t){T(this,"_bus");T(this,"_registry");T(this,"_xml");this._bus=e,this._registry=t,this._xml="",this._bus.on("exporting.export",this.export.bind(this))}fire(e){return this._bus.fire(e)}encode(e){var t=e;for(const i in Ve)t=t.replace(i,Ve[i]);return t}export(){this._xml=this.createHead();var e=this,t=H,i=this._registry.filter(t),o=function(n,a){return e.serialise(e,n,a)};i.forEach(o),t=D,i=this._registry.filter(t);var o=function(n,a){return e.serialise(e,n,a)};i.forEach(o),t=K,i=this._registry.filter(t);var o=function(n,a){return e.serialise(e,n,a)};return i.forEach(o),this._xml+this.createTail()}createHead(){return Bi}serialise(e,t,i){H(t)?e._xml+=e._serialisePlace(e,t,i):D(t)?e._xml+=e._serialiseTransition(e,t,i):K(t)?e._xml+=e._serialiseFlow(e,t,i):console.error(`Unknown element type: ${t.type}`)}_serialisePlace(e,t,i){var o=he(),n=""+Oi({id:t.id,name:t.id,x:parseInt(t.x),y:parseInt(t.y),UUID:o});return n+Ui}_serialiseTransition(e,t,i){var o=he(),n=""+Hi({id:t.id,name:t.labelText,silent:t.silent,x:parseInt(t.x),y:parseInt(t.y),activity:t.silent?"$invisible$":"",UUID:o});return n+Gi}_serialiseFlow(e,t,i){var o=he(),n=""+Vi({id:t.id,src:t.source.id,tgt:t.target.id,UUID:o});for(var a of t.waypoints)n+=Yi({x:parseInt(a.x),y:parseInt(a.y)});return n+zi}createTail(){return ji}}T(st,"$inject",["eventBus","elementRegistry"]);class ct{constructor(e,t){T(this,"_bus");T(this,"_canvas");this._bus=e,this._canvas=t,this._bus.on("exporting.svg.export",this.export.bind(this))}fire(e){return this._bus.fire(e)}export(){var e;try{const t=this._canvas.getActiveLayer(),i=q(":scope > defs",this._canvas._svg),o=Ie(t),n=i?"<defs>"+Ie(i)+"</defs>":"",a=t.getBBox();e=`<?xml version="1.0" encoding="utf-8"?>
<!-- created with the help of adam banham / http://adambanham.io -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="`+a.width+'" height="'+a.height+'" viewBox="'+a.x+" "+a.y+" "+a.width+" "+a.height+'" version="1.1">'+n+o+"</svg>"}catch(t){return alert("Unable to serialise svg :: "+t),null}return e}}T(ct,"$inject",["eventBus","canvas"]);const Xi={__init__:["exporting","svgExporting"],exporting:["type",st],svgExporting:["type",ct]},Ye=`<?xml version="1.0" encoding="UTF-8"?>
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
`,X="petriNetDocument";var fe;let qi=(fe=class{constructor(e,t){T(this,"_bus");T(this,"_importing");this._bus=e,this._importing=t,this._bus.on("diagram.init",()=>{setTimeout(()=>{const i=this.find();i?this._importing.fire("importing.load",{text:i}):console.log("No document found in local storage, starting fresh.")},100)}),this._bus.on("local.storage.set",this.set.bind(this)),this._bus.on("local.storage.get",this.get.bind(this)),this._bus.on("local.storage.clear",this.clear.bind(this)),this._bus.on("local.storage.find",this.find.bind(this))}fire(e,t){this._bus.fire(e,t)}find(){try{const e=localStorage.getItem(X);return e||(this.set({content:Ye}),Ye)}catch(e){console.error("Failed to retrieve document from local storage:",e)}return null}get(){try{return localStorage.getItem(X)}catch(e){return console.error(`Failed to get item from local storage with key ${X}:`,e),null}}clear(){localStorage.removeItem(X)}set(e){if(e.content)try{localStorage.setItem(X,e.content)}catch(t){console.error("Failed to save document to local storage:",t)}else throw new Error("Invalid context for local storage set event")}},T(fe,"$inject",["eventBus","importing"]),fe);const Wi={__init__:["localSessionStorage"],localSessionStorage:["type",qi]};class lt{constructor(e,t,i){T(this,"_bus");T(this,"_exporting");T(this,"_local");this._bus=e,this._exporting=t,this._local=i,this._bus.on("elements.changed",250,this.reflect.bind(this))}reflect(e){let t=this._exporting.fire("exporting.export");this._local.fire("local.storage.set",{content:t})}}T(lt,"$inject",["eventBus","exporting","localSessionStorage"]);const Ki={__init__:["cacheReflection"],cacheReflection:["type",lt]};class dt extends Wt{constructor(t,i,o,n,a,c,d,u){super(t,i,o,n,a,c,d,u);T(this,"_elementFactory");this._elementFactory=n,a.on("copyPaste.copyElement",750,this.copyElementData.bind(this))}createShape(t){var i=Object.assign({},t);console.log("createShape",i);var o;return H(t)?(i.id=this._elementFactory.getNextPlaceId(),o=this._elementFactory.createPlace(i)):D(t)?(i.id=this._elementFactory.getNextTransitionId(),o=this._elementFactory.createTransition(i,i.silent)):(i.id=this._elementFactory.getNextFlowId(),o=this._elementFactory.createFlow(i)),o}copyElementData(t){let i=t.descriptor,o=t.element;i.type=o.type,D(o)&&(i.silent=o.silent,i.labelText=o.labelText)}}T(dt,"$inject",["canvas","create","clipboard","elementFactory","eventBus","modeling","mouse","rules"]);const Zi={__init__:["copyPaste"],copyPaste:["type",dt]};function ut(r,e,t,i,o,n){function a(p,l,s){var m=p.index,b=p.point,I,S,G,J,V,$;return m<=0||p.bendpoint?!1:(I=l[m-1],S=l[m],G=Pe(I,S),J=Q(I,S),V=Math.abs(b.x-G.x),$=Math.abs(b.y-G.y),J&&V<=s&&$<=s)}function c(p,l){var s=p.waypoints,m,b,I,S;return l.index<=0||l.bendpoint||(m={start:s[l.index-1],end:s[l.index]},b=Q(m.start,m.end),!b)?null:(b==="h"?I=m.end.x-m.start.x:I=m.end.y-m.start.y,S=Ct(I)/2,S)}function d(p,l){var s=l.waypoints,m=Se(e,s,p),b;if(m)return b=c(l,m),a(m,s,b)?o.start(p,l,m.index):i.start(p,l,m.index,!m.bendpoint),!0}function u(p,l,s){O(s)&&Mt.bind(p,l,function(m){t.triggerMouseEvent(l,m,s),m.stopPropagation()})}function g(p,l){var s=e.getLayer("overlays"),m=q('.djs-bendpoints[data-element-id="'+Pt(p.id)+'"]',s);return!m&&l&&(m=N("g"),L(m,{"data-element-id":p.id}),ce(m).add("djs-bendpoints"),C(s,m),u(m,"mousedown",p),u(m,"click",p),u(m,"dblclick",p)),m}function h(p,l){return q('.djs-segment-dragger[data-segment-idx="'+p+'"]',l)}function v(p,l){l.waypoints.forEach(function(s,m){var b=Me(p);C(p,b),le(b,s.x,s.y)}),Me(p,"floating")}function y(p,l){for(var s=l.waypoints,m,b,I,S=1;S<s.length;S++)m=s[S-1],b=s[S],Q(m,b)&&(I=Nt(p,m,b),L(I,{"data-segment-idx":S}),u(I,"mousemove",l))}function f(p){Ne(Le("."+kt,p),function(l){se(l)})}function x(p){Ne(Le("."+Lt,p),function(l){se(l)})}function _(p){if(O(p)){var l=g(p);return l||(l=g(p,!0),v(l,p),y(l,p)),l}}function w(p){var l=g(p);l&&(x(l),f(l),y(l,p),v(l,p))}function P(p,l){var s=q(".floating",p),m=l.point;s&&le(s,m.x,m.y)}function k(p,l,s){var m=h(l.index,p),b=s[l.index-1],I=s[l.index],S=l.point,G=Pe(b,I),J=Q(b,I),V,$;m&&(V=Ji(m),$={x:S.x-G.x,y:S.y-G.y},J==="v"&&($={x:$.y,y:$.x}),le(V,$.x,$.y))}r.on("connection.changed",function(p){w(p.element)}),r.on("connection.remove",function(p){var l=g(p.element);l&&se(l)}),r.on("element.marker.update",function(p){if(O(p.element)){var l=p.element,s;s=_(l),p.add?ce(s).add(p.marker):ce(s).remove(p.marker)}}),r.on("element.mousemove",function(p){if(O(p.element)){var l=p.element,s=l.waypoints,m,b;if(s){if(m=g(l,!0),b=Se(e,s,p.originalEvent),!b)return;P(m,b),b.bendpoint||k(m,b,s)}}}),r.on("element.mousedown",function(p){if(O(p.element)&&St(p)){var l=p.originalEvent,s=p.element;return d(l,s)}}),r.on("selection.changed",function(p){var l=p.newSelection,s=l[0];s&&s.waypoints&&_(s)}),r.on("element.hover",function(p){if(O(p.element)){var l=p.element;_(l),t.registerEvent(p.gfx,"mousemove","element.mousemove")}}),r.on("element.out",function(p){O(p.element)&&t.unregisterEvent(p.gfx,"mousemove","element.mousemove")}),r.on("element.updateId",function(p){if(O(p.element)){var l=p.element,s=p.newId,m=g(l);m&&L(m,{"data-element-id":s})}});var R=null;r.on(["bendpoint.move.move","bendpoint.move.end","connectionSegment.move.move","connectionSegment.move.end"],100,function(p){R&&clearTimeout(R),R=setTimeout(function(){n.layoutConnection(p.context.connection),R=null},20)}),this.addHandles=_,this.updateHandles=w,this.getBendpointsContainer=g,this.getSegmentDragger=h}ut.$inject=["eventBus","canvas","interactionEvents","bendpointMove","connectionSegmentMove","modeling"];function Ji(r){return q(".djs-visual",r)}const Qi={__init__:["bendpoints"],bendpoints:["type",ut]};function er(r){const{container:e,additionalModules:t=[Oe]}=r,i=[Rt,Ft,At,$t,Bt,jt,qt,Ot,Ut,Ht,Gt,Vt,me,qe,Yt,zt,Xt,Xe,me,Kt,Zt,Qt],o=[yi,Ni,Si,Pi,Mi,Jt,ki,Ci,Xi,Wi,Ki,Zi,Qi];var n=new Dt({canvas:{container:e},modules:[...i,...o,...t],defaultRenderer:["type",Oe]});return n}const tr={class:"editor-content"},ir={ref:"editor-pn-math",class:"net-compontents editor-outter-box-shadow"},rr={class:"net"},nr={class:"net-states"},or={class:"net-header"},ar={class:"net-states"},sr={class:"net-header"},cr={class:"net-states"},lr={class:"net-header"},dr={class:"net-states"},ur={class:"net-header"},pr=ti({__name:"EditorPN",setup(r){const e=de("container"),t=de("canvas"),i=de("editor-pn-math"),o=ue([]),n=ue([]),a=ue([]);let c=null;function d(l){return l.split("-")[0][0]+"_{"+l.split("-")[1]+"}"}const u=Y(()=>"\\begin{align*} \\{ "+o.value.map(s=>s.label).join(", ")+" \\}\\end{align*}"),g=Y(()=>{const l=[];return n.value.forEach(s=>{const m=s.silent?"silent":s.label;l.includes(m)||l.push(m)}),l}),h=Y(()=>"\\begin{align*} \\{ "+n.value.map(s=>d(s.id)).join(", ")+" \\}\\end{align*}"),v=Y(()=>"\\begin{align*} \\{ "+n.value.map(s=>{const m=s.silent?"\\tau":s.label;return d(s.id)+"\\rightarrow"+(s.silent?m:"\\text{'"+m+"'}")}).join(", ")+" \\}\\end{align*}"),y=Y(()=>"\\begin{align*} \\{"+a.value.map(s=>"("+d(s.src)+", "+d(s.tgt)+")").join(", ")+" \\}\\end{align*}"),{typeset:f}=ei(i,[u,h,v,y]);function x(l){const s=l.element;s.type==="place"?o.value.push({id:s.id,label:s.labelText||d(s.id),silent:s.silent||!1}):s.type==="transition"?n.value.push({id:s.id,label:s.labelText||d(s.id),silent:s.silent||!1}):s.type==="flow"&&a.value.push({id:s.id,src:s.source.id,tgt:s.target.id})}function _(l){const s=l.elements,m=new Set;s.forEach(b=>{m.add(b.id),(b.type==="place"||b.type==="transition")&&a.value.filter(I=>I.src===b.id||I.tgt===b.id).forEach(I=>m.add(I.id))}),o.value=o.value.filter(b=>!m.has(b.id)),n.value=n.value.filter(b=>!m.has(b.id)),a.value=a.value.filter(b=>!m.has(b.id))}function w(l){if(l.type!=="transition")return;const s=n.value.find(m=>m.id===l.id);s&&(s.label=l.labelText,s.silent=l.silent)}function P(l){l.elements?l.elements.forEach(w):w(l.element)}function k(){o.value=[],n.value=[],a.value=[]}function R(){e.value?.classList.toggle("fullscreen")}function p(l){const s={places:u,transitions:h,flow:y,labels:v}[l].value;navigator.clipboard.writeText(s)}return ii(()=>{c=er({container:t.value}),c.invoke(["eventBus",function(l){l.on("editor.fullscreen.toggle",50,()=>{R()}),l.on(["formal.create.place","formal.create.transition","formal.create.flow"],50,s=>{x(s)}),l.on(["pad.delete","elements.delete"],50,s=>{_(s)}),l.on(["element.changed","elements.changed"],50,s=>{P(s)}),l.on(["formal.clear"],50,()=>{k()})}]),f()}),ri(()=>{c&&(c.destroy(),c=null)}),(l,s)=>(ni(),oi("div",tr,[s[5]||(s[5]=E("div",{class:"editor-header"},[E("h4",null,[ee(" This is an editor to create Petri nets, powered by "),E("a",{href:"https://github.com/bpmn-io/diagram-js/tree/develop",target:"_blank"}," diagram-js "),ee(". ")]),E("p",null,[ee(" For more information on the formalism and its structure see: "),E("a",{href:"/docs/editors/ts/Adam_Banham___petri_nets.pdf",target:"_blank"},"A Brief Introduction to Petri Nets"),ee(". ")]),E("p",null," Notably, the editor is still a bit fragile and can crash. ")],-1)),E("div",{ref_key:"container",ref:e,class:"editor-canvas-ts-container editor-outter-box-shadow editor-canvas"},[E("div",{ref_key:"canvas",ref:t,class:"editor",id:"ts-editor"},null,512)],512),E("div",ir,[s[4]||(s[4]=E("h3",null," Petri Net Components ",-1)),E("div",rr,[E("div",nr,[E("div",or,[E("h4",null," Places, or \\(P\\) ("+U(o.value.length)+")",1),te(ie,{icon:"mdi-content-copy",rounded:!0,variant:"text",onClick:s[0]||(s[0]=()=>p("places"))})]),E("p",null,U(u.value),1)]),E("div",ar,[E("div",sr,[E("h4",null," Transitions, or \\(T\\) ("+U(n.value.length)+")",1),te(ie,{icon:"mdi-content-copy",rounded:!0,variant:"text",onClick:s[1]||(s[1]=()=>p("transitions"))})]),E("p",null,U(h.value),1)]),E("div",cr,[E("div",lr,[E("h4",null," Flows, or \\(F\\) ("+U(a.value.length)+")",1),te(ie,{icon:"mdi-content-copy",rounded:!0,variant:"text",onClick:s[2]||(s[2]=()=>p("flow"))})]),E("p",null,U(y.value),1)]),E("div",dr,[E("div",ur,[E("h4",null," Labels, or \\(\\lambda\\) ("+U(g.value.length)+")",1),te(ie,{icon:"mdi-content-copy",rounded:!0,variant:"text",onClick:s[3]||(s[3]=()=>p("labels"))})]),E("p",null,U(v.value),1)])])],512)]))}}),br=ai(pr,[["__scopeId","data-v-61a12552"]]);export{br as default};
//# sourceMappingURL=EditorPN-lEOcubJj.js.map
