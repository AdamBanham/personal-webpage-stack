import { useRoute } from "vue-router"

/**
 * Copies text to the clipboard, falling back to a hidden textarea when the
 * async clipboard API is unavailable (e.g. non-secure contexts).
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const helper = document.createElement("textarea")
  helper.value = text
  helper.style.position = "fixed"
  helper.style.left = "-9999px"
  document.body.appendChild(helper)
  helper.focus()
  helper.select()
  document.execCommand("copy")
  document.body.removeChild(helper)
}

/**
 * Copies a link to an anchor on the current page, e.g. https://adambanham.io/pubs#year-2025.
 */
export function useShareLink() {
  const route = useRoute()

  async function copyShareLink(anchorId: string): Promise<void> {
    const fullPath = route.fullPath.split("#")[0]
    await copyToClipboard(`${window.location.origin}${fullPath}#${anchorId}`)
  }

  return { copyShareLink }
}
