// vite.config.ts

import { defineConfig } from 'vite'
import * as path from 'path'
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
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    sourcemap: true,
    target: 'es2020'
  }
})
