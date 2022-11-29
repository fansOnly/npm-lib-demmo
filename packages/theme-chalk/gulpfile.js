import path from 'path'
import chalk from 'chalk'
import consola from 'consola'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import rename from 'gulp-rename'
import { vuiOutput } from '@vitamins/build-utils'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(vuiOutput, 'theme-chalk')

function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noPrefixFile = /(index|base)/
  return src(path.resolve(__dirname, 'src/*.scss'))
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
          path.basename = `vui-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export function copyThemeChalkFile() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build = parallel(
  copyThemeChalkFile,
  series(buildThemeChalk, copyThemeChalkBundle)
)

export default build
