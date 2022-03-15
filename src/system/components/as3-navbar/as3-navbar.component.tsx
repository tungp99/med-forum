import { Container, Image, Navbar, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  mdiAccountCircle,
  mdiLogout,
  mdiMagnify,
  mdiProgressStar,
} from '@mdi/js'

import { useAuth } from 'system/auth'
import { AS3Button, AS3Input, AS3Dropdown } from 'system/components'

import './as3-navbar.style.scss'

export function AS3Navbar() {
  const { account, authenticated, openLoginPopup, openRegisterPopup, logout } =
    useAuth()
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
          {authenticated ? (
            <AS3Dropdown
              items={[
                {
                  prefixIcon: mdiAccountCircle,
                  text: 'Profile',
                  onClick: () => navigate('/profile'),
                },
                {
                  prefixIcon: mdiProgressStar,
                  text: 'Management',
                  onClick: () => navigate('/manage'),
                },
                {
                  prefixIcon: mdiLogout,
                  text: 'Logout',
                  onClick: () => logout(),
                  separate: true,
                },
              ]}
            >
              Welcome, {account.profile?.firstName} {account.profile?.lastName}
            </AS3Dropdown>
          ) : (
            <>
              <AS3Button
                variant="outline-primary"
                onClick={() => openLoginPopup()}
              >
                Login
              </AS3Button>

              <AS3Button
                variant="primary"
                onClick={() => openRegisterPopup()}>
                Register
              </AS3Button>
            </>
          )}
        </Stack>
      </Container>
    </Navbar>
  )
}
