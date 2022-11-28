import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { vLabOutput, vLabPackage, projRoot } from '@vitamins/build-utils'
import { withTaskName, run, runTask } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(vLabPackage, path.join(vLabOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vLabOutput, 'README.md')
    ),
  ])

export const copyFullStyle = async () => {
  await mkdir(path.resolve(vLabOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(vLabOutput, 'theme-chalk/index.css'),
    path.resolve(vLabOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vLabOutput, { recursive: true })),

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
