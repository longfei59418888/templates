import { useCallback, useState } from 'react'
import { ErrnoToMsg } from '@/utils/wechat'
import { showLoading, hideLoading } from '@tarojs/taro'
import { exchangePhoneNumberWithCode } from '@/api/user'
import { useUserStore } from '@/store/userStore'

export const useGetPhoneNumber = () => {
  const getUserInfo = useUserStore.useGetUserInfo()
  const [loading, setLoading] = useState<boolean>(false)
  const onGetPhoneNumber = useCallback(
    async ({ detail }) => {
      setLoading(true)
      const { code, errno } = detail
      console.log(detail)
      await showLoading({ title: '加载中' })
      try {
        if (errno != 0) {
          // todo 展示错误信息
          ErrnoToMsg(errno)
          setLoading(false)
          return
        }
        await exchangePhoneNumberWithCode(code)
        void getUserInfo()
      } catch (_e) {
        console.log(_e)
      }
      await hideLoading()
      setLoading(false)
    },
    [getUserInfo, loading],
  )
  return {
    onGetPhoneNumber,
    loading,
  }
}
