import { RouteObject as RouteObjectBase } from 'react-router-dom'
import { USER_ROLES } from '@src/types/user'

export type RouteObject = RouteObjectBase & {
  roles?: USER_ROLES[]
}
