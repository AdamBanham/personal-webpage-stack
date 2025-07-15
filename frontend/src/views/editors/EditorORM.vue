<template>
  <div class="editor-content">
      <div class="editor-header">
        <h4>
          This is an editor to create Object-Role-Modelling (ORM) schemas, powered by 
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
            href="/docs/editors/ts/Adam_Banham___ORMs.pdf"
            target="_blank"
          >A Brief Introduction to ORM and Conceptual Modelling</a>.
        </p>
        <p>
          Notably, the editor is still a bit fragile and can crash.
          But, there is a more actively developed version of the editor 
          available for vs-code: 
          <a
            href="https://marketplace.visualstudio.com/items?itemName=qORMa.qorma&ssr=false#overview"
            target="_blank"
          >
            qORMa
          </a>
        </p>
      </div>
      <div
        ref="container"
        class="editor-container editor-orm-container editor-canvas editor-outter-box-shadow"
        id="content"
      >
        <div
          ref="canvas"
          class="editor"
          id="orm-editor"
        >
          <!-- The editor will be rendered here -->

          <div class="helpers">
            <div
              id="help-interactions" 
              class="djs-palette djs-parent help-interactions close"
            >
              <div class="content" />
            </div>
            <div
              id="help-interactions-error" 
              class="djs-palette djs-parent help-interactions help-interactions-error close"
            >
              <div class="content" />
            </div>
            <div class="djs-parent djs-palette open keyboard-palette">
              <div class="djs-palette-entries">
                <div class="group">
                  <div
                    id="keyboard-controls-icon"
                    class="entry mdi mdi-keyboard"
                  >
                  </div>  
                </div>
              </div>
            </div>  
          </div>
          
        </div>
      </div>
    </div>
</template>
    
<script>
import EditorORM from "./ORM/editor"

export default {
  name: "EditorORM",
  data () {
    return {
      root: null,
      container: null,
      editor: null
    }
  },
  methods: {
    toggleFullscreen: function() {
      this.container.classList.toggle("fullscreen");
      setTimeout(
        () => this.editor.get('canvas').zoom('fit-viewport'),
        50
      );
    },
  },
  mounted: function(){
    this.root = this.$refs.canvas;
    this.container = this.$refs.container;
    this.editor = new EditorORM(
        this.root
    );

    var that = this;  
    this.editor.invoke(['eventBus', function(bus){
      bus.on(
        'editor.fullscreen.toggle',
      50, (ev) => {
        that.toggleFullscreen()
    }, that)
    }]);
  }
}
</script>

<style lang="css">
@import "./ORM/media/editor.css";
@import "./ORM/media/render.css";
/* @import "./ORM/media/diagram-js.css"; */
</style>
    
<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"
@import "@/styles/content.sass"


.editor-header
  margin-bottom: 15px
</style>