import { resolve } from 'path'

// ${root}
export const projRoot = resolve(__dirname, '..', '..', '..')
// ${root}/dist
export const vcOutput = resolve(projRoot, 'dist')
// ${root}/packages as @vitamin/*
export const pkgRoot = resolve(projRoot, 'packages')
// ${root}/packages/vitamin-cc
export const vcRoot = resolve(pkgRoot, 'vitamin-cc')
// ${root}/packages/vitamin-wx
export const vmRoot = resolve(pkgRoot, 'vitamin-wx')
// ${root}/packages/theme-chalk as @vitamin/theme-chalk
export const themePath = resolve(vcOutput, 'theme-chalk')
// ${root}/internal/build as @vitamin/build
export const buildRoot = resolve(projRoot, 'internal', 'build')

// packages.json

// ${root}/vitamin-cc/package.json
export const vcPackage = resolve(vcRoot, 'package.json')
// ${root}/vitamin-wx/package.json
export const vmPackage = resolve(vmRoot, 'package.json')
