// vite.config.ts

import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

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
    formatting: 'none'
  }
})
