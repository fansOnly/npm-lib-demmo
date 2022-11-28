import path from 'path'
import { writeFile } from 'fs/promises'
import consola from 'consola'
import chalk from 'chalk'
import { getPackageManifest, getWorkspacePackages, vLabOutput, vLabRoot } from '@vitamins/build-utils'

let shouldUpdate = true

function getProjectPackage(projRoot) {
  return getPackageManifest(path.resolve(projRoot, 'package.json'))
}

function getVersion() {
  let pkg
  try {
    pkg = getProjectPackage(vLabOutput)
  } catch (error) {
    pkg = getProjectPackage(vLabRoot)
    shouldUpdate = false
  }
  return pkg.version
}

const version = getVersion()

async function main() {
  consola.log(`🚀 ™ Version: ${version}`)
  if (!shouldUpdate) return

  await writeFile(
    path.resolve(vLabRoot, 'version.js'),
    `export const version = '${version}'\n`
  )

  consola.debug(chalk.yellow(`Updating package.json for vitamin-ui`))

  const pkgs = Object.fromEntries(
    (await getWorkspacePackages()).filter(pkg => !!pkg.manifest.name).map((pkg) => [pkg.manifest.name, pkg])
  )

  const vitaminUI = pkgs['vitamin-ui']

  const writeVersion = async (project) => {
    await project.writeProjectManifest({
      ...project.manifest,
      version
    })
  }

  try {
    writeVersion(vitaminUI)
  } catch (error) {
    consola.error(error)
  }
}

main()
