// vite.config.ts

import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile, rm } from 'node:fs/promises'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

const outDir = fileURLToPath(new URL('./dist', import.meta.url))

/**
 * Writes dist/spa.html: the prerendered home page with its #app content removed.
 * CloudFront serves it for routes that are not prerendered (editors, blog articles, ...),
 * so those pages mount from an empty shell instead of flashing the home page markup.
 */
async function writeSpaShell() {
  const html = await readFile(`${outDir}/index.html`, 'utf8')
  const start = html.indexOf('<div id="app"')
  const end = html.lastIndexOf('</div>', html.indexOf('</body>'))
  if (start < 0 || end < start) {
    throw new Error('[spa-shell] could not find #app in dist/index.html')
  }
  const shell = html.slice(0, start) + '<div id="app"></div>' + html.slice(end + '</div>'.length)
  await writeFile(`${outDir}/spa.html`, shell)
  // build-time only (ssr-manifest.json); keep it out of the deployed bucket
  await rm(`${outDir}/.vite`, { recursive: true, force: true })
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  server: {
    watch: {
      ignored: ['**/node_modules/**'],
      usePolling: true
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    sourcemap: true,
    target: 'es2020'
  },
  ssr: {
    // vuetify imports its own .css files, which Node cannot load during prerendering
    noExternal: ['vuetify']
  },
  // https://github.com/antfu-collective/vite-ssg
  ssgOptions: {
    // static content pages only; editors and process-mining stay client-rendered
    includedRoutes: () => ['/', '/contact', '/pubs', '/blog'],
    // writes contact/index.html etc., which S3 static hosting serves for /contact
    dirStyle: 'nested',
    formatting: 'none',
    onFinished: writeSpaShell
  }
})
