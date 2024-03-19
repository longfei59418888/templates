import { authorize as authorizeApi, getSetting as getSettingApi, openSetting as openSettingApi } from '@tarojs/taro'
import { showModal } from '@/utils/model'
import { error } from '@/utils/toast'

export enum AuthScope {
  CAMERA = 'scope.camera',
  RECORD = 'scope.record',
  USER_INFO = 'scope.userInfo',
  USER_LOCATION = 'scope.userLocation',
  WERUN = 'scope.werun',
  BLUETOOTH = 'scope.bluetooth',
  WRITE_PHOTOS_ALBUM = 'scope.writePhotosAlbum',
  USER_LOCATION_BACKGROUND = 'scope.startLocationUpdateBackground',
}

export const AuthScopeSubscription = 'scope.subscription'

export async function authorize(scope: AuthScope, check: boolean = true) {
  if (check) {
    const auth = await getSetting(scope)
    if (auth) return true
  }
  try {
    await authorizeApi({ scope })
    return true
  } catch (_) {
    return false
  }
}

const GET_SETTING_OK = 'getSetting:ok'

export const getSetting = async (scope?: AuthScope | typeof AuthScopeSubscription) => {
  try {
    const { authSetting, errMsg } = await getSettingApi({
      withSubscriptions: scope === AuthScopeSubscription,
    })

    if (!scope) {
      if (errMsg !== GET_SETTING_OK) return null
      return authSetting
    }
    if (errMsg !== GET_SETTING_OK) return false
    return authSetting?.[scope]
  } catch (_) {
    return false
  }
}

export const openSetting = async (
  content: string,
  option: Omit<Taro.showModal.Option, 'content'> = {},
  withSubscriptions = false,
) => {
  const { confirm, errMsg, cancel } = await showModal({
    content,
    cancelText: '取消',
    confirmText: '去设置',
    ...option,
  })
  if (cancel) return
  if (confirm) {
    await openSettingApi({
      withSubscriptions,
    })
    return true
  }
  if (errMsg) {
    error(errMsg)
    return
  }
}

export const openSettingWithSubscription = async (
  content: string,
  option: Omit<Taro.showModal.Option, 'content'> = {},
) => openSetting(content, option, true)
