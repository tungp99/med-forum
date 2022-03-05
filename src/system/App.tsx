import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'

import { store } from './store'

import 'system/assets/styles/_app.scss'

import { AS3Navbar, AS3Routes } from 'system/components'

export default function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE ?? ''}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
    >
      <Provider store={store}>
        <AS3Navbar />
        <AS3Routes />
      </Provider>
    </Auth0Provider>
  )
}
