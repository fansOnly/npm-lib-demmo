import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import { writeProjectManifest } from '@pnpm/write-project-manifest'
import { projRoot } from './paths'

/**
 * 获取全部的 package.json
 */
export const getWorkspacePackages = () => findWorkspacePackages(projRoot)

export const getPackageManifest = (pkgPath) => {
  return require(pkgPath)
}

/**
 * 写入 package.json 数据
 */
export const writePackageManifest = async (pkgPath, data = {}) => {
  await writeProjectManifest(pkgPath, data)
}

export const getPackageDependencies = (pkgPath) => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}
