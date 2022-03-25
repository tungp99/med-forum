import { Container, Navbar, Stack } from 'react-bootstrap'
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
import { useSubscription } from '@apollo/client'
import {
  ACCOUNT_CREATED_SUBSCRIPTION,
  ACCOUNT_LOGGED_IN_SUBSCRIPTION,
} from './gql'
import {
  AccountCreated,
  AuthenticationStatistics,
} from 'system/generated/gql.types'

export function AS3Navbar() {
  const navigate = useNavigate()
  const { account, authenticated, openLoginPopup, openRegisterPopup, logout } =
    useAuth()

  const { data: loginsData } = useSubscription<AuthenticationStatistics>(
    ACCOUNT_LOGGED_IN_SUBSCRIPTION
  )

  const { data: registrationsData } = useSubscription<AccountCreated>(
    ACCOUNT_CREATED_SUBSCRIPTION
  )

  const { hasFullAccess } = useAuth()

  return (
    <>
      <Navbar className={['as3-navbar', 'py-0'].join(' ')}>
        <Container
          fluid
          className="py-1 justify-content-between">
          <div
            onClick={() =>
              hasFullAccess() ? navigate('/admin') : navigate('/')
            }
            className="supremeIcon fs-4 ms-1"
          >
            AS3
          </div>

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
                Welcome, {account.profile?.firstName}{' '}
                {account.profile?.lastName}
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
                  onClick={() => openRegisterPopup()}
                >
                  Register
                </AS3Button>
              </>
            )}
          </Stack>
        </Container>
      </Navbar>

      {authenticated && (
        <Navbar className="as3-navbar">
          <Container className="small text-center">
            <div className="text-secondary w-100 ">
              {registrationsData?.accountCreated ?? 0} Registered
            </div>
            <div className="text-success w-100">
              {loginsData?.authenticationStatistics ?? 0} Online
            </div>
          </Container>
        </Navbar>
      )}
    </>
  )
}
