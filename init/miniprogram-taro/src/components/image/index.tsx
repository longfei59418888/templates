import { Image as ImageBase, ImageProps } from '@tarojs/components'
import { FC } from 'react'
import { systemInfo } from '@/constants/system.const'

export interface Props {
  className?: string
  width?: number
}

const Image: FC<ImageProps & Props> = ({ width, ...props }) => {
  return (
    <ImageBase
      mode='widthFix'
      {...props}
      style={{
        width: width && systemInfo.exchangePixelRatio(width),
      }}></ImageBase>
  )
}

export default Image
