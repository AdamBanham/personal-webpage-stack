// vite.config.ts

import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import commonjs from '@rollup/plugin-commonjs'

const paths = path.resolve(__dirname, "./src")

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
		commonjs({
			include: ['node_modules/**'],
			transformMixedEsModules: true,
		}),
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
    // Support both TypeScript and JavaScript files like webpack
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    include: ['./src/**/*.ts', './src/**/*.js'],
    // Force include mixed JS/TS modules
    force: true
  },
  esbuild: {
    // Configure esbuild to handle mixed TS/JS properly
    include: /\.(ts|tsx|js|jsx)$/,
    exclude: [],
    loader: 'ts'
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        // Ensure proper module resolution for mixed environments
        format: 'es'
      }
    },
    // Enable source maps for debugging mixed TS/JS
    sourcemap: true,
    // Ensure compatibility with mixed module types
    target: 'es2020'
  }
})