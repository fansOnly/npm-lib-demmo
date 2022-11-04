import path from 'path'
import glob from "fast-glob"

export const prjRoot = path.resolve(__dirname, '..', '..')
export const pkgRoot = path.resolve(prjRoot, 'packages')
export const vcRoot = path.resolve(pkgRoot, 'vitamin-cc')
export const vcOutput = path.resolve(prjRoot, 'dist')
export const vcPkgPath = path.resolve(vcRoot, 'package.json')

export function getPackageDependencies() {
  const manifest = require(vcPkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export function generateExternal() {
  const { dependencies, peerDependencies } = getPackageDependencies()

  return (id) => {
    const packages = peerDependencies
    packages.push('@vue', ...dependencies)
    return [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`))
  }
}

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
