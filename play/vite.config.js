import { defineConfig } from 'vite'
import { resolve } from 'path'
import Inspect from 'vite-plugin-inspect'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  resolve: {
    alias: [
      { find: 'vitamin-cc', replacement: resolve('node_modules/vitamin-cc/index.js') }
    ]
  },
  server: {
    port: 3000
  },
  plugins: [
    createVuePlugin(), // vue2
    Inspect(),
  ]
})
