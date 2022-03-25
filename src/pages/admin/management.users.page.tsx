import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLazyQuery } from '@apollo/client'
import Icon from '@mdi/react'
import { mdiMenuDown, mdiMinus, mdiPlus, mdiPostOutline } from '@mdi/js'

import { Account } from 'system/types'
import { Toast, useDispatch, useSelector } from 'system/store'
import {
  AS3Button,
  AS3Dropdown,
  AS3InfiniteScroller,
  AS3Input,
  AS3LayoutWithSidebar,
} from 'system/components'
import { SidebarComponent } from '../management/components/sidebar.component'
import { CreateUserPopupComponent } from '../management/components/create-user.popup.component'
import { DeleteUserPopup } from '../management/components/delete-user.popup.component'
import '../management/management.style.scss'

import { GET_ACCOUNTS_QUERY, GET_ALL_ACCOUNTS_QUERY } from '../management/gql'
import { GetAccounts, GetAllAccounts } from 'system/generated/gql.types'

export default function AdminManageUsersPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isPublic, filterTitle, filterText, deleteId, page } = useSelector(
    store => store.managementPage
  )
  const [hasNextPage, setHasNextPage] = useState(true)

  const [data, setData] = useState<Account[]>([])

  const [getAccount_fetch, { loading }] = useLazyQuery<GetAccounts>(
    GET_ACCOUNTS_QUERY,
    {
      onCompleted({ accounts: response }) {
        if (response && response?.items) {
          filterTitle !== 'All' &&
            setData(
              data.concat(response.items.map(s => s as unknown as Account))
            )
          setHasNextPage(response?.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [getAllAccount_fetch, { loading: coLoading }] =
    useLazyQuery<GetAllAccounts>(GET_ALL_ACCOUNTS_QUERY, {
      onCompleted({ accounts: response }) {
        if (response && response?.items) {
          filterTitle === 'All' &&
            setData(
              data.concat(response.items.map(s => s as unknown as Account))
            )
          setHasNextPage(response?.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  useEffect(() => {
    if (filterTitle === 'All') {
      getAllAccount_fetch({
        variables: {
          skip: page * 12,
          isPublic: isPublic,
          search: filterText,
        },
      })
    } else {
      getAccount_fetch({
        variables: {
          skip: page * 12,
          isPublic: isPublic,
          search: filterText,
        },
      })
    }
  }, [filterTitle, filterText, isPublic, page])

  return (
    <AS3LayoutWithSidebar sidebar={<SidebarComponent />}>
      <CreateUserPopupComponent
        onCreated={() => {
          filterTitle === 'All' ? getAllAccount_fetch() : getAccount_fetch()
        }}
      />
      <DeleteUserPopup
        id={deleteId}
        onDeleted={() => {
          filterTitle === 'All' ? getAllAccount_fetch() : getAccount_fetch()
        }}
      />
      <div className="filter__container pb-3">
        <AS3Button
          text
          icon={mdiPlus}
          iconSize={1}
          onClick={() => {
            dispatch({ type: 'OPEN_CREATE_USER_POPUP' })
          }}
        ></AS3Button>

        <AS3Input
          className="mb-0"
          placeholder="Search"
          onChange={e => {
            dispatch({
              type: 'SET_ACCOUNT_UPDATE_FILTER',
              payload: e.target.value,
            })
          }}
        />

        <AS3Dropdown
          className="ms-4"
          suffixIcon={mdiMenuDown}
          align="start"
          items={[
            {
              text: 'All',
              separate: true,
              onClick: () => {
                setData([])
                dispatch({ type: 'SET_ACCOUNT_FILTER_ALL' })
              },
            },
            {
              text: 'Public',
              separate: true,
              onClick: () => {
                setData([])
                dispatch({ type: 'SET_ACCOUNT_FILTER_PUBLIC' })
              },
            },
            {
              text: 'Private',
              separate: true,
              onClick: () => {
                setData([])
                dispatch({ type: 'SET_ACCOUNT_FILTER_PRIVATE' })
              },
            },
          ]}
        >
          <span>{filterTitle}</span>
        </AS3Dropdown>
      </div>

      <AS3InfiniteScroller
        callback={() => {
          dispatch({
            type: 'SET_MANAGEMENT_PAGE',
            payload: page + 1,
          })
        }}
        updateCallbackUsingDependencies={[page]}
        allowScrollingWhen={hasNextPage && !loading && !coLoading}
      >
        <>
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
                  <span className="post__number fs-4 d-block">
                    {s.writtenPostsCount}
                  </span>
                  <Icon
                    path={mdiPostOutline}
                    style={{ height: '1.5rem' }}
                  ></Icon>
                </div>

                <div
                  className="info__container"
                  onClick={() => navigate(`/admin/profile/${s.id}`)}
                >
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
        </>
      </AS3InfiniteScroller>
    </AS3LayoutWithSidebar>
  )
}
