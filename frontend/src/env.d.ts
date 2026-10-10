/// <reference types="vite/client" />

// Needed while some components still use plain <script> (no lang="ts")
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

interface Window {
  MathJax?: {
    typesetPromise: (elements?: Element[]) => Promise<void>
  }
}
