import { useAuth0 } from '@auth0/auth0-react'
import { Container, Image, Navbar, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { mdiAccountCircle, mdiLogout, mdiMagnify } from '@mdi/js'

import { PAGE_ROUTE } from 'system/constants'
import { AS3Button, AS3Input } from 'system/components'
import { AS3Dropdown } from '../as3-dropdown/as3-dropdown.component'
import './as3-navbar.style.scss'

export function AS3Navbar() {
  const { user, isAuthenticated, isLoading, loginWithPopup, logout } =
    useAuth0()
  const navigate = useNavigate()

  return (
    <Navbar className={['as3-navbar', 'py-0'].join(' ')}>
      <Container
        fluid
        className="py-1 justify-content-between">
        <Image
          className="me-5"
          src="https://via.placeholder.com/80x36.jpg"
          fluid
          onClick={() => navigate('/')}
        />

        <AS3Input
          className="as3-navbar-search"
          prefixIcon={mdiMagnify}
          placeholder="Search AS3"
        />

        <Stack
          className="ms-5"
          direction="horizontal"
          gap={3}>
          {isLoading && 'loading...'}

          {isAuthenticated ? (
            <AS3Dropdown
              items={[
                {
                  prefixIcon: mdiAccountCircle,
                  text: 'Profile',
                  onClick: () => navigate(PAGE_ROUTE.PROFILE),
                },
                {
                  prefixIcon: mdiLogout,
                  text: 'Logout',
                  onClick: () => logout(),
                  separate: true,
                },
              ]}
            >
              Welcome, {user?.sub}
            </AS3Dropdown>
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
