<template>
<div class="editor-content">
  <div class="editor-header">
    <h4>
      This is an editor to create Business Process Modeling Notation 
      (BPMN 2.0) models, powered by 
      <a 
        href="https://github.com/bpmn-io/diagram-js/tree/develop" 
        target="_blank"
      >
        diagram-js / bpmn-js
      </a>.
    </h4>
    <p>
      For more information about BPMN 2.0, see the following introduction: 
      <a
        href="/docs/editors/ts/Adam_Banham___ORMs.pdf"
        target="_blank"
      >A Brief Introduction to BPMN 2.0 and process modelling</a>.
    </p>
    <p>
      Notably, the editor is using the industry standard editor from 
      <a
        href="https://github.com/bpmn-io/bpmn-js"
        target="_blank"
      >
        Camunda
      </a>
      .
    </p>
  </div>
  <div
    ref="container"
    class="editor-bpmn-container editor-outter-box-shadow"
    id="content"
  >
    <div
      ref="canvas"
      class="editor-bpmn-canvas"
      id="editor"
    >
    </div>
  </div>
</div>
</template>
    
<script>
import { scaleToFitElements } from './base/utils/canvasUtils';
import createEditor from './BPMN/editor'

export default {
name: "BPMNEditor",
data: function(){
  return{
    container: null,
    canvas: null,
    editor: null
  }
},
mounted: function() {
  this.container = this.$refs.container;
  this.canvas = this.$refs.canvas; 

  var that = this;

  this.editor = createEditor(this.canvas);

  this.editor.invoke(['eventBus', function(eventBus) {
    eventBus.on('editor.toggle.fullScreen', function() {
      that.toggleFullSceen();
    });
  }]);

  this.editor.invoke(['eventBus', function(eventBus) {
    eventBus.on('editor.export', function() {
      that.handleExport();
    });
  }]);

  this.editor.invoke(['eventBus', function(eventBus) {
    eventBus.on('editor.import', function() {
      that.handleImport();
    });
  }]);

  this.editor.invoke(['canvas', function(canvas) {
    setTimeout( () => scaleToFitElements(canvas), 150);
    setTimeout( () => scaleToFitElements(canvas), 175);
  }]);

},
methods: {
  toggleFullSceen: function() {
    if (this.container){
      this.container.classList.toggle("fullscreen");
      this.container.focus();
    }
  },
  handleExport: function() {
    if (this.editor) {
      const bpmnXML = this.editor.saveXML();
      bpmnXML.then((xml) => {
        let a = document.createElement('a');
        let uri = encodeURIComponent(xml.xml)
        a.href = 'data:application/xml;charset=utf-8,' + uri;
        a.download = 'diagram.bpmn';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        a.remove();
      }).catch((err) => {
        console.error('Error exporting BPMN XML:', err);
      });
      // You can handle the export logic here, e.g., save to a file or send to a server
    }
  },
  handleImport: function() {
    if (this.editor) {
      let fileDialog = document.createElement('input');
      fileDialog.type = 'file';
      fileDialog.accept = '.bpmn';
      document.body.appendChild(fileDialog);
      fileDialog.click()
      fileDialog.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const xml = e.target.result;
            this.editor.importXML(xml).then(() => {
              console.log('BPMN XML imported successfully');
            }).catch((err) => {
              console.error('Error importing BPMN XML:', err);
            });
          };
          reader.readAsText(file);
        }
      };
    }
  }
}
}
</script>

<style lang ="sass">
@use "bpmn-js/dist/assets/bpmn-js.css"
@use "bpmn-js/dist/assets/diagram-js.css"
@use 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

.editor-content .editor-bpmn-container
  --editor-primary: #2222f8
  --editor-secondary: #074355
  --editor-scence-bg: #323650

  svg 
    border: none !important
    outline: none !important
    &:focus
      border: none
      outline: none
  .djs-context-pad
    .entry 
      color: var(--editor-scence-bg)

.editor-content .editor-bpmn-container.fullscreen
  .djs-palette
    top: 100px

.bjs-powered-by
  color: #111111 !important
</style>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/content.sass" as cont




$editor-scene-bg: #323650
    
.editor-content
  margin-bottom: 100px
  --editor-primary: #2222f8
  --editor-secondary: #074355
  --editor-scence-bg: #323650
  --petri-net-connection-fill: #000000

  .editor-bpmn-container.fullscreen 
    position: fixed
    top: 0
    left: 0
    margin: 0 0 0 0
    width: 100%
    height: 100%
    z-index: 1000
    border-radius: 2.5px

  .editor-bpmn-container
    margin-top: 25px
    margin-left: 25px
    margin-right: 25px
    padding: none
    width: auto
    min-height: 500px
    height: 80%
    background: var(--editor-scence-bg)
    border: 1px c.$black-blue
    border-style: solid
    border-radius: 15px
    margin-bottom: 15px

    &:focus-within
      border: 1px yellow solid

    #editor.editor-bpmn-canvas
      margin: none
      background: none
      border: none
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
                              color: c.$blue-7
  
</style>