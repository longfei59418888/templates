import { showModal as showModalBase } from '@tarojs/taro'

export const showModal = showModalBase
export const confirm = (content: string, option?: Taro.showModal.Option) =>
  showModalBase({
    ...option,
    content,
  })

export const alert = (
  content: string,
  option?: Pick<Taro.showModal.Option, 'confirmText' | 'success' | 'complete' | 'confirmColor' | 'fail'>,
) =>
  showModalBase({
    ...option,
    content,
    showCancel: false,
  })
