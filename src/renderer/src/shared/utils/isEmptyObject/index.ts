import { getType } from '../getType'

export const isEmptyObject = (target: any) =>
  getType(target) === 'object' && JSON.stringify(target) === '{}'
