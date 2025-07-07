<template>
  <div class="pn-editor-content">
    <div class="editor-header">
      <h4>
        This is an editor to create Petri nets, powered by 
        <a 
          href="https://github.com/bpmn-io/diagram-js/tree/develop" 
          target="_blank"
        >
          diagram-js
        </a>.
      </h4>
      <p>
        For more information on the formalism and its structure see: 
        <a
          href="/docs/editors/ts/Adam_Banham___petri_nets.pdf"
          target="_blank"
        >A Brief Introduction to Petri Nets</a>.
      </p>
      <p>
        Notably, the editor is still a bit fragile and can crash.
      </p>
    </div>
    <div
      ref="container"
      class="editor-canvas-ts-container editor-outter-box-shadow"
    >
      <div
        ref="canvas"
        class="editor-canvas"
        id="ts-editor" 
      />
    </div>
    <div
      ref="editor-pn-math"
      class="net-compontents editor-outter-box-shadow"
    >
      <h3> Petri Net Components </h3>
      <div class="net">
        <div class="net-states">
          <div class="net-header">
            <h4> Places, or \(P\) ({{ places.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="() => copyToClip('places')"
            />
          </div>
          <p> {{ placesML }} </p>
        </div>
        <div class="net-states">
          <div class="net-header">
            <h4> Transitions, or \(T\) ({{ transitions.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="() => copyToClip('transitions')"
            />
          </div>
          <p> {{ transitionsML }} </p>
        </div>
        <div class="net-states">
          <div class="net-header">
            <h4> Flows, or \(F\) ({{ flows.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="() => copyToClip('flow')"
            />
          </div>
          <p> {{ flowsML }} </p>
        </div>
        <div class="net-states">
          <div class="net-header">
            <h4> Labels, or \(\lambda\) ({{ labels.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="() => copyToClip('labels')"
            />
          </div>
          <p> {{ labelsML }} </p>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import EditorTS  from "./editor.js"
import defaultSystem from "./system.js"
import TsXmlImporter from "./importer.js"

import {
  getConnectionMid
} from "diagram-js/lib/layout/LayoutUtil"
export default {
  name: "EditorPN",
  data: function(){
    return {
                root: null,
                editor: null,
                diagramXML: null,
                places : [],
                flows: [],
                transitions : [],
                typesetPromise: Promise.resolve()
            }
  },
  computed : {
          placesML : function(){
            var ret = ""
            this.places.forEach((place, index) => {
              ret += place.label
              if (index < this.places.length - 1){
                ret += ", "
              }
            })
            this.triggerMathjax()
            return "\\begin{align*} \\{ " + ret + " \\}\\end{align*}"
          },
          labels : function(){
            var ret = []
            this.transitions.forEach((t) => {
              var label = t.silent ? "silent" : t.label
              if (ret.includes(label)){
                return
              }
              ret.push(label)
            })
            return ret
          },
          transitionsML : function(){
            var ret = ""
            this.transitions.forEach((t, index) => {
              ret += this.trimId(t.id)
              if (index < this.transitions.length - 1){
                ret += ", "
              }
            })
            this.triggerMathjax()
            return "\\begin{align*} \\{ " + ret + " \\}\\end{align*}"
          },
          labelsML: function(){
            var ret = ""
            this.transitions.forEach((t, index) => {
              var label = t.silent ? "\\tau" : t.label
              ret += this.trimId(t.id) 
              ret += "\\rightarrow"
              ret += t.silent ? label : "\\text{'"+label+"'}"
              if (index < this.transitions.length - 1){
                ret += ", "
              }
            })
            this.triggerMathjax()
            return "\\begin{align*} \\{ " + ret + " \\}\\end{align*}"
          },
          flowsML: function(){
            var ret = ""
            this.flows.forEach((flow, index) => {
              ret += '('+this.trimId(flow.src) 
              ret += ", "
              ret += this.trimId(flow.tgt) + ')'
              if (index < this.flows.length - 1){
                ret += ", "
              }
            })
            this.triggerMathjax()
            return "\\begin{align*} \\{" + ret + " \\}\\end{align*}"
          },
        },
        mounted: function(){
            this.root = this.$refs.canvas;
            var _options = {
                container:  this.root
            }
            this.editor = new EditorTS(
                _options
            );
            // add hanlders to track net state
            var that = this
            this.editor.invoke(['eventBus', function(bus){
              bus.on(
                'editor.fullscreen.toggle',
              50, (ev) => {
                that.toggleFullscreen()
              }, that)
            }]);
            this.editor.invoke(['eventBus', function(bus){
              bus.on(
                [
                  'formal.create.place', 'formal.create.transition',
                  'formal.create.flow',
                ],
              50, (ev) => {
                that.handleElementCreate(ev)
            }, that)
            }]);
            this.editor.invoke(['eventBus', function(bus){
                bus.on(
                  [
                  'pad.delete'
                  ],
                50, (ev) => {
                  that.handleElementDelete(ev)
              }, that)
            }]);
            this.editor.invoke(['eventBus', function(bus){
                bus.on(
                  [
                  'element.changed', 'elements.changed'
                  ],
                50, (ev) => {
                  that.handleElementChange(ev)
              }, that)
            }]);
            this.editor.invoke(['eventBus', function(bus){
                bus.on(
                  [
                  'formal.clear',
                  ],
                50, (ev) => {
                  that.resetToEmpty()
              }, that)
            }]);
            // add default system
            this.loadDefaultSystem()
            this.editor.get('canvas').zoom('fit-viewport');
            this.triggerMathjax()
          },
        methods: {
          toggleFullscreen: function(){
            this.$refs.container.classList.toggle('fullscreen')
          },
          addDefaultSystem: function(){
              this.editor.invoke([ 'eventBus', 'elementFactory', 'canvas', 'modeling', 
                  function(events, factory, canvas, modeling) {
                    var inc = factory.createPlace({
                      x: 100,
                      y: 100
                    })
                    var transition = factory.createTransition({
                      x: 200,
                      y: 100
                    })
                    var out = factory.createPlace({
                      x: 300,
                      y: 100
                    })
                    var arcInc = factory.createFlow({
                      source: inc,
                      target: transition,
                      waypoints: [
                        {x: inc.x, y: inc.y},
                        {x: transition.x, y: transition.y}
                      ]
                    })
                    var arcOut = factory.createFlow({
                      source: transition,
                      target: out,
                      waypoints: [
                        {x: transition.x, y: transition.y},
                        {x: out.x, y: out.y},
                      ]
                    })
                    var root = canvas.getRootElement()
                    inc = modeling.createShape(inc, {
                      x: inc.x, y:inc.y
                    }, root)
                    transition = modeling.createShape(transition, {
                      x: transition.x, y:transition.y
                    }, root)
                    out = modeling.createShape(out, {
                      x: out.x, y:out.y
                    }, root)
                    modeling.createConnection(
                      inc, transition,
                      arcInc, root) 
                    modeling.layoutConnection(arcInc, root)
                    modeling.createConnection(
                      transition, out,
                      arcOut, root) 
                    modeling.layoutConnection(arcOut, root)
                    modeling.moveShape(inc, {x: 0.01, y: 0.01})
          }]);
          },
          loadDefaultSystem: function(){
            this.editor.invoke([
              'modeling', 'elementFactory', 'canvas', 'elementRegistry',
              'eventBus', 'textRenderer'
            ,function(modeling, factory, canvas, registry, bus, 
                      textRenderer) {
              //TODO: write load for default system
              var parser = new TsXmlImporter(modeling, 
                factory, canvas, registry, bus, textRenderer
              );
              var tree = new DOMParser().parseFromString(
                            defaultSystem, "text/xml"
              )
              var system = tree.getElementsByTagName("net")[0]
              parser.import(system)
            }
            ])
          },
          triggerMathjax: function(){
            const mathjax = window.MathJax
            const that = this
            const math = this.$refs['editor-pn-math']
            // using setTimeout, which can get the right result
            that.$nextTick( () => {
              that.typesetPromise = that.typesetPromise.then(() => {
                return mathjax.typesetPromise([that.$refs['editor-pn-math']])
              }
            )})
          },
        trimId : function trimId(id){
            return id.split('-')[0][0]+"_{" + id.split('-')[1] + "}"
        },
        handleElementCreate: function(event){
          var that = this
          function handleElement(el){
            return {
              id: el.id,
              label: el.labelText || that.trimId(el.id),
              silent: el.silent || false
            }
          }
          function handleFlow(flow){
            return {
              id: flow.id,
              src: flow.source.id,
              tgt: flow.target.id
            }
          }
          if (event.element.type === 'place'){
            this.places.push(handleElement(event.element))
          } else if (event.element.type === 'transition'){
            this.transitions.push(handleElement(event.element))
          } else if (event.element.type === 'flow'){
            this.flows.push(handleFlow(event.element))
          }
          return event
        },
        handleElementDelete: function(event){
          var deleted = event.elements;
          var connected = []
          deleted.forEach(el => {
            if(el.type === 'place'){
              connected = connected.concat(
                this.flows.filter((f) => f.src === el.id || f.tgt === el.id)
              )
            } else if (el.type === 'transition'){
              connected = connected.concat(
                this.flows.filter((f) => f.src === el.id || f.tgt === el.id)
              )
            }
          });
          deleted.forEach(
            (el) => {
              if (el.type === 'place'){
                this.places = this.places.filter((p) => p.id !== el.id)
              } else if (el.type === 'transition'){
                this.transitions = this.transitions.filter((t) => t.id !== el.id)
              } else if (el.type === 'flow'){
                this.flows = this.flows.filter((f) => f.id !== el.id)
              }
            }
          )
          connected.forEach(
            (el) => {
              this.flows = this.flows.filter((f) => f.id !== el.id)
            }
          )
          
        },
        handleElementChange: function(event){
          if (event.elements){
            event.elements.forEach((el) => {
              if (el.type === 'transition'){
                var index = this.transitions.findIndex((t) => t.id === el.id)
                if (index > -1){
                  this.transitions[index].label = el.labelText
                  this.transitions[index].silent = el.silent
                }
              }
            })
          } else {
            if (event.element.type === 'transition'){
              var index = this.transitions.findIndex((t) => t.id === event.element.id)
              if (index > -1){
                this.transitions[index].label = event.element.labelText
                this.transitions[index].silent = event.element.silent
              }
            }
          }
        },  
        copyToClip: function(hint){
          if (hint === 'places'){
            navigator.clipboard.writeText(this.placesML)
          } else if (hint === 'transitions'){
            navigator.clipboard.writeText(this.transitionsML)
          } else if (hint === 'flow'){
            navigator.clipboard.writeText(this.flowsML)
          } else if (hint === 'labels'){
            navigator.clipboard.writeText(this.labelsML)
          }
        },
        findLabel : function(state){
          let label;
          if (state.label.length > 0){
                label = state.label
              } else {
                label = state.id
              }
          return label
        },
        resetToEmpty: function(){
          this.places = []
          this.transitions = []
          this.flows = []
        }
      }
}
</script>
    
<style lang="sass" scoped>
@use "./scoped"
</style>

<style lang="sass">
@use "./global"
</style>