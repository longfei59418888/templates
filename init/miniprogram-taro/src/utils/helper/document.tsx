import { getCurrentInstance } from '@tarojs/taro'
import { render } from '@tarojs/react'
import { FC } from 'react'
import { RootPortal } from '@tarojs/components'
import type { TaroRootElement } from '@tarojs/runtime'
import type { TaroDocument } from '@tarojs/runtime/dist/dom/document'

const doc: TaroDocument = document as unknown as TaroDocument

export function getPageElement() {
  const { $taroPath } = getCurrentInstance().page as any
  if ($taroPath) {
    return doc.getElementById<TaroRootElement>($taroPath)
  }
}

export function mountPortal<T extends object>(Component: FC<T>, props: T = {} as T) {
  const pageElement = getPageElement()

  if (!pageElement) {
    throw new Error('Not found page instance')
  }

  const portalEl = pageElement.ownerDocument.createElement('block')
  render(
    <RootPortal>
      <Component {...props} />
    </RootPortal>,
    portalEl,
  )

  pageElement.appendChild(portalEl)
  return () => {
    pageElement.removeChild(portalEl)
  }
}

export default doc
