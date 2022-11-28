import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { vcOutput, vcPackage, projRoot } from '@vitamin/build-utils'
import { withTaskName, run, runTask } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(vcPackage, path.join(vcOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vcOutput, 'README.md')
    ),
  ])

export const copyFullStyle = async () => {
  await mkdir(path.resolve(vcOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(vcOutput, 'theme-chalk/index.css'),
    path.resolve(vcOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vcOutput, { recursive: true })),

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
