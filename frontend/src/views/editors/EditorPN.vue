<template>
  <div class="editor-content">
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
      class="editor-canvas-ts-container editor-outter-box-shadow editor-canvas"
    >
      <div
        ref="canvas"
        class="editor"
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
    
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue"
import EditorPN from "./PN/editor.js"
import { useMathJax } from "@/composables/useMathJax";

interface NodeInfo {
  id: string
  label: string
  silent: boolean
}

interface FlowInfo {
  id: string
  src: string
  tgt: string
}

const container = useTemplateRef<HTMLElement>("container")
const canvas = useTemplateRef<HTMLElement>("canvas")
const mathPanel = useTemplateRef<HTMLElement>("editor-pn-math")

const places = ref<NodeInfo[]>([])
const transitions = ref<NodeInfo[]>([])
const flows = ref<FlowInfo[]>([])

// diagram-js instance: deliberately not reactive
let editor: any = null

function trimId(id: string): string {
  return id.split('-')[0][0] + "_{" + id.split('-')[1] + "}"
}

const placesML = computed(() => {
  const ret = places.value.map((place) => place.label).join(", ")
  return "\\begin{align*} \\{ " + ret + " \\}\\end{align*}"
})

const labels = computed(() => {
  const ret: string[] = []
  transitions.value.forEach((t) => {
    const label = t.silent ? "silent" : t.label
    if (!ret.includes(label)) {
      ret.push(label)
    }
  })
  return ret
})

const transitionsML = computed(() => {
  const ret = transitions.value.map((t) => trimId(t.id)).join(", ")
  return "\\begin{align*} \\{ " + ret + " \\}\\end{align*}"
})

const labelsML = computed(() => {
  const ret = transitions.value.map((t) => {
    const label = t.silent ? "\\tau" : t.label
    return trimId(t.id) + "\\rightarrow" + (t.silent ? label : "\\text{'" + label + "'}")
  }).join(", ")
  return "\\begin{align*} \\{ " + ret + " \\}\\end{align*}"
})

const flowsML = computed(() => {
  const ret = flows.value.map((flow) => '(' + trimId(flow.src) + ", " + trimId(flow.tgt) + ')').join(", ")
  return "\\begin{align*} \\{" + ret + " \\}\\end{align*}"
})

const { typeset } = useMathJax(mathPanel, [placesML, transitionsML, labelsML, flowsML])

function handleElementCreate(event: any) {
  const el = event.element
  if (el.type === 'place') {
    places.value.push({ id: el.id, label: el.labelText || trimId(el.id), silent: el.silent || false })
  } else if (el.type === 'transition') {
    transitions.value.push({ id: el.id, label: el.labelText || trimId(el.id), silent: el.silent || false })
  } else if (el.type === 'flow') {
    flows.value.push({ id: el.id, src: el.source.id, tgt: el.target.id })
  }
}

function handleElementDelete(event: any) {
  const deleted: any[] = event.elements;
  const removed = new Set<string>()
  deleted.forEach((el) => {
    removed.add(el.id)
    if (el.type === 'place' || el.type === 'transition') {
      // flows attached to a removed node go with it
      flows.value
        .filter((f) => f.src === el.id || f.tgt === el.id)
        .forEach((f) => removed.add(f.id))
    }
  });
  places.value = places.value.filter((p) => !removed.has(p.id))
  transitions.value = transitions.value.filter((t) => !removed.has(t.id))
  flows.value = flows.value.filter((f) => !removed.has(f.id))
}

function updateTransition(el: any) {
  if (el.type !== 'transition') {
    return
  }
  const transition = transitions.value.find((t) => t.id === el.id)
  if (transition) {
    transition.label = el.labelText
    transition.silent = el.silent
  }
}

function handleElementChange(event: any) {
  if (event.elements) {
    event.elements.forEach(updateTransition)
  } else {
    updateTransition(event.element)
  }
}

function resetToEmpty() {
  places.value = []
  transitions.value = []
  flows.value = []
}

function toggleFullscreen() {
  container.value?.classList.toggle('fullscreen')
}

function copyToClip(hint: 'places' | 'transitions' | 'flow' | 'labels') {
  const text = {
    places: placesML,
    transitions: transitionsML,
    flow: flowsML,
    labels: labelsML,
  }[hint].value
  navigator.clipboard.writeText(text)
}

onMounted(() => {
  editor = EditorPN({
    container: canvas.value
  });

  // track the net's state for the formal definition panel. Listeners must return
  // undefined: a returned value would stop lower-priority diagram-js listeners.
  editor.invoke(['eventBus', function (bus: any) {
    bus.on('editor.fullscreen.toggle', 50, () => { toggleFullscreen() })
    bus.on(
      ['formal.create.place', 'formal.create.transition', 'formal.create.flow'],
      50, (ev: any) => { handleElementCreate(ev) }
    )
    bus.on(['pad.delete', 'elements.delete'], 50, (ev: any) => { handleElementDelete(ev) })
    bus.on(['element.changed', 'elements.changed'], 50, (ev: any) => { handleElementChange(ev) })
    bus.on(['formal.clear'], 50, () => { resetToEmpty() })
  }]);

  typeset()
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy();
    editor = null;
  }
})
</script>
    
<style lang="sass">
@use "@/styles/coloursAnt.sass" as c

// diagram-js mounts the context pad at runtime, so scoped styles do not reach it
.editor-content .editor-canvas
  .djs-context-pad
    .entry
      color: #000000
      &:hover
        color: c.$blue-7
</style>

<style lang="sass" scoped>
@use "./PN/scoped"
</style>