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
        <u>coming soon</u>.
      </p>
    </div>
    <div
      ref="container"
      class="editor-canvas-ts-container"
    >
      <div
        ref="canvas"
        class="editor-canvas"
      />
    </div>
  </div>
</template>
    
<script>
    import EditorTS  from "./TS/editor.js"
    
    export default {
        name: "EditorTS",
        data: function(){
            return {
                root: null,
                editor: null,
                diagramXML: null
            }
        },
        mounted: function(){
            this.root = this.$refs.canvas;

            
            var _options = {
                container:  this.root
            }
            this.editor = new EditorTS(
                _options
            );
            this.addDefaultSystem()
            this.editor.get('canvas').zoom('fit-viewport');
        },
        methods: {
            addDefaultSystem: function(){
                this.editor.invoke([ 'eventBus', 'elementFactory', 'canvas', 'modeling', 
                    function(events, factory, canvas, modeling) {

                    var s1 = { id: factory.getNextStateId(),
                      stateLabel: "{}", x: 300, y: 100,};
                    var s3 = { id: factory.getNextStateId(),
                      stateLabel: "{0,1}", x: 300, y: 200,}
                    var s2 = { id: factory.getNextStateId(),
                      stateLabel: "{}", x: 300, y: 300,};
                    s1 = factory.createStartingState(s1);
                    s3 = factory.createInternalState(s3);
                    s2 = factory.createEndingState(s2);

                    var c1 = factory.createConnectionBetweenStates(
                        factory.getNextConnectionId(), 
                        s1,
                        s3,
                    );
                    c1.arcLabel = "foo"
                    var c2 = factory.createConnectionBetweenStates(
                        factory.getNextConnectionId(), 
                        s3,
                        s2,
                    );
                    c2.arcLabel = "baz"

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
                    modeling.moveElements([s1,s2,s3], {x:0,y:0})
                    
            }]);
            }
        }
    }
</script>
    
<style lang="sass" scoped>
    @import "@/styles/coloursAnt.sass"
    @import "@/styles/content.sass"
    
    .editor-canvas-ts-container
        margin-top: 25px
        min-width: 1000px
        min-height: 640px
        background: none
        border: 2px $black-blue
        border-style: solid
        border-radius: 15px
        margin-bottom: 100px

        
        .editor-canvas
            width: 100%
            height: 100%

            div 
                background: none

            .djs-container
                .djs-context-pad-parent
                    .open
                        .group
                            .editor-hover
                                color: black
                                width: 20px
                                height: 20px
                                border: 2px red solid
                                &:hover
                                    color: $blue-7
</style>

<style lang="sass">
@import "@/styles/coloursAnt.sass"
.editor-canvas-ts-container
    .editor-canvas
        border-radius: 15px
        .djs-palette
          border-radius: 15px
          box-shadow: 5px 5px 15px black
        .djs-container
          border-radius: 15px
          background: $gray-5
          .djs-context-pad-parent
              .open
                  .group
                      .editor-hover
                          color: black
                          &:hover
                              color: $blue-7
                              // background: $background-light-50
</style>