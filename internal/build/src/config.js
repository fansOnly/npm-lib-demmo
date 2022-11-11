import { resolve } from 'path'
import { vcOutput } from '@vitamin/build-utils'

export const buildConfig = {
  esm: {
    format: 'es',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(vcOutput, 'es')
    }
  },
  cjs: {
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(vcOutput, 'lib')
    }
  }
}
