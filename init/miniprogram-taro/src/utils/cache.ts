export const cacheAsync = <T extends Function>(fn: T) => {
  let result, arg: string
  return new Proxy<typeof fn>(fn, {
    apply: async function (target, _thisArg, argArray: any[]) {
      if (result && arg === JSON.stringify(argArray)) return result
      result = await target(...argArray)
      arg = JSON.stringify(argArray)
      return result
    },
  }) as T
}

export const cache = <T extends Function>(fn: T) => {
  let result, arg: string
  return new Proxy<typeof fn>(fn, {
    apply: function (target, _thisArg, argArray: any[]) {
      if (result && arg === JSON.stringify(argArray)) return result
      result = target(...argArray)
      arg = JSON.stringify(argArray)
      return result
    },
  }) as T
}


