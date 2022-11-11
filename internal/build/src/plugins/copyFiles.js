import path from 'path'
import { copy } from 'fs-extra'
import { prjRoot, vcPkgPath, vcOutput } from '@vitamin/build-utils'

export function copyFiles() {
  Promise.all([
    copy(vcPkgPath, path.join(vcOutput, 'package.json')),
    copy(
      path.resolve(prjRoot, 'README.md'),
      path.resolve(vcOutput, 'README.md')
    )
  ])
}
