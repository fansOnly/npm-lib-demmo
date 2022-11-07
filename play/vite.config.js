import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
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
    // vue(), // vue3
    // Components({
    //   resolvers: [
    //     (componentName) => {
    //       if (componentName.startsWith('Vc')) {
    //       return { name: componentName.slice(1), from: 'vitamincc' }
    //       }
    //     }
    //   ]
    // }),
    Inspect(),
  ]
})
