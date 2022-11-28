import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { vuiOutput, vLabPackage, projRoot } from '@vitamins/build-utils'
import { withTaskName, run, runTask } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(vLabPackage, path.join(vuiOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vuiOutput, 'README.md')
    ),
  ])

export const copyFullStyle = async () => {
  await mkdir(path.resolve(vuiOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(vuiOutput, 'theme-chalk/index.css'),
    path.resolve(vuiOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vuiOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      // copyFullStyle
    )
  ),

  parallel(copyFiles)
)

export * from './src'
