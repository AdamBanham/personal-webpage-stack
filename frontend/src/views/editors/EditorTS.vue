<template>
  <div class="editor-content">
    <div class="editor-header">
      <h4>
        This is an editor to create transition systems, powered by 
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
          href="/docs/editors/ts/Adam_Banham___Transition_Systems.pdf"
          target="_blank"
        >A Brief Introduction to Labelled Transition Systems</a>.
      </p>
      <p>
        Notably, the editor is still a bit fragile and can crash.
      </p>
    </div>
    <div
      ref="container"
      class="editor-canvas editor-outter-box-shadow"
    >
      <div
        ref="canvas"
        class="editor"
      />
    </div>
    <div
      ref="editor-ts-math"
      class="net-compontents editor-outter-box-shadow"
    >
      <h3> Transition Net Components </h3>
      <div class="net">
        <div class="net-states">
          <div class="net-header">
            <h4> States, or \(Q\) ({{ states.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="copyStates"
            />
          </div>
          
          <p> {{ statesML }} </p>
        </div>
        <div class="net-actions">
          <div class="net-header">
            <h4> Actions, or \(\Sigma\) ({{ actions.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="copyActions"
            />
          </div>
          <p> {{ actionsML }} </p>
        </div>
        <div class="net-transitions">
          <div class="net-header">
            <h4> Transitions, or \(\rightarrow\) ({{ transitions.length }})</h4>
            <v-btn
              icon="mdi-content-copy"
              :rounded="true"
              variant="text"
              @click="copyTransitions"
            />
          </div>
          <p> {{ transitionsML }} </p>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
    import EditorTS  from "./TS/editor.js";
    import defaultSystem from "./TS/system.js";
    import TsXmlImporter from "./TS/importer.js";
    import { scaleToFitElements } from "./base/utils/canvasUtils.js";

    import {
      getConnectionMid
    } from "diagram-js/lib/layout/LayoutUtil"
    
    export default {
        name: "EditorTS",
        data: function(){
            return {
                root: null,
                editor: null,
                container: null,
                diagramXML: null,
                states : [],
                transitions : [],
                typesetPromise: Promise.resolve()
            }
        },
        computed : {
          statesML : function(){
            var ret = "\\begin{align*} \\{ ";
            let added = false;
            for(const state of this.states){
              var label = this.findLabel(state)
              ret += "\\text{"+ label + "}, "
            }
            this.triggerMathjax()
            if (!added){
              return ret + " \\} \\end{align*}"
            }
            return ret.substring(0, ret.length-2) + " \\} \\end{align*}"
          },
          actions : function(){
            var ret = []
            for(const trans of this.transitions){
              if (!ret.includes(trans.label)){
                ret.push(trans.label)
              }
            }
            return ret
          },
          actionsML : function(){
            var ret = "\\begin{align*} \\{ "
            let added = false;
            for(const act of this.actions){
              if (act.startsWith("\\")){
                ret += " " + act + ", "
              } else {
                ret += " \\textit{"+act+"}, "
              }
              added = true;
            }
            this.triggerMathjax()
            if (!added){
              return ret + " \\} \\end{align*}"
            }
            return ret.substring(0, ret.length-2) + " \\} \\end{align*}"
          },
          transitionsML : function(){
            var ret = "\\begin{align*} \\{ ";
            let added = false;
            for(const trans of this.transitions){
              var action = this.findLabel(trans)
              if (!action.startsWith("\\")){
                action = "\\textit{"+action+"}"
              } 
              var src = this.findLabel(trans.src)
              var tgt = this.findLabel(trans.tgt)
              ret += " (\\text{"+src+"}, "+action+", \\text{"+tgt+"}), "
              added = true;
            }
            this.triggerMathjax()
            if (!added){
              return ret + " \\} \\end{align*}"
            }
            return ret.substring(0, ret.length-2) + " \\} \\end{align*}"
          }
        },
        mounted: function(){
            this.root = this.$refs.canvas;
            this.container = this.$refs.container;  
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
                [
                  'state.create','transition.create', 'action.create',
                  'element.create', 'connect.end'
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
                  'editor.fullscreen.toggle'
                  ],
                50, (ev) => {
                  that.toggleFullScreen()
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
            this.editor.invoke(['canvas', function(canvas){
                setTimeout(() => {
                  scaleToFitElements(canvas);
                }, 150);
            }]);
            // add default system
            this.loadDefaultSystem()
            this.editor.get('canvas').zoom('fit-viewport');
            this.triggerMathjax()
          },
        methods: {
            toggleFullScreen: function() {
              if (this.container) {
                this.container.classList.toggle('fullscreen');
              }
            },
            addDefaultSystem: function(){
                this.editor.invoke([ 'eventBus', 'elementFactory', 'canvas', 'modeling', 
                    function(events, factory, canvas, modeling) {

                    var s1 = { id: factory.getNextStateId(),
                      stateLabel: "srt", x: 300, y: 100,};
                    var s3 = { id: factory.getNextStateId(),
                      stateLabel: "a", x: 300, y: 300,}
                    var s2 = { id: factory.getNextStateId(),
                      stateLabel: "end", x: 300, y: 500,};
                    s1 = factory.createStartingState(s1);
                    s3 = factory.createInternalState(s3);
                    s2 = factory.createEndingState(s2);

                    var c1 = factory.createConnectionBetweenStates(
                        factory.getNextConnectionId(), 
                        s1,
                        s3,
                        'foo'
                    );
                    var c2 = factory.createConnectionBetweenStates(
                        factory.getNextConnectionId(), 
                        s3,
                        s2,
                        'baz'
                    );
                    modeling.createShape(
                      s1, {x: s1.x, y:s1.y}, canvas.getRootElement()
                    )
                    modeling.createShape(
                      s2, {x: s2.x, y:s2.y}, canvas.getRootElement()
                    )
                    modeling.createShape(
                      s3, {x: s3.x, y:s3.y}, canvas.getRootElement()
                    )
                    canvas.addConnection(c1)
                    modeling.layoutConnection(c1,)
                    canvas.addConnection(c2)
                    modeling.layoutConnection(c2,)

                    var position = getConnectionMid(c2)
                    var label = factory.createLabel({
                      text: 'baz',
                      width: 50,
                      height: 12,
                      labelTarget: c2,
                      x: 0
                    })
                    modeling.createLabel(
                      c2,
                      position,
                      label,
                      c2
                    )

                    position = getConnectionMid(c1)
                    label = factory.createLabel({
                      text: 'foo',
                      width: 50,
                      height: 12,
                      labelTarget: c1,
                      x: 0
                    })
                    modeling.createLabel(
                      c1,
                      position,
                      label,
                      c1
                    )

                    modeling.moveElements([s1,s2,s3], {x:0,y:0})
                    
            }]);
            },
          loadDefaultSystem: function(){
            this.editor.invoke([
              'modeling', 'elementFactory', 'canvas', 'elementRegistry',
              'eventBus', 'textRenderer'
            ,function(modeling, factory, canvas, registry, bus, 
                      textRenderer) {
              var parser = new TsXmlImporter(modeling, 
                factory, canvas, registry, bus, textRenderer
              );
              var tree = new DOMParser().parseFromString(
                            defaultSystem, "text/xml"
              )
              var system = tree.getElementsByTagName("transition-system")[0]
              parser.import(system)
            }
            ])
          },
          triggerMathjax: function(){
            const mathjax = window.MathJax
            const that = this
            const math = this.$refs['editor-ts-math']
            // using setTimeout, which can get the right result
            that.$nextTick( () => {
              that.typesetPromise = that.typesetPromise.then(() => {
                return mathjax.typesetPromise([that.$refs['editor-ts-math']])
              }
            )})
          },
        handleElementCreate: function(event){
          
          function handleState(el){
            return  {
              id: el.id,
              label: el.stateLabel
            }
          }

          function handleTransition(el){
            var label;
            if (el.arcLabel == null){
              label = '\\tau'
            } else if (el.arcLabel.length < 1){
              label = '\\tau'
            } else {
              label = el.arcLabel
            }
            return {
              id: el.id,
              label: label,
              src: handleState(el.source),
              tgt: handleState(el.target)
            }
          }

          if (event.type.startsWith('state')){
            this.states.push(handleState(event.element))
          } else if (event.type.startsWith('transition')){
            var trans = handleTransition(event.element)
            this.transitions.push(trans)
          } else {
            if (event.context && event.context.connection){
              var trans = handleTransition(event.context.connection)
              this.transitions.push(trans)
            }
          }
          return event
        },
        handleElementDelete: function(event){
          var deleted;
          if (event.type.startsWith("pad.")){
            deleted = event.elements[0]
            this.states = this.states.filter(
              (v) => v.id != deleted.id
            )
            this.transitions = this.transitions.filter(
              (v) => v.id != deleted.id
            )
            if (deleted.incoming.length){
              for(const inc of deleted.incoming){
                //console.log("removing ", inc.id)
                this.transitions = this.transitions.filter(
                  (v) => v.id != inc.id
                )
              }
            }
            if (deleted.outgoing.length){
              for(const out of deleted.outgoing){
                this.transitions = this.transitions.filter(
                  (v) => v.id != out.id
                )
              }
            }
          } else {

          }
        },
        handleElementChange: function(event){
          var that = this
          function update(el){
            that.states.forEach((v) => {
              if (v.id == el.id){
                  v.label = el.stateLabel
              }
            })
            that.transitions.forEach( (v) => {
              if (v.id == el.id){
                var label;
                if (el.arcLabel == null){
                  label = '\\tau'
                } else if (el.arcLabel.length < 1){
                  label = '\\tau'
                } else {
                  label = el.arcLabel
                }
                v.label = label
              }
              if (v.src.id == el.id){
                v.src.label = el.stateLabel
              }
              if (v.tgt.id == el.id){
                v.tgt.label = el.stateLabel
              }
            })
          }
          
          if(event.type.startsWith("element.")){
            update(event.element)
          } else {
            for(const el of event.elements){
              update(el)
            }
          }
        },  
        copyStates: function(){
          navigator.clipboard.writeText(this.statesML);
        },
        copyActions: function(){
          navigator.clipboard.writeText(this.actionsML);
        },
        copyTransitions: function(){
          navigator.clipboard.writeText(this.transitionsML);
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
          this.states = []
          this.transitions = []
        }
      },

    }
</script>
    
<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/content.sass" as cont

$editor-scene-bg: #323650
    
.editor-content
  --editor-primary: #2222f8
  --editor-secondary: #074355
  --editor-scence-bg: #323650
  --petri-net-connection-fill: #000000

  .editor-canvas
    background: var(--editor-scence-bg)

  .net-compontents
    width: 95%
    border-radius: 15px 
    margin-left: 2.5%
    margin-right: 2.5%
    background-color: var(--editor-scence-bg)
    height: fit-content
    flex-direction: row
    max-width: 95%
    h3, h4 
      text-align: center
      vertical-align: middle
      padding: 5px
      color: c.$black-blue
    p 
      margin-bottom: 5px
    .net 
      display: flex 
      flex-direction: row
      width: 96%
      max-width: 96%
      margin-left: 2%
      margin-right: 2%
      flex-wrap: wrap
      p 
        color: c.$black-blue
      .net-header
        display: flex 
        flex: 1
        flex-direction: row
        justify-content: center
        align-items: center
        h4
          flex: 5
          text-align: left
          padding-left: 20px
        button 
          flex: 1
      .net-states
        width: 100%
        max-width: 100%
        background-color: lighten($editor-scene-bg, 20%)
        border-radius: 15px 
        margin: 5px
        flex: 1 1
        p
          flex-wrap: wrap
          width: 100%
          max-width: 100%
      .net-actions
        width: 100%
        background-color: lighten($editor-scene-bg, 20%)
        border-radius: 15px 
        margin: 5px
        flex: 1 1
      .net-transitions
        width: 100%
        background-color: lighten($editor-scene-bg, 20%)
        border-radius: 15px 
        margin: 5px
        flex: 1 1
</style>