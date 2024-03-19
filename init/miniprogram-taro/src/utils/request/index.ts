import Taro, { request as api, interceptor, addInterceptor } from '@tarojs/taro'
import { useUserStore } from '@/store/userStore'
export type RequestConfig = {
  baseUrl?: string
}

export interface Options {
  interceptors?: interceptor[]
  skipAuthorizationApis?: string[]
  login: (code: string) => Promise<unknown>
}

type MethodOption<T, U extends string | TaroGeneral.IAnyObject | ArrayBuffer> = Omit<
  Taro.request.Option<T, U>,
  'url' | 'method' | 'success' | 'fail' | 'complete' | 'data'
>

export class Request {
  private refreshing: boolean = false
  public skipAuthorizationApis: string[]
  public config: RequestConfig
  public queue: Array<() => void> = []
  public options: Options
  constructor(config: RequestConfig & Partial<Omit<MethodOption<unknown, string>, 'data'>> = {}, options: Options) {
    const { interceptors = [], skipAuthorizationApis = [] } = options
    this.config = config
    this.skipAuthorizationApis = skipAuthorizationApis
    this.options = options
    interceptors.forEach((interceptor) => addInterceptor(interceptor))
  }

  request<T>(arg): Promise<T> {
    return api(arg).then((result) => result.data)
  }

  get = <T, U = unknown>(url: string, data?: U, option?: MethodOption<T, any>): Promise<T> =>
    this.request<T>({
      url,
      data,
      method: 'GET',
      ...this.config,
      ...option,
    })

  post = <T, U = unknown>(url: string, data?: U, option?: MethodOption<T, any>) =>
    this.request<T>({
      url,
      method: 'POST',
      data,
      ...this.config,
      ...option,
    })

  login() {
    if (this.refreshing) return
    this.refreshing = true
    Taro.login()
      .then(async ({ code }) => {
        await this.options.login(code)
        this.refreshing = false
        this.retryQueue()
      })
      .catch((e) => {
        this.refreshing = false
        throw e
      })
  }

  addRetryQueue(requestParams) {
    let retry
    const fetch = new Promise((resolve, reject) => {
      retry = () => {
        Taro.request(requestParams)
          .then(resolve, reject)
          .catch((e) => reject(e))
      }
    })
    this.queue.push(retry)
    return fetch
  }

  retryQueue() {
    let retry = this.queue.shift()
    while (retry) {
      retry()
      retry = this.queue.shift()
    }
  }
}

const request: Request = new Request(
  { baseUrl: '' },
  {
    login: useUserStore.getState().login,
  },
)

export const get = request.get
export const post = request.post

export default request
