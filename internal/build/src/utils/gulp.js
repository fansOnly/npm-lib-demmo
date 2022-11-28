import { buildRoot } from '@vitamin-lab/build-utils'
import { run } from './process'

export const withTaskName = (name, fn) =>
  Object.assign(fn, { displayName: name })

export const runTask = (name) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  )
