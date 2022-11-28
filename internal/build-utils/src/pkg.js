import glob from "fast-glob"
import { pkgRoot } from './paths'

export const getPackageManifest = pkgPath => {
  return require(pkgPath)
}

export function getPackageDependencies(pkgPath) {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export async function generateEntryFiles(options) {
  const files = await glob('**/index.{js,ts,vue}', {
    cwd: pkgRoot,
    absolute: true,
    onlyFiles: true,
    ...options
  })
  return files
}

export function excludeFiles(files) {
  const excludes = ['node_modules', 'dist', '__tests__', 'mock']
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}
