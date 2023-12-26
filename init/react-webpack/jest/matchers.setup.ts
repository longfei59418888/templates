// @ts-ignore
global.localStorage = {
  length: 1,
  clear: () => {},
  getItem: (key: string) => {
    return ''
  },
  // @ts-ignore
  key: (key: number) => {},
  removeItem: (key: string) => {},
  setItem: (key: string, value: string) => {},
}
