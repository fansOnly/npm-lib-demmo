import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import { writeProjectManifest } from '@pnpm/write-project-manifest'
import { projRoot } from './paths'

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)

export const getPackageManifest = pkgPath => {
  return require(pkgPath)
}

export const writePackageManifest = async (pkgPath, data = {}) => {
  await writeProjectManifest(pkgPath, data)
}

export function getPackageDependencies(pkgPath) {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export function excludeFiles(files) {
  const excludes = ['node_modules', 'dist', 'test', "gulpfile", 'mock']
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}
