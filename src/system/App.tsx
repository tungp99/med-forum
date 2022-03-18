import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import { apollo } from './plugins'
import { store } from './store'
import { AuthProvider } from './auth'

import 'system/assets/styles/_app.scss'
import {
  AS3AuthLogin,
  AS3AuthRegister,
  AS3Navbar,
  AS3Toastr,
} from 'system/components'
import { Routes } from './Routes'

export default function App() {
  return (
    <ApolloProvider client={apollo}>
      <Provider store={store}>
        <AuthProvider>
          <AS3Navbar />
          <Routes />

          <AS3AuthLogin />
          <AS3AuthRegister />
        </AuthProvider>

        <AS3Toastr />
      </Provider>
    </ApolloProvider>
  )
}
