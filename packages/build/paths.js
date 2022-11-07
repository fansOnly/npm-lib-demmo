import { resolve } from 'path'

export const prjRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(prjRoot, 'packages')
export const vcRoot = resolve(pkgRoot, 'vitamin-cc')
export const vcOutput = resolve(prjRoot, 'dist')
export const vcPkgPath = resolve(vcRoot, 'package.json')
