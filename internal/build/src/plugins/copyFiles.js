import path from 'path'
import { copy } from 'fs-extra'
import { projRoot, vcPackage, vcOutput } from '@vitamin/build-utils'

export function copyFiles() {
  Promise.all([
    copy(vcPackage, path.join(vcOutput, 'package.json')),
    copy(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vcOutput, 'README.md')
    )
  ])
}
