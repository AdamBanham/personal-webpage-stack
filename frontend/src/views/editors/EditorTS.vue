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
    
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue"
import EditorTS from "./TS/editor.js";
import { scaleToFitElements } from "./base/utils/canvasUtils.js";
import { useMathJax } from "@/composables/useMathJax";

interface StateInfo {
  id: string
  label: string
}

interface TransitionInfo extends StateInfo {
  src: StateInfo
  tgt: StateInfo
}

const container = useTemplateRef<HTMLElement>("container")
const canvas = useTemplateRef<HTMLElement>("canvas")
const mathPanel = useTemplateRef<HTMLElement>("editor-ts-math")

const states = ref<StateInfo[]>([])
const transitions = ref<TransitionInfo[]>([])

// diagram-js instance: deliberately not reactive
let editor: any = null
let fitTimer: ReturnType<typeof setTimeout> | undefined

function findLabel(state: StateInfo): string {
  return state.label.length > 0 ? state.label : state.id
}

// NOTE: `added` is never set here, so the set always keeps a trailing ", " (kept as-is)
const statesML = computed(() => {
  let ret = "\\begin{align*} \\{ ";
  const added = false;
  for (const state of states.value) {
    ret += "\\text{" + findLabel(state) + "}, "
  }
  if (!added) {
    return ret + " \\} \\end{align*}"
  }
  return ret.substring(0, ret.length - 2) + " \\} \\end{align*}"
})

const actions = computed(() => {
  const ret: string[] = []
  for (const trans of transitions.value) {
    if (!ret.includes(trans.label)) {
      ret.push(trans.label)
    }
  }
  return ret
})

const actionsML = computed(() => {
  let ret = "\\begin{align*} \\{ "
  let added = false;
  for (const act of actions.value) {
    if (act.startsWith("\\")) {
      ret += " " + act + ", "
    } else {
      ret += " \\textit{" + act + "}, "
    }
    added = true;
  }
  if (!added) {
    return ret + " \\} \\end{align*}"
  }
  return ret.substring(0, ret.length - 2) + " \\} \\end{align*}"
})

const transitionsML = computed(() => {
  let ret = "\\begin{align*} \\{ ";
  let added = false;
  for (const trans of transitions.value) {
    let action = findLabel(trans)
    if (!action.startsWith("\\")) {
      action = "\\textit{" + action + "}"
    }
    const src = findLabel(trans.src)
    const tgt = findLabel(trans.tgt)
    ret += " (\\text{" + src + "}, " + action + ", \\text{" + tgt + "}), "
    added = true;
  }
  if (!added) {
    return ret + " \\} \\end{align*}"
  }
  return ret.substring(0, ret.length - 2) + " \\} \\end{align*}"
})

const { typeset } = useMathJax(mathPanel, [statesML, actionsML, transitionsML])

function arcLabel(el: any): string {
  if (el.arcLabel == null || el.arcLabel.length < 1) {
    return '\\tau'
  }
  return el.arcLabel
}

function toState(el: any): StateInfo {
  return {
    id: el.id,
    label: el.stateLabel
  }
}

function toTransition(el: any): TransitionInfo {
  return {
    id: el.id,
    label: arcLabel(el),
    src: toState(el.source),
    tgt: toState(el.target)
  }
}

function handleElementCreate(event: any) {
  if (event.type.startsWith('state')) {
    states.value.push(toState(event.element))
  } else if (event.type.startsWith('transition')) {
    transitions.value.push(toTransition(event.element))
  } else if (event.context && event.context.connection) {
    transitions.value.push(toTransition(event.context.connection))
  }
}

function handleElementDelete(event: any) {
  if (!event.type.startsWith("pad.")) {
    return
  }
  const deleted = event.elements[0]
  // connections have no incoming/outgoing
  const removed = new Set<string>([
    deleted.id,
    ...(deleted.incoming || []).map((inc: any) => inc.id),
    ...(deleted.outgoing || []).map((out: any) => out.id),
  ])
  states.value = states.value.filter((v) => v.id != deleted.id)
  transitions.value = transitions.value.filter((v) => !removed.has(v.id))
}

function handleElementChange(event: any) {
  function update(el: any) {
    states.value.forEach((v) => {
      if (v.id == el.id) {
        v.label = el.stateLabel
      }
    })
    transitions.value.forEach((v) => {
      if (v.id == el.id) {
        v.label = arcLabel(el)
      }
      if (v.src.id == el.id) {
        v.src.label = el.stateLabel
      }
      if (v.tgt.id == el.id) {
        v.tgt.label = el.stateLabel
      }
    })
  }

  if (event.type.startsWith("element.")) {
    update(event.element)
  } else {
    for (const el of event.elements) {
      update(el)
    }
  }
}

function resetToEmpty() {
  states.value = []
  transitions.value = []
}

function toggleFullScreen() {
  container.value?.classList.toggle('fullscreen');
}

function copyStates() {
  navigator.clipboard.writeText(statesML.value);
}

function copyActions() {
  navigator.clipboard.writeText(actionsML.value);
}

function copyTransitions() {
  navigator.clipboard.writeText(transitionsML.value);
}

onMounted(() => {
  editor = EditorTS({
    container: canvas.value
  });

  // track the system's state for the formal definition panel. Listeners must return
  // undefined: a returned value would stop lower-priority diagram-js listeners.
  editor.invoke(['eventBus', function (bus: any) {
    bus.on(
      ['state.create', 'transition.create', 'action.create', 'element.create', 'connect.end'],
      50, (ev: any) => { handleElementCreate(ev) }
    )
    bus.on(['pad.delete', 'elements.delete'], 50, (ev: any) => { handleElementDelete(ev) })
    bus.on(['editor.fullscreen.toggle'], 50, () => { toggleFullScreen() })
    bus.on(['element.changed', 'elements.changed'], 50, (ev: any) => { handleElementChange(ev) })
    bus.on(['formal.clear'], 50, () => { resetToEmpty() })
  }]);
  editor.invoke(['canvas', function (canvas: any) {
    fitTimer = setTimeout(() => {
      scaleToFitElements(canvas);
    }, 150);
  }]);

  typeset()
})

onBeforeUnmount(() => {
  clearTimeout(fitTimer);
  if (editor) {
    editor.destroy();
    editor = null;
  }
})
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