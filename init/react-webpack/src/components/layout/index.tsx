import { FC, PropsWithChildren, useEffect, useState } from 'react'
import * as React from 'react'
import { Space } from 'antd'
import {
  Header,
  Layout,
  Language,
  Menu,
  Logo,
  Avatar,
  Auth,
} from 'xl-story-book'
import { Outlet } from 'react-router'
import { getMenus } from '@src/apis/admin'
import { MenuItem } from '@src/types/menu'
import { ItemType } from 'xl-story-book/types/components/menu/propsType'

const Index: FC<PropsWithChildren> = () => {
  const [menu, setMenu] = useState<MenuItem[]>()
  // const [spinning, setSpinning] = useState<boolean>()

  useEffect(() => {
    getMenus().then((result) => setMenu(result))
  }, [])

  return (
    <Auth>
      <Layout
        header={
          <Header
            right={
              <Space size={24}>
                <Language
                  default='中文(简体)'
                  handle={() => {}}
                  items={[
                    { key: 'ch', label: '中文(简体)' },
                    { key: 'en', label: 'English' },
                  ]}
                />
                <Avatar.Default
                  size={28}
                  src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.sv'
                  username='test'
                />
              </Space>
            }
            left={
              <Logo src='data:image/png;base64,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' />
            }
          />
        }
        slider={<Menu items={menu as ItemType[]} />}>
        <Outlet></Outlet>
      </Layout>
    </Auth>
  )
}

export default Index
