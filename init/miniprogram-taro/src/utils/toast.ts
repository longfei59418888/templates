import Taro from '@tarojs/taro'

const toast = ({ title, icon = 'none', image, duration, mask, success }: Taro.showToast.Option) => {
  return Taro.showToast({
    title,
    icon,
    image,
    duration,
    mask,
    success,
  })
}

export const hideLoading = Taro.hideLoading
export const showLoading = Taro.showLoading

export const error = (
  title: string,
  { icon, image, duration = 1500, mask = true }: Omit<Taro.showToast.Option, 'title'> = {},
): void | Promise<TaroGeneral.CallbackResult> =>
  toast({
    title,
    icon,
    image,
    duration,
    mask,
  })

export const success = (
  title: string,
  { icon, image, duration = 1500, mask = true }: Omit<Taro.showToast.Option, 'title'> = {},
): void | Promise<TaroGeneral.CallbackResult> =>
  toast({
    title,
    icon,
    image,
    duration,
    mask,
  })

export default (
  title: string,
  { duration = 1500, mask = false }: Omit<Taro.showToast.Option, 'title'> = {},
): void | Promise<TaroGeneral.CallbackResult> =>
  toast({
    title,
    icon: 'none',
    duration,
    mask,
  })
