import { post } from '@/utils/request'
import { EXCHANGE_PHONE_NUMBER, EXCHANGE_TOKEN_WITH_CODE, GET_USERINFO } from '@/constants/api.const'
import { Token, UserInfo } from '@/types/user'

export const exchangeTokenWithCode = (code: string) => post<{ token: Token }>(EXCHANGE_TOKEN_WITH_CODE, { code })
export const exchangePhoneNumberWithCode = (code: string) => {
  return post(EXCHANGE_PHONE_NUMBER, { code })
}

export const getUserInfo = () => post<UserInfo>(GET_USERINFO)
