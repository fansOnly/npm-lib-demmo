const INSTALLED_KEY = Symbol()

export function makeInstaller(components) {
  const install = function(app) {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))
  }

  return {
    install
  }
}
