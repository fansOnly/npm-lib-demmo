import { resolve } from 'path'
import { vcOutput } from '@vitamin/build-utils'

export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(vcOutput, 'es'),
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
      path: resolve(vcOutput, 'lib'),
    },
    bundle: {
      path: `lib`,
    },
  },
}

export const buildConfigEntries = Object.entries(buildConfig)
