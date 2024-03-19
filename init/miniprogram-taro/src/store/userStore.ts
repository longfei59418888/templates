import { createSelectorHooks } from '@/store/utils'
import { Token, UserInfo } from '@/types/user'
import { getUserInfo as baseGetUserInfo } from '@/api/user'

interface UserStoreStates {
  token?: Token
  userInfo?: UserInfo
}

interface UserStoreActions {
  setToken: (token: Token) => void
  getUserInfo: () => Promise<void>
  login: () => Promise<string>
}

export const useUserStore = createSelectorHooks<UserStoreStates, UserStoreActions>((set) => {
  const setToken = (token: Token) => set({ token })
  const getUserInfo = () => baseGetUserInfo().then((userInfo) => set({ userInfo }))
  const login = async () => {
    return 'token'
  }

  return {
    token: undefined,
    userInfo: undefined,
    setToken,
    getUserInfo,
    login,
  }
})
