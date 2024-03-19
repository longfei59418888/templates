import { HTTP_STATUS } from '@/constants/http.const'
import { interceptor } from '@tarojs/taro'

export const errorMessage = (): interceptor => (chain) => {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams).then(async (response) => {
    const { statusCode } = response
    if (statusCode !== HTTP_STATUS.SUCCESS) {
      throw response
    }
    return response
  })
}
