import path from 'path'
import { writeFile } from 'fs/promises'
import fs from 'fs-extra'
import consola from 'consola'
import stripJsonComments from 'strip-json-comments'
import { getPackageManifest, vcOutput, vmRoot } from '@vitamin/build-utils'

function getPkg(root) {
  return getPackageManifest(path.resolve(root, 'package.json'))
}

function getVersion() {
  let version
  try {
    const pkg = getPkg(vcOutput)
    version = pkg.version
  } catch (error) {
    consola.log('error: ', error)
    version = getPkg(vmRoot)
  }
  return version
}

const version = getVersion()

async function main() {
  consola.info(`🚀 ™ Version: ${version}`)
  await writeFile(
    path.resolve(vmRoot, 'version.js'),
    `export const version = '${version}'\n`
  )

  const vmPackage = path.resolve(vmRoot, 'package.json')
  let data = await fs.readFileSync(vmPackage, 'utf8')
  data = parseJson(data)
  data.version = version
  fs.writeJsonSync(vmPackage, data, { spaces: '\t' })
}

main()

function parseJson(content) {
  if (typeof content === 'string') {
    content = JSON.parse(stripJsonComments(content))
  }

  content = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return JSON.parse(content)
}
