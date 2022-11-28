import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const vLabRoot = resolve(pkgRoot, 'vitamin-ui')
export const vLabOutput = resolve(projRoot, 'dist')
export const vLabPackage = resolve(vLabRoot, 'package.json')
export const themePath = resolve(vLabOutput, 'theme-chalk')
export const buildRoot = resolve(projRoot, 'internal/build')
