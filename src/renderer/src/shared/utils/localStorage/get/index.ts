export const get = (key: string) => {
  const value = localStorage.getItem(key)
  if (value) {
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }
  return null
}
