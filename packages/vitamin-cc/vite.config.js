import { defineConfig } from "vite"
import { createVuePlugin } from 'vite-plugin-vue2'
import { generateExternal, createRollupConfig, generateEntryFiles, excludeFiles } from './build-utils'

export default defineConfig(async () => {
  const input = excludeFiles(await generateEntryFiles({ deep: 2 }))

  return {
    build: {
      lib: {
        entry: './index.js',
        name: 'vitamin-cc'
      },
      emptyOutDir: true,
      rollupOptions: {
        input,
        output: createRollupConfig(),
        external: generateExternal(),
      }
    },
    plugins: [
      createVuePlugin()
    ]
  }
})
