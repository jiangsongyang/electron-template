import { getType } from '../getType'

export const isEqual = (a: any, b: any): boolean => {
  if (getType(a) !== getType(b)) {
    return false
  } else {
    if (getType(a) === 'array') {
      if (a.length !== b.length) {
        return false
      }
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) {
          return false
        }
      }
    }
    if (getType(a) === 'object') {
      const aKeys = Object.keys(a)
      const bKeys = Object.keys(b)
      if (aKeys.length !== bKeys.length) {
        return false
      }
      for (let i = 0; i < aKeys.length; i++) {
        if (!isEqual(a[aKeys[i]], b[aKeys[i]])) {
          return false
        }
      }
    }
    if (getType(a) === 'string' || getType(a) === 'number' || getType(a) === 'boolean') {
      return a === b
    }
  }
  return true
}
