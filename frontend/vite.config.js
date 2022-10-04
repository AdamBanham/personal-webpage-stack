// vite.config.js

import { defineConfig } from 'vite'
const path = require("path");
import vue from '@vitejs/plugin-vue'

var paths = path.resolve(__dirname, "./src")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      ignored: ['**/node_modules/**'],
      usePolling: true
    },
    
  },
  resolve: {
    alias: {
      "@" : paths,
    },
  }
})