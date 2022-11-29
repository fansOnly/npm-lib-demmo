import { NOOP } from './utils'

export const withInstall = (main, extra = {}) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra)]) {
      app.component(comp.name, comp)
    }
  }
  return main
}

export const withNoopInstall = (component) => {
  component.install = NOOP
  return component
}
