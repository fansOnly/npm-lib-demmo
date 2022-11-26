import { resolve } from 'path'

// ${root}
export const projRoot = resolve(__dirname, '..', '..', '..')

// ${root}/dist
export const vcOutput = resolve(projRoot, 'dist')

// ${root}/packages
export const pkgRoot = resolve(projRoot, 'packages')

// ${root}/packages/vitamin-cc as
export const vcRoot = resolve(pkgRoot, 'vitamin-cc')

// ${root}/vitamin-cc/package.json
export const vcPkgPath = resolve(vcRoot, 'package.json')

// ${root}/packages/vitamin-weixin
export const vmRoot = resolve(pkgRoot, 'vitamin-weixin')

// ${root}/packages/vitamin-weixin/package.json
export const vmPkgPath = resolve(vmRoot, 'package.json')

// ${root}/packages/theme-chalk as @vitamin/theme-chalk
export const themePath = resolve(vcOutput, 'theme-chalk')

// ${root}/internal/build
export const buildRoot = resolve(projRoot, 'internal', 'build')
