import { Suspense } from 'react'
import * as React from 'react'
import { useRoutes } from 'react-router-dom'

import routerConfig from '@src/constants/routes'

const Fallback = <div></div>

export const Router = () => {
  const router = useRoutes(routerConfig)
  return <Suspense fallback={Fallback}>{router}</Suspense>
}

export default Router
