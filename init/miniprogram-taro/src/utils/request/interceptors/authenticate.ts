import { interceptor } from '@tarojs/taro'
import { useUserStore } from '@/store/userStore'
import { Request } from '@/utils/request'
import { HTTP_STATUS } from '@/constants/http.const'

const { getState } = useUserStore

export const authorization = (request: Request): interceptor => {
  return (chain) => {
    const { token } = getState()
    const Authorization = token
    const requestParams = chain.requestParams
    let { header = {}, url } = requestParams
    if (!request.skipAuthorizationApis.includes(url)) {
      if (!Authorization) {
        request.login()
        return request.addRetryQueue(requestParams)
      }
      header = {
        ...header,
        Authorization,
      }
    }

    return chain
      .proceed({
        ...requestParams,
        header,
      })
      .then((response) => {
        const { statusCode } = response
        if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
          request.login()
          return request.addRetryQueue(requestParams)
        }
        return response
      })
  }
}
