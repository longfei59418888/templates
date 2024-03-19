import { View, Text } from '@tarojs/components'
import { FC } from 'react'
import classNames from 'classnames'
import { flexAlignCenter, flexJustifyContentBetween, fontSize, fontWeight, gray } from '@/constants/className/common'
import Image from '@/components/image'
import Icon from '@/assets/icon/greater-than.svg'

import styles from './index.module.scss'

interface Props {
  title?: string
  more?: string
  onMore?: () => void
}

const TitleNormal: FC<Props> = ({ title, more, onMore }) => {
  const moreDefault = (
    <View className={classNames(flexAlignCenter, styles.moreContainer)}>
      <Text>更多</Text>
      <Image src={Icon} />
    </View>
  )
  return (
    <View className={classNames(flexJustifyContentBetween, fontSize(14), styles.container)}>
      <View className={classNames(fontWeight(5))}>{title ?? ''}</View>
      <View onClick={onMore} className={gray}>
        {more ?? moreDefault}
      </View>
    </View>
  )
}

export default TitleNormal
