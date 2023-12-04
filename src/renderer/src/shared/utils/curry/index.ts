export const curry = (func: (...args: any) => any, arity = func.length) => {
  const generateCurried = (prevArgs: any[]) => {
    return (nextArg: any) => {
      const args = [...prevArgs, nextArg]
      if (args.length >= arity) {
        return func(...args)
      } else {
        return generateCurried(args)
      }
    }
  }
  return generateCurried([])
}
