import glob from "fast-glob"

export const getPackageManifest = pkgPath => {
  return require(pkgPath)
}

export function getPackageDependencies() {
  const manifest = getPackageManifest(vcPkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export async function generateEntryFiles(options) {
  const files = await glob('**/index.{js,ts,vue,scss,css}', {
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