import path from 'path'
import { writeFile } from 'fs/promises'
import consola from 'consola'
import chalk from 'chalk'
import { getPackageManifest, getWorkspacePackages, vcOutput, vmRoot } from '@vitamin/build-utils'

let shouldUpdate = true

function getProjectPackage(projRoot) {
  return getPackageManifest(path.resolve(projRoot, 'package.json'))
}

function getVersion() {
  let pkg
  try {
    pkg = getProjectPackage(vcOutput)
  } catch (error) {
    pkg = getProjectPackage(vmRoot)
    shouldUpdate = false
  }
  return pkg.version
}

const version = getVersion()

async function main() {
  consola.log(`🚀 ™ Version: ${version}`)
  if (!shouldUpdate) return

  await writeFile(
    path.resolve(vmRoot, 'version.js'),
    `export const version = '${version}'\n`
  )

  consola.debug(chalk.yellow(`Updating package.json for vitamin-weixin`))

  const pkgs = Object.fromEntries(
    (await getWorkspacePackages()).filter(pkg => !!pkg.manifest.name).map((pkg) => [pkg.manifest.name, pkg])
  )

  const vitaminWeixin = pkgs['vitamin-weixin']

  const writeVersion = async (project) => {
    await project.writeProjectManifest({
      ...project.manifest,
      version
    })
  }

  try {
    writeVersion(vitaminWeixin)
  } catch (error) {
    consola.error(error)
  }
}

main()
