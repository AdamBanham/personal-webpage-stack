// vite.config.js

import { defineConfig } from 'vite'
const path = require("path");
import vue from '@vitejs/plugin-vue'

var paths = path.resolve(__dirname, "./src")

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify(
    { autoImport: true,
      theme: {
      defaultTheme: 'dark'
    }}),
	],
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