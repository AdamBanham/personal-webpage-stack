// vite.config.js

import { defineConfig } from 'vite'
const path = require("path");
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      ignored: ['!**/node_modules/your-package-name/**'],
      usePolling: true
    },
    
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})