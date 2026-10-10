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
    class="editor-canvas editor-outter-box-shadow"
    id="content"
  >
    <div
      ref="canvas"
      class="editor"
      id="editor"
    >
    </div>
  </div>
</div>
</template>
    
<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"
import type BpmnModeler from 'bpmn-js/lib/Modeler';
import { scaleToFitElements } from './base/utils/canvasUtils';
import createEditor from './BPMN/editor'

const container = useTemplateRef<HTMLElement>("container")
const canvas = useTemplateRef<HTMLElement>("canvas")

// bpmn-js modeler: deliberately not reactive
let editor: BpmnModeler | null = null
let fitTimers: ReturnType<typeof setTimeout>[] = []

function toggleFullSceen() {
  if (container.value) {
    container.value.classList.toggle("fullscreen");
    container.value.focus();
  }
}

function handleExport() {
  if (!editor) {
    return
  }
  editor.saveXML().then((xml) => {
    const a = document.createElement('a');
    a.href = 'data:application/xml;charset=utf-8,' + encodeURIComponent(xml.xml ?? '');
    a.download = 'diagram.bpmn';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }).catch((err) => {
    console.error('Error exporting BPMN XML:', err);
  });
}

function handleImport() {
  if (!editor) {
    return
  }
  const fileDialog = document.createElement('input');
  fileDialog.type = 'file';
  fileDialog.accept = '.bpmn';
  document.body.appendChild(fileDialog);
  fileDialog.click()
  fileDialog.onchange = () => {
    const file = fileDialog.files?.[0];
    if (!file) {
      return
    }
    const reader = new FileReader();
    reader.onload = () => {
      editor?.importXML(reader.result as string).catch((err) => {
        console.error('Error importing BPMN XML:', err);
      });
    };
    reader.readAsText(file);
  };
}

onMounted(() => {
  editor = createEditor(canvas.value!);

  editor.invoke(['eventBus', function (eventBus: any) {
    eventBus.on('editor.toggle.fullScreen', () => { toggleFullSceen() });
    eventBus.on('editor.export', () => { handleExport() });
    eventBus.on('editor.import', () => { handleImport() });
  }]);

  editor.invoke(['canvas', function (canvas: any) {
    fitTimers = [
      setTimeout(() => scaleToFitElements(canvas), 150),
      setTimeout(() => scaleToFitElements(canvas), 175)
    ];
  }]);
})

onBeforeUnmount(() => {
  fitTimers.forEach(clearTimeout);
  if (editor) {
    editor.destroy();
    editor = null;
  }
})
</script>

<style lang ="sass">
@use "bpmn-js/dist/assets/bpmn-js.css"
@use 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

.editor-content .editor-canvas
  --editor-primary: #2222f8
  --editor-secondary: #074355
  --editor-scence-bg: #323650

  .djs-context-pad
    .entry 
      color: var(--editor-scence-bg)

.bjs-powered-by
  color: #111111 !important
</style>

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
</style>