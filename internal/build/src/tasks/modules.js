import { rollup } from 'rollup'
import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import glob from 'fast-glob'
import { excludeFiles, pkgRoot, vcRoot } from '@vitamin/build-utils'
import { generateExternal, writeBundles } from '../utils'
import { buildConfigEntries } from '../build-info'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      createVuePlugin(),
      vueJsx(),
      nodeResolve({
        preferBuiltins: true,
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      postcss(),
      json(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'js',
        },
      }),
    ],
    external: await generateExternal(),
    treeshake: false,
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]) => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: vcRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}
