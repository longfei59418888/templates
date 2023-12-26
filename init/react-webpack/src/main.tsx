import * as React from 'react'
import { createRoot } from 'react-dom/client'

import App from './app'

const root = createRoot(document.getElementById('app') as Element)
root.render(<App />)

if (module.hot) {
  module.hot.accept('./app.tsx', function () {
    root.render(<App />)
  })
}
