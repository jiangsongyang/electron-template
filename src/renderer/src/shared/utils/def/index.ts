const DEFAULT_ATTRIBUTES = {
  writable: true,
  enumerable: true,
  configurable: true,
}

export const def = <T>(obj: object, key: string, value: T, attribute = DEFAULT_ATTRIBUTES) =>
  Object.defineProperty(obj, key, {
    value,
    ...attribute,
  })
