import { ERR_NO } from '@/constants/wechat/errno'

export const ErrnoToMsg = (code: string | number) => {
  return ERR_NO[code + '']
}
