import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle, { AppWrapper } from './styles/reset'

import Router from './router'
import { ConfigProvider } from 'antd'
import globalTheme from '@src/styles/theme'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppWrapper>
        <ConfigProvider theme={globalTheme}>
          <Router />
        </ConfigProvider>
      </AppWrapper>
    </BrowserRouter>
  )
}

export default App
