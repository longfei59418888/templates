const moduleName = '__M__'

if (requestIdleCallback)
  requestIdleCallback(
    (deadline) => {
      if (deadline.timeRemaining() > 0) {
        Object.keys(localStorage).forEach((item) => get(item))
      }
    },
    {
      timeout: 100,
    },
  )
else Object.keys(localStorage).forEach((item) => get(item))

export const set = (
  attr: string,
  data: NonNullable<any> = 0,
  timeOut?: number,
) => {
  if (timeOut !== undefined) timeOut = new Date().getTime() + timeOut * 1000
  data = JSON.stringify({ data, timeOut })
  localStorage.setItem(attr, data)
}

export function get<T = null>(attr: string) {
  const data = localStorage.getItem(attr)
  if (data === null || data === '') return null
  try {
    const result: {
      data: T
      timeOut: number
    } = JSON.parse(data)
    const now = new Date().getTime()
    if (now > result?.timeOut) {
      remove(attr)
      return null
    }
    return result.data
  } catch (e) {
    return null
  }
}

export function remove(attr: string) {
  localStorage.removeItem(attr)
}

export const clear = () => {
  localStorage.clear()
}

export class Storages {
  static storageMaps: Record<string, Storages> = {}
  prefixName: string
  timeOut: number | undefined

  constructor(prefixName: string, timeOut?: number) {
    Storages.storageMaps[prefixName] = this
    this.prefixName = `${moduleName}__${prefixName}--`
    this.timeOut = timeOut || undefined
  }

  get<T>(attr: string) {
    return get<T>(this.getAttrName(attr))
  }

  set(attr: string, data: NonNullable<any> = 0, outTime?: number) {
    const { getAttrName, timeOut } = this
    set(getAttrName(attr), data, outTime || timeOut)
  }

  remove(attr: string) {
    remove(this.getAttrName(attr))
  }

  clear = () => {
    Object.keys(localStorage).forEach((item) => {
      if (new RegExp(`^${this.prefixName}`).test(item)) {
        remove(item)
      }
    })
  }

  private getAttrName(attr: string) {
    return `${this.prefixName + attr}`
  }

  static getStorage(prefixName: string, timeOut?: number): Storages {
    if (Storages.storageMaps[prefixName])
      return Storages.storageMaps[prefixName]
    else {
      return new Storages(prefixName, timeOut)
    }
  }
}

export default new Storages('G')
