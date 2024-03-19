import { getLocation as getLocationApi } from '@tarojs/taro'
import { AuthScope, getSetting, openSetting } from '@/utils/setting'

export enum LocationType {
  WGS84 = 'wgs84',
  GCJ02 = 'gcj02',
}

export async function getLocation(
  message?: string | false,
  isHighAccuracy = false,
  option?: Omit<Taro.getLocation.Option, 'isHighAccuracy'>,
) {
  if (message !== false) {
    const result = await getSetting(AuthScope.USER_LOCATION)
    if (result === false) {
      await openSetting(message ?? '为了您获得更多佳体验，请授权您的具体位置信息')
      return getLocation(false)
    }
  }
  const location = await getLocationApi({
    type: LocationType.GCJ02,
    ...option,
    isHighAccuracy,
  })
  if (location.errMsg === 'getLocation:ok') return location
}

export async function getLocationSilently(
  isHighAccuracy = false,
  option?: Omit<Taro.getLocation.Option, 'isHighAccuracy'>,
) {
  try {
    if (await getSetting(AuthScope.USER_LOCATION)) {
      return await getLocationApi({
        type: LocationType.GCJ02,
        ...option,
        isHighAccuracy,
      })
    }
  } catch (_) {}
}
