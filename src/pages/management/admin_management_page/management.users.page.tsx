import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLazyQuery, useQuery } from '@apollo/client'
import Icon from '@mdi/react'
import { mdiMenuDown, mdiMinus, mdiPlus, mdiPostOutline } from '@mdi/js'

import { Account } from 'system/types'
import { useAuth } from 'system/auth'
import { Toast, useDispatch, useSelector } from 'system/store'
import {
  AS3Button,
  AS3Dropdown,
  AS3Input,
  AS3LayoutWithSidebar,
} from 'system/components'
import { SidebarComponent } from '../components/sidebar.component'
import { CreateUserPopupComponent } from '../components/create-user.popup.component'
import { DeleteUserPopup } from '../components/delete-user.popup.component'
import './management.style.scss'

import { GET_ACCOUNTS_QUERY, GET_ALL_ACCOUNTS_QUERY } from '../gql'
import { GetAccounts, GetAllAccounts } from 'system/generated/gql.types'

export default function ManageUsersPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isPublic, filterTitle, filterText, deleteId } = useSelector(
    store => store.managementPage
  )
  const { gqlContext } = useAuth()

  const [data, setData] = useState<Account[]>([])

  const fetchAccountsVariables = useMemo(
    () => ({
      skip: 0,
      isPublic: isPublic,
      search: filterText,
    }),
    [isPublic, filterText]
  )
  const [getAccount_fetch] = useLazyQuery<GetAccounts>(GET_ACCOUNTS_QUERY, {
    ...gqlContext,
    variables: fetchAccountsVariables,
    onCompleted({ accounts: response }) {
      response?.items &&
        filterTitle !== 'All' &&
        setData(response.items.map(s => s as unknown as Account))
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const fetchAllVariables = useMemo(
    () => ({
      skip: 0,
      search: filterText,
    }),
    [filterText]
  )
  const { refetch: getAllAccount_refetch } = useQuery<GetAllAccounts>(
    GET_ALL_ACCOUNTS_QUERY,
    {
      ...gqlContext,
      variables: fetchAllVariables,
      onCompleted({ accounts: response }) {
        response?.items &&
          filterTitle === 'All' &&
          setData(response.items.map(s => s as unknown as Account))
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    if (filterTitle === 'All') {
      getAllAccount_refetch()
    } else {
      getAccount_fetch()
    }
  }, [filterTitle, filterText])

  return (
    <AS3LayoutWithSidebar sidebar={<SidebarComponent />}>
      <CreateUserPopupComponent
        onCreated={() => {
          filterTitle === 'All' ? getAllAccount_refetch() : getAccount_fetch()
        }}
      />
      <DeleteUserPopup
        id={deleteId}
        onDeleted={() => {
          filterTitle === 'All' ? getAllAccount_refetch() : getAccount_fetch()
        }}
      />
      <div className="filter__container">
        <button
          className="createUser__btn mb-3"
          onClick={() => {
            dispatch({ type: 'OPEN_CREATE_USER_POPUP' })
          }}
        >
          <Icon
            path={mdiPlus}
            size={1}></Icon>
        </button>
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
          <span>{filterTitle}</span>
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
            className={`${$container_class} mb-2`}
            onClick={e => {
              if (
                e.target.toString() !== '[object SVGSVGElement]' &&
                e.target.toString() !== '[object HTMLButtonElement]'
              )
                navigate(`/profile/${s.id}`)
            }}
          >
            <div className="posts">
              <h4 className="post__number">{s.writtenPostsCount}</h4>
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
            <div className="text-end">
              <AS3Button
                icon={mdiMinus}
                text
                size="sm"
                iconSize={0.7}
                className="delete__icon"
                onClick={() => {
                  dispatch({ type: 'OPEN_DELETE_USER_POPUP' })
                  dispatch({ type: 'DELETE_ID', payload: `${s.id}` })
                }}
              ></AS3Button>
              <div className={$isPublic_class}>{isPublic}</div>
            </div>
          </div>
        )
      })}
    </AS3LayoutWithSidebar>
  )
}
