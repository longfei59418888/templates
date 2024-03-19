import Taro, {
  useShareAppMessage as useBaseShareAppMessage,
  showShareImageMenu,
  downloadFile,
  shareVideoMessage,
  shareFileMessage,
} from '@tarojs/taro'

export interface UseShareAppMessageParams {
  title?: string
  path?: string
  imageUrl?: string
}

export const useShareAppMessage = (defaultMessage: UseShareAppMessageParams = {}) => {
  useBaseShareAppMessage(({ from, target }) => {
    if (from === 'button' && target) {
      const buttonNode = document.getElementById(target['id'])
      return {
        title: buttonNode?.['props']['title'] ?? '',
        path: buttonNode?.['props']['path'] ?? '',
        imageUrl: buttonNode?.['props']['imageUrl'] ?? '',
        ...defaultMessage,
      }
    }
    return {
      ...defaultMessage,
    }
  })

  return
}

export const useShareFileMessage = () => {
  const share = async (options: Taro.downloadFile.Option, callback: (tempFilePath: string) => void) => {
    try {
      const { tempFilePath } = await downloadFile(options)
      callback(tempFilePath)
    } catch (_e) {}
  }
  return {
    shareImage: (options: Taro.downloadFile.Option) =>
      share(options, (path) =>
        showShareImageMenu({
          path,
        }),
      ),
    shareVideo: (options: Taro.downloadFile.Option) =>
      share(options, (videoPath) =>{
        console.log(videoPath)
          shareVideoMessage({
            videoPath,
          })
        }
       ,
      ),
    shareFile: (options: Taro.downloadFile.Option, shareOptions: Taro.shareFileMessage.Option) =>
      share(options, (filePath) =>
        shareFileMessage({
          ...shareOptions,
          filePath,
        }),
      ),
  }
}
