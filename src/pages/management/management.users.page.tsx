import { useLazyQuery, useQuery } from '@apollo/client'
import Icon from '@mdi/react'
import { mdiMenuDown, mdiPostOutline } from '@mdi/js'

import { useAuth } from 'system/auth'
import { Toast, useDispatch, useStore } from 'system/store'
import { AS3Dropdown, AS3Input, AS3LayoutWithSidebar } from 'system/components'
import { SidebarComponent } from './components/sidebar.component'
import { GetAccounts, GetAllAccounts } from 'system/generated/gql.types'
import { GET_ACCOUNTS_QUERY, GET_ALL_ACCOUNTS_QUERY } from './gql'

import './management.style.scss'
import { useEffect, useMemo, useState } from 'react'
import { Account } from 'system/types'

export default function ManageUsersPage() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isPublic, filter_title, filter_text } = useStore(
    store => store.managementPage
  )
  const { gqlContext } = useAuth()

  const [data, setData] = useState<Account[]>([])

  const fetchAccountsVariables = useMemo(
    () => ({
      skip: 0,
      isPublic,
    }),
    [isPublic]
  )
  const [getAccount_fetch] = useLazyQuery<GetAccounts>(GET_ACCOUNTS_QUERY, {
    ...gqlContext,
    variables: fetchAccountsVariables,
    onCompleted({ accounts: response }) {
      response?.items &&
        setData(response.items.map(s => s as unknown as Account))
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const fetchAllVariables = useMemo(
    () => ({
      skip: 0,
      search: filter_text,
    }),
    [isPublic]
  )
  const { refetch: getAllAccount_refetch } = useQuery<GetAllAccounts>(
    GET_ALL_ACCOUNTS_QUERY,
    {
      ...gqlContext,
      variables: fetchAllVariables,
      onCompleted({ accounts: response }) {
        response?.items &&
          setData(response.items.map(s => s as unknown as Account))
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    if (filter_title === 'All') {
      getAllAccount_refetch()
    } else {
      getAccount_fetch()
    }
  }, [filter_title])

  useEffect(() => {
    getAllAccount_refetch()
  }, [filter_text])
  return (
    <AS3LayoutWithSidebar sidebar={<SidebarComponent />}>
      <div className="filter__container">
        <AS3Input
          placeholder="Search"
          onChange={e => {
            dispatch({
              type: 'SET_ACCOUNT_UPDATE_FILTER',
              payload: e.target.value,
            })
          }}
        ></AS3Input>
        <AS3Dropdown
          className="ms-4"
          suffixIcon={mdiMenuDown}
          align="start"
          items={[
            {
              text: 'All',
              separate: true,
              onClick: () => dispatch({ type: 'SET_ACCOUNT_FILTER_ALL' }),
            },
            {
              text: 'Public',
              separate: true,
              onClick: () => dispatch({ type: 'SET_ACCOUNT_FILTER_PUBLIC' }),
            },
            {
              text: 'Private',
              separate: true,
              onClick: () => dispatch({ type: 'SET_ACCOUNT_FILTER_PRIVATE' }),
            },
          ]}
        >
          <span>{filter_title}</span>
        </AS3Dropdown>
      </div>
      {data.map(s => {
        let $container_class = '__container'
        let $isPublic_class = 'isPublic text-danger'
        let isPublic = 'Private'
        if (s.isGod === true) $container_class = 'vip__container'
        if (s.profile.isPublic === true) {
          isPublic = 'Public'
          $isPublic_class = 'isPublic text-success'
        }

        return (
          <div
            key={s.id}
            className={`${$container_class} mb-2`}>
            <div className="posts">
              <h4 className="post__number">20</h4>
              <Icon
                path={mdiPostOutline}
                style={{ height: '1.5rem' }}></Icon>
            </div>
            <div className="info__container">
              <div className="usersInfo">Username: {s.username}</div>
              <div className="usersInfo">Email: {s.email}</div>
              <div className="usersInfo">
                Name: {s.profile.firstName} {s.profile.lastName}
              </div>
            </div>
            <div className={$isPublic_class}>{isPublic}</div>
          </div>
        )
      })}
    </AS3LayoutWithSidebar>
  )
}