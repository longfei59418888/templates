import { VideoInfo } from '@/types/video'
import { FC } from 'react'
import { View } from '@tarojs/components'
import Image from '@/components/image'
import classNames from 'classnames'
import {
  backgroundGray,
  backgroundWhite,
  flexAlignCenter,
  flexJustifyContentBetween,
  fontSize,
  radius,
} from '@/constants/className/common'
import More from '@/assets/icon/more.png'

import styles from './index.module.scss'

interface Props extends VideoInfo {
  className?: string
}

const VideoItem: FC<Props> = ({ cover = '', className }) => {
  return (
    <View className={classNames(styles.container, radius(8), backgroundWhite, fontSize(12), className)}>
      <Image className={backgroundGray} src={cover} />
      <View className={classNames(flexJustifyContentBetween, flexAlignCenter, styles.info)}>
        <View>{'中文 -> 英文'}</View>
        <View>
          <Image width={24} src={More} />
        </View>
      </View>
    </View>
  )
}

export default VideoItem
