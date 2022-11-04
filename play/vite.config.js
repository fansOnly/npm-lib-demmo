import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
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
