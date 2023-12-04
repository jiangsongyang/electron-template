import { getType } from '../getType'

const scheduler = getType(setImmediate) === 'function' ? setImmediate : setTimeout

export const flushPromises = () =>
  new Promise(resolve => {
    scheduler(resolve)
  })
