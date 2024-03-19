import { View, ScrollView } from '@tarojs/components'
import React, { useMemo, useState, FC, PropsWithChildren, useContext } from 'react'
import classNames from 'classnames'
import { throttle } from 'lodash'

import styles from './index.module.scss'

export interface Props {
  className?: string
  hasScrollTop?: boolean
}

const PageProvider = React.createContext<{ scrollTop: number }>({ scrollTop: 0 })

const Page: FC<PropsWithChildren<Props>> = ({ children, className, hasScrollTop }) => {
  const [scrollTop, setScrollTop] = useState<number>(0)
  const props = useMemo(() => {
    return hasScrollTop
      ? {
          onScroll: throttle((e) => setScrollTop(e.detail.scrollTop), 100),
        }
      : {}
  }, [hasScrollTop])
  return (
    <PageProvider.Provider value={{ scrollTop }}>
      <ScrollView {...props} scrollY className={classNames(styles.pageContainer)}>
        <View className={className}>{children}</View>
      </ScrollView>
    </PageProvider.Provider>
  )
}

export const usePage = () => useContext(PageProvider)

export default Page
