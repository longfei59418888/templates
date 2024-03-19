import { View } from '@tarojs/components'
import classNames from 'classnames'
import { flexWrap } from '@/constants/className/common'
import More from '@/components/list/more'
import useList, { ListParams } from '@/components/list/useList'
import { useImperativeHandle, forwardRef, ForwardedRef } from 'react'

import styles from './index.module.scss'

interface Props<T> {
  fetch: ListParams<T>['fetch']
  render: (dataSource: T) => JSX.Element
}

const ListNormal: <T>(props: Props<T>, ref: ForwardedRef<{ getList: (refresh: boolean) => void }>) => JSX.Element = (
  { fetch, render },
  ref,
) => {
  const { end, loading, dataSources, getList, setEnd } = useList({
    fetch,
  })

  useImperativeHandle(
    ref,
    () => ({
      getList: () => getList(true),
      setEnd,
    }),
    [getList, setEnd],
  )

  return (
    <View>
      <View className={classNames(flexWrap, styles.container)}>
        {dataSources?.map((dataSource) => render(dataSource))}
      </View>
      <More end={loading ? undefined : end} onClick={getList} />
    </View>
  )
}

export default forwardRef(ListNormal)
