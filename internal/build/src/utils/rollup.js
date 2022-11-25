import { buildConfig } from '../config'
import { getPackageDependencies, vcRoot } from '@vitamin/build-utils'

export function createRollupConfig() {
  return Object.entries(buildConfig).map(([module, config]) => {
    return {
      format: config.format,
      dir: config.output.path,
      exports: module === 'cjs' ? 'named' : undefined,
      entryFileNames: `[name].${config.ext}`,
      preserveModules: true,
      preserveModulesRoot: vcRoot,
      sourcemap: true,
      globals: module === 'cjs' ? { 'vitamin-cc': 'Vc' } : {}
    }
  })
}

export function generateExternal(options = {}) {
  const { dependencies, peerDependencies } = getPackageDependencies()

  return (id) => {
    const packages = peerDependencies
    // packages.push('@vue', ...dependencies)
    return [...new Set(packages)].some(pkg => id === pkg || id?.startsWith(`${pkg}/`))
  }
}
