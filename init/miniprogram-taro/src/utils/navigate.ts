import queryString from 'query-string'
import { MAIN_PAGES } from '@/constants/page.const'
import {
  navigateBack,
  navigateTo,
  navigateToMiniProgram,
  redirectTo as redirectToBase,
  reLaunch as reLaunchBase,
  switchTab,
  getCurrentPages,
} from '@tarojs/taro'

interface Option {
  redirect?: boolean
  reLaunch?: boolean
}

const HomePage = `/${MAIN_PAGES.Home}`

const parsePage = (page: string, params: Record<string, any> | string = '') => {
  const path = page.startsWith('/') ? page : `/${page}`
  const and = path.indexOf('?') === -1 ? '?' : '&'
  return (
    path +
    and +
    (typeof params === 'string'
      ? params
      : queryString.stringify(
          Object.keys(params).reduce((prev, target) => {
            return params[target] !== undefined
              ? {
                  ...prev,
                  [target]: params[target],
                }
              : prev
          }, {}),
        ))
  )
}

export const go = (page?: string, params?: object | string, options: Option = {}) => {
  if (!page) return reLaunchBase({ url: HomePage })
  try {
    const url = parsePage(page, params)
    // todo tab 切换
    const isTab = ['tab'].includes(page)
    if (isTab) {
      console.info('switchTab 不能携带参数')
      return switchTab({ url: page })
    }
    if (options.reLaunch) return reLaunchBase({ url })
    if (options.redirect) return redirectToBase({ url })
    return navigateTo({ url })
  } catch (_) {
    console.error(_)
    return reLaunchBase({ url: HomePage })
  }
}

export const redirect = (page: string, params?: object | string) => go(page, params, { redirect: true })
export const reLaunch = (page: string, params?: object | string) => go(page, params, { reLaunch: true })

export const back = (safely = false) => {
  navigateBack().catch((e) => {
    if (safely) go()
    console.error('goBack', e)
  })
}

export const backPage = (page: string, params?: object | string, options: Option = {}) => {
  const pages = getCurrentPages()
  let delta = 0
  while (delta < pages.length) {
    if (`/${pages[delta].route}` === page) {
      navigateBack({
        delta,
      }).catch(() => go(page, params, { redirect: true, ...options }))
      return
    }
    delta += 1
  }
  go(page, params, { redirect: true, ...options })
}

export const goMiniProgram = (
  appId: string,
  page: string,
  option?: Taro.navigateToMiniProgram.Option & { params?: object | string },
) => {
  const path = parsePage(page, option?.params)
  return navigateToMiniProgram({
    appId,
    path,
    ...option,
  })
}
