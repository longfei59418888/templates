import { View } from '@tarojs/components'
import { FC, PropsWithChildren } from 'react'

interface Props {
  end?: boolean
  endText?: string
  onClick?: () => void
}

const More: FC<PropsWithChildren<Props>> = ({ children, onClick, end, endText }) => {
  if (end === undefined) return
  return (
    <View
      onClick={() => {
        if (!end) onClick?.()
      }}>
      {end ? endText ?? '加载完成' : children ?? ' 点击加载更多'}
    </View>
  )
}

export default More
