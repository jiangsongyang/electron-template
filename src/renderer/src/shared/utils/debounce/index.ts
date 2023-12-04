export const debounce = <T extends Function>(fn: T, delay: number = 100) => {
  let timer: number | null = null
  clearTimeout(timer!)
  timer = setTimeout(fn, delay)
}
