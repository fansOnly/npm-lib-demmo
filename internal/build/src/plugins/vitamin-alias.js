/**
 * https://rollupjs.org/guide/en/#a-simple-example
 */
export function vitaminAlias() {
  const themeChalk = 'theme-chalk'
  const sourcePath = `@vitamins/${themeChalk}`
  const bundlePath = `vitamins/${themeChalk}`

  return {
    name: 'vitamin-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourcePath)) return
      return {
        id: id.replaceAll(sourcePath, bundlePath),
        external: 'absolute'
      }
    }
  }
}
