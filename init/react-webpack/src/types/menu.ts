type MenuItemStatus = 0 | 1 | 2

export interface MenuItem {
  children?: MenuItem[]
  icon?: string
  key?: string
  label: string
  pathname: string
  status?: MenuItemStatus
}
