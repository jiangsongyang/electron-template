import { getType } from '../../getType'
export const set = (key: string, value: any) => {
  let _v: string | null = null
  switch (getType(value)) {
    case 'map':
      _v = JSON.stringify(Array.from(value.entries()))
      break
    case 'object':
      _v = JSON.stringify(value)
      break
    default:
      _v = value
  }

  localStorage.setItem(key, _v as string)
}
