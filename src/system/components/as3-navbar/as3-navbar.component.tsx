import { useAuth0 } from '@auth0/auth0-react'
import { Container, Dropdown, Navbar, Stack } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

// import { useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3Input } from 'system/components'

import './as3-navbar.style.scss'

export function AS3Navbar() {
  const { user, isAuthenticated, isLoading, loginWithPopup, logout } =
    useAuth0()

  return (
    <Navbar className={['as3-navbar', 'py-0'].join(' ')}>
      <Container
        fluid
        className="py-1 justify-content-between">
        <Navbar.Brand className="fs-4">LOGO</Navbar.Brand>

        <AS3Input
          className="as3-navbar-search"
          prefixIcon={faMagnifyingGlass}
          placeholder="Search AS3"
        />

        <Stack
          className="ms-3"
          direction="horizontal"
          gap={3}>
          {isLoading && 'loading...'}

          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="default"
                className="px-0">
                <FontAwesomeIcon
                  icon={faUser}
                  className="me-2" />
                Welcome, {user?.sub}
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <AS3Button
                variant="outline-primary"
                onClick={() => loginWithPopup()}
              >
                Login
              </AS3Button>

              <AS3Button
                variant="primary"
                onClick={() => loginWithPopup({ screen_hint: 'signup' })}
              >
                Register
              </AS3Button>
            </>
          )}
        </Stack>
      </Container>
    </Navbar>
  )
}
