import { resolve } from 'path'
import { vLabOutput } from '@vitamins/build-utils'

export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(vLabOutput, 'es'),
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
      path: resolve(vLabOutput, 'lib'),
    },
    bundle: {
      path: `lib`,
    },
  },
}

export const buildConfigEntries = Object.entries(buildConfig)
