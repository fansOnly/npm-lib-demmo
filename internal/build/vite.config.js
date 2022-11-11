import { defineConfig } from "vite"
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'
import { generateExternal, createRollupConfig } from './src/index'
import { generateEntryFiles, excludeFiles, vcRoot } from '@vitamin/build-utils'
import { copyFiles } from './src/plugins/copyFiles'

export default defineConfig(async () => {
  const input = excludeFiles(await generateEntryFiles({ deep: 2 }))

  return {
    build: {
      lib: {
        entry: resolve(vcRoot, './index.js'),
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
      createVuePlugin(),
      copyFiles()
    ]
  }
})
