import { resolve } from 'path'
import { vuiOutput } from '@vitamins/build-utils'

export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(vuiOutput, 'es'),
    },
    bundle: {
      path: `es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(vuiOutput, 'lib'),
    },
    bundle: {
      path: `lib`,
    },
  },
}

export const buildConfigEntries = Object.entries(buildConfig)
