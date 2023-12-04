export const deepClone = <T>(target: T) => {
  const map = new WeakMap()

  function isObject(target: T) {
    return (typeof target === 'object' && target) || typeof target === 'function'
  }

  function clone(data: any): T {
    if (!isObject(data)) {
      return data
    }

    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data)
    }

    if (typeof data === 'function') {
      /* eslint-disable no-new-func  */
      return new Function(`return ${data.toString()}`)()
    }

    const exist = map.get(data)
    if (exist) {
      return exist
    }

    if (Array.isArray(data)) {
      const ary: any[] = []
      for (let i = 0; i < data.length; i++) {
        ary.push(clone(data[i]))
      }
      return ary as any
    }

    if (data instanceof Map) {
      const result = new Map()
      map.set(data, result)
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val))
        } else {
          result.set(key, val)
        }
      })
      return result as any
    }

    if (data instanceof Set) {
      const result = new Set()
      map.set(data, result)
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val))
        } else {
          result.add(val)
        }
      })
      return result as any
    }

    const keys = Reflect.ownKeys(data)
    const allDesc = Object.getOwnPropertyDescriptors(data)
    const result = Object.create(Object.getPrototypeOf(data), allDesc)

    map.set(data, result)

    keys.forEach((key) => {
      const val = data[key]
      if (isObject(val)) {
        result[key] = clone(val)
      } else {
        result[key] = val
      }
    })
    return result
  }

  return clone(target)
}
