import styled, { createGlobalStyle } from 'styled-components'
import { App } from 'antd'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
  }

  h1,h2,h3,h4,h5,h6{
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  textarea {
    resize: none;
  }

  * {
    box-sizing: border-box;
  }
`

export const AppWrapper = styled(App)`
  height: 100vh;
`

export default GlobalStyle
