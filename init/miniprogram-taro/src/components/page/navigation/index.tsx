import { FC, PropsWithChildren } from 'react'
import Navigation, { Props as NavigationProps } from '@/components/navigation'
import Page, { Props as PageProps } from '../index'

const PageNavigation: FC<PropsWithChildren<PageProps & NavigationProps>> = ({
  children,
  hasScrollTop,
  className,
  ...navigationProps
}) => {
  return (
    <Page hasScrollTop={hasScrollTop} className={className}>
      <Navigation {...navigationProps}></Navigation>
      {children}
    </Page>
  )
}

export default PageNavigation
