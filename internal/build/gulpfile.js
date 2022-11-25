import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import consola from 'consola'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import { withTaskName } from './src'
import { projRoot, vcOutput, vmRoot, vmPkgPath } from "@vitamin/build-utils"

const distBundle = path.resolve(vcOutput, 'mini-program')

export const copyFiles = () =>
  Promise.all([
    fs.copy(vmPkgPath, path.join(vcOutput, 'package.json')),
    fs.copy(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vcOutput, 'README.md')
    ),
  ])

function buildMiniProgram() {
  return src(path.resolve(vmRoot, 'src/**/*.vue'))
    .pipe(dest(distBundle))
}

function buildStyle() {
  const sass = gulpSass(dartSass)
  const noPrefixFile = /(index|base)/
  return src(path.resolve(vmRoot, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCss({}, details => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
        )
      })
    )
    .pipe(
      rename((path) => {
        if (!noPrefixFile.test(path.basename)) {
          path.basename = `vc-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
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
