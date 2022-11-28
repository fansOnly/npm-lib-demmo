import { getPackageDependencies, vLabPackage } from '@vitamins/build-utils'

export function generateExternal(options = {}) {
  const { dependencies, peerDependencies } = getPackageDependencies(vLabPackage)

  return (id) => {
    const packages = peerDependencies
    // packages.push('@vue', ...dependencies)
    return [...new Set(packages)].some(pkg => id === pkg || id?.startsWith(`${pkg}/`))
  }
}

export function writeBundles(bundle, options) {
  return Promise.all(options.map(option => bundle.write(option)))
}
