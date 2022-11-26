import path from 'path'
import { mkdir } from 'fs/promises'
import fs from 'fs-extra'
import { dest, parallel, series, src } from 'gulp'
import { run, withTaskName } from './src'
import { projRoot, vcOutput, vmRoot, vmPkgPath } from "@vitamin/build-utils"

// ${root}/dist/weixin
const distBundle = path.resolve(vcOutput, 'weixin')

export const copyFiles = () =>
  Promise.all([
    fs.copySync(vmPkgPath, path.join(vcOutput, 'package.json')),
    fs.copySync(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vcOutput, 'README.md')
    ),
  ])

function buildMiniProgram() {
  return src(path.resolve(vmRoot, 'src/**/*.vue'))
    .pipe(dest(distBundle))
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vcOutput, { recursive: true })),

  withTaskName('buildThemeChalk', () =>
    run('pnpm run -C packages/theme-chalk build')
  ),

  parallel(
    buildMiniProgram,
    copyFiles
  ),
)
