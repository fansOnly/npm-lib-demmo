import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const vuiRoot = resolve(pkgRoot, 'vitamin-ui')
export const vuiOutput = resolve(projRoot, 'dist')
export const vuiPackage = resolve(vuiRoot, 'package.json')
export const themePath = resolve(vuiOutput, 'theme-chalk')
export const buildRoot = resolve(projRoot, 'internal/build')
