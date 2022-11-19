import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './system/App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div
        id="background"
        style={{ height: window.innerHeight }}>
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
