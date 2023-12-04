export const getType = (t: any) => Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
