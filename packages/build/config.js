import { getPackageDependencies } from './pkg'

export const buildConfig = {
  esm: {
    format: 'es',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(vcOutput, 'es')
    }
  },
  cjs: {
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(vcOutput, 'lib')
    }
  }
}

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

export function generateExternal() {
  const { dependencies, peerDependencies } = getPackageDependencies()

  return (id) => {
    const packages = peerDependencies
    packages.push('vue', ...dependencies)
    return [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`))
  }
}
