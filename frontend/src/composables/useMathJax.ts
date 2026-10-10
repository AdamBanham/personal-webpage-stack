import { nextTick, watch, type Ref, type WatchSource } from "vue"

/**
 * Re-typesets the MathJax markup inside `target` whenever any of `sources` change.
 *
 * MathJax is loaded globally from index.html. Typesets are chained so they never overlap,
 * and a failed typeset (e.g. MathJax still loading) does not block later ones.
 */
export function useMathJax(target: Readonly<Ref<HTMLElement | null>>, sources: WatchSource[]) {
  let typesetPromise: Promise<void> = Promise.resolve()

  function typeset() {
    nextTick(() => {
      typesetPromise = typesetPromise
        .then(() => {
          const mathjax = window.MathJax
          if (target.value && typeof mathjax?.typesetPromise === "function") {
            return mathjax.typesetPromise([target.value])
          }
        })
        .catch((err) => console.error("MathJax typeset failed", err))
    })
  }

  // flush: 'post' runs after Vue has written the new LaTeX strings into the DOM
  watch(sources, typeset, { flush: "post" })

  return { typeset }
}
