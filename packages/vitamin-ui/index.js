import installer from './defaults'
export * from '@vitamins/components'
export * from '@vitamins/tokens'
export * from './make-installer'

export const install = installer.install
export const version = installer.version

export default installer
