import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'

import { store } from './store'

import 'system/assets/styles/_app.scss'

import { AS3Routes, AS3Navbar, AS3Picks } from 'system/components'

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE ?? ''}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      scope={process.env.REACT_APP_AUTH0_SCOPE ?? ''}
    >
      <Provider store={store}>
        <AS3Navbar />

        <Container
          className="pt-4"
          fluid="sm">
          <Row>
            <Col lg={8}>
              <AS3Routes />
            </Col>
            <Col lg={4}>
              <AS3Picks />
            </Col>
          </Row>
        </Container>
      </Provider>
    </Auth0Provider>
  )
}

export default App
