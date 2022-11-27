import path from 'path'
import { mkdir } from 'fs/promises'
import fs from 'fs-extra'
import { dest, parallel, series, src } from 'gulp'
import { run, withTaskName } from './src'
import { projRoot, vxOutput, vxRoot, vxPackage, pkgRoot } from "@vitamin/build-utils"

// ${root}/dist/wx-mp
const distBundle = path.resolve(vxOutput, 'wx-mp')

export const copyFiles = () =>
  Promise.all([
    fs.copySync(vxPackage, path.join(vxOutput, 'package.json')),
    fs.copySync(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vxOutput, 'README.md')
    ),
    fs.copySync(
      path.resolve(vxRoot, 'index.js'),
      path.resolve(vxOutput, 'index.js')
    ),
    fs.copySync(
      path.resolve(vxRoot, 'version.js'),
      path.resolve(vxOutput, 'version.js')
    ),
  ])

function buildMiniProgram() {
  return src(path.resolve(pkgRoot, 'components/**'))
    .pipe(dest(distBundle))
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vxOutput, { recursive: true })),

  withTaskName('buildThemeChalk', () =>
    run('pnpm run -C packages/theme-chalk build')
  ),

  parallel(
    buildMiniProgram,
    copyFiles
  ),
)
