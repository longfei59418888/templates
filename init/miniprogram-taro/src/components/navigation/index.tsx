import { View } from '@tarojs/components'
import {
  black,
  displayFlex,
  flex,
  flexAlignCenter,
  flexCenter,
  flexJustifyEnd,
  flexJustifyStart,
  fontSize,
  fontWeight,
  height100,
  positionFixed,
  positionRelative,
  width100,
} from '@/constants/className/common'
import { usePage } from '@/components/page'
import { FC, ReactElement, useEffect, useState } from 'react'
import { systemInfo } from '@/constants/system.const'
import classNames from 'classnames'

import styles from './index.module.scss'

export interface Props {
  title?: string | ReactElement
  left?: string | ReactElement
  right?: string | ReactElement
  classNameLeft?: string
  stick?: boolean
  opacity?: number
  backgroundColor?: string
  classNameRight?: string
  classNameTitle?: string
}

const slideStyle = [flex(1), flexAlignCenter, height100]
const barHeight = systemInfo.navHeight + systemInfo.menuButton.height + 8

export const Navigation: FC<Props> = ({
  backgroundColor,
  opacity,
  stick,
  left,
  right,
  title = '',
  classNameLeft,
  classNameRight,
  classNameTitle,
}) => {
  const [opacityStyle, setOpacityStyle] = useState<number>()
  const defaultLeft = <View></View>
  const defaultRight = <View></View>
  const { scrollTop } = usePage()
  useEffect(() => {
    if (opacity !== 1) {
      setOpacityStyle(scrollTop > barHeight ? 1 : scrollTop / barHeight)
    }
  }, [opacity, scrollTop])
  return (
    <View style={{ height: barHeight + 8 + 'px' }}>
      <View className={classNames(stick ? positionFixed : positionRelative, width100, styles.container)}>
        <View
          className={width100}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : stick ? '#ffffff' : '',
            opacity: opacityStyle,
            height: barHeight + 8 + 'px',
          }}></View>
        <View style={{ height: systemInfo.navHeight + 'px' }}></View>
        <View
          className={classNames(displayFlex, fontSize(16), fontWeight(5), black)}
          style={{ height: systemInfo.menuButton.height + 'px' }}>
          <View className={classNames(...slideStyle, flexJustifyStart, classNameLeft)}>{left ?? defaultLeft}</View>
          <View className={classNames(flexCenter, height100, classNameTitle)}>{title}</View>
          <View className={classNames(...slideStyle, flexJustifyEnd, classNameRight)}>{right ?? defaultRight}</View>
        </View>
      </View>
    </View>
  )
}

export default Navigation
