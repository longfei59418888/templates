import { View } from '@tarojs/components'
import classNames from 'classnames'
import { flexWrap } from '@/constants/className/common'

import styles from './index.module.scss'
import ListNormal from '@/components/list/normal'

interface Props<T> {
  dataSources?: T[]
  render: (dataSource: T) => JSX.Element
}

const VideoItem = () => {}

const VideoList: <T>(props: Props<T>) => JSX.Element = ({ dataSources, render }) => {
  return (
    <View>

    </View>
  )
}

export default VideoList
