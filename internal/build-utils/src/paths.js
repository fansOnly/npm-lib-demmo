import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const vcRoot = resolve(pkgRoot, 'vitamin-cc')
export const vcOutput = resolve(projRoot, 'dist')
export const vcPackage = resolve(vcRoot, 'package.json')
export const themePath = resolve(vcOutput, 'theme-chalk')
export const buildRoot = resolve(projRoot, 'internal/build')
