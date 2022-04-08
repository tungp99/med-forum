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
import { useLazyQuery, useSubscription } from '@apollo/client'
import {
  ACCOUNT_CREATED_SUBSCRIPTION,
  ACCOUNT_LOGGED_IN_SUBSCRIPTION,
  TAKE_ACCOUNTS_QUERY,
} from './gql'
import {
  AccountCreated,
  AuthenticationStatistics,
  GetS_Accounts,
} from 'system/generated/gql.types'
import { useEffect, useState } from 'react'
import { Toast } from 'system/store'
import { AS3Avatar } from '../as3-avatar.component'

export function AS3Navbar() {
  const navigate = useNavigate()
  const { account, authenticated, openLoginPopup, openRegisterPopup, logout } =
    useAuth()
  const [filter, setFilter] = useState('')
  const [searchResultVisible, setSearchResultVisible] = useState(false)

  const { data: loginsData } = useSubscription<AuthenticationStatistics>(
    ACCOUNT_LOGGED_IN_SUBSCRIPTION
  )

  const { data: registrationsData } = useSubscription<AccountCreated>(
    ACCOUNT_CREATED_SUBSCRIPTION
  )

  const [fetch_accounts, { data, loading }] = useLazyQuery<GetS_Accounts>(
    TAKE_ACCOUNTS_QUERY,
    {
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    if (filter === '') {
      setSearchResultVisible(false)
      return
    }
    fetch_accounts({ variables: { search: filter } })
    setSearchResultVisible(true)
  }, [filter])

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

          <AS3Dropdown
            className="as3-navbar-search"
            home
            align={'start'}
            items={
              data?.accounts?.items
                ? data.accounts.items.map(s => {
                    const occupations = []
                    let isStudent = false
                    for (const h of s.profile.experience) {
                      h.isWorking === true && occupations.push(h.position)
                    }
                    for (const h of s.profile.education) isStudent = h.isWorking

                    return {
                      element: (
                        <div className="BaoContainer">
                          <AS3Avatar
                            src={s.profile.avatarUrl}
                            className={'BaoAvatar'}
                          ></AS3Avatar>
                          <div
                            style={{ fontWeight: '600' }}
                          >{`${s.profile.firstName} ${s.profile.lastName} (as3/${s.username})`}</div>
                          <div>
                            {occupations.length > 0
                              ? occupations[0]
                              : isStudent
                              ? 'Student'
                              : 'None'}
                          </div>
                          <div
                            style={{
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              color: 'gray',
                            }}
                          >
                            {s.profile.country}
                          </div>
                        </div>
                      ),
                      onClick: () => navigate(`/profile/${s.id}`),
                    }
                  })
                : []
            }
            show={searchResultVisible}
            controlled
          >
            <AS3Input
              id="as3-navbar-search"
              loading={loading}
              prefixIcon={mdiMagnify}
              placeholder="Search AS3"
              onChange={e => {
                setFilter(e.target.value)
              }}
              onFocus={() => {
                filter && setSearchResultVisible(true)
              }}
              onBlur={() => setSearchResultVisible(false)}
            />
          </AS3Dropdown>

          <Stack
            className="ms-5"
            direction="horizontal"
            gap={3}>
            {authenticated ? (
              <AS3Dropdown
                items={[
                  {
                    prefixIcon: mdiAccountCircle,
                    element: 'Profile',
                    onClick: () => navigate('/profile'),
                  },
                  {
                    prefixIcon: mdiProgressStar,
                    element: 'Management',
                    onClick: () => navigate('/manage'),
                  },
                  {
                    prefixIcon: mdiLogout,
                    element: 'Logout',
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
