import { getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro'

interface SystemInfo extends Taro.getSystemInfoSync.Result {
  menuButton: Taro.getMenuButtonBoundingClientRect.Rect
  navHeight: number
  operationBarHeight: number
  isIPad: boolean
  isIOS: boolean
  exchangePixelRatio: (value: number, type?: boolean) => string
  isAndroid: boolean
}

const getSystemInfo = () => {
  const systemInfo = getSystemInfoSync()
  const menuButtonBoundingClientRect = getMenuButtonBoundingClientRect()
  const { system, model } = systemInfo
  const isIOS = system.indexOf('iOS') > -1
  const pixelRatio = 750 / systemInfo.windowWidth
  return {
    ...systemInfo,
    menuButton: menuButtonBoundingClientRect,
    isIOS,
    exchangePixelRatio: (value: number, type?: boolean) => {
      if (type) return value / pixelRatio + 'px'
      return value * pixelRatio + 'rpx'
    },
    isIPad: /iPad/i.test(model),
    isAndroid: /Android/i.test(system),
    navHeight: menuButtonBoundingClientRect.top - 4,
  } as SystemInfo
}

export const systemInfo = getSystemInfo()
