import { lazy } from 'react'
import {PAGE, PAGE_HOME, PAGE_LIST, PAGE_LOGIN} from '@src/constants/pages'
import Layout from '@src/components/layout'
import { RouteObject } from '@src/types/route'

const Home = lazy(() => import('@src/pages/home/index'))
const List = lazy(() => import('@src/pages/list/index'))
const LoginPages = lazy(() => import('@src/pages/login'))
const NotFound = lazy(() => import('@src/pages/notFound'))

const routerConfig: RouteObject[] = [
  {
    path: PAGE,
    Component: Layout,
    children: [
      {
        path: PAGE_HOME,
        Component: Home,
      },
      {
        path: PAGE_LIST,
        Component: List,
      },
    ],
  },
  {
    path: PAGE_LOGIN,
    Component: LoginPages,
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routerConfig
