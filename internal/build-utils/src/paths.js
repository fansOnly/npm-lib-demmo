import { resolve } from 'path'

// ${root}
export const projRoot = resolve(__dirname, '..', '..', '..')
// ${root}/dist
export const vxOutput = resolve(projRoot, 'dist')
// ${root}/packages as @vitamin/*
export const pkgRoot = resolve(projRoot, 'packages')
// ${root}/packages/vitamin-wx
export const vxRoot = resolve(pkgRoot, 'vitamin-wx')
// ${root}/packages/theme-chalk as @vitamin/theme-chalk
export const themePath = resolve(vxOutput, 'theme-chalk')
// ${root}/internal/build as @vitamin/build
export const buildRoot = resolve(projRoot, 'internal', 'build')

// packages.json

// ${root}/vitamin-wx/package.json
export const vxPackage = resolve(vxRoot, 'package.json')
