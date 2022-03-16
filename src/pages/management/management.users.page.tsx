import { useQuery } from '@apollo/client'
import Icon from '@mdi/react'
import { mdiPostOutline } from '@mdi/js'

import { useAuth } from 'system/auth'
import { Toast } from 'system/store'
import { AS3Input, AS3LayoutWithSidebar } from 'system/components'
import { SidebarComponent } from './components/sidebar.component'
import { GetAccounts } from 'system/generated/gql.types'
import { GET_ACCOUNTS_QUERY } from './gql'

import './management.style.scss'

export default function ManageUsersPage() {
  // const navigate = useNavigate()
  const { gqlContext } = useAuth()
  const { data, loading, refetch } = useQuery<GetAccounts>(GET_ACCOUNTS_QUERY, {
    ...gqlContext,
    variables: {
      skip: 0,
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  return (
    <AS3LayoutWithSidebar sidebar={<SidebarComponent />}>
      <div className="filter__container">
        <button className="sort__btn">Sort</button>
        <AS3Input placeholder="Search"></AS3Input>
      </div>

      {data?.accounts?.items &&
        data.accounts.items.map(s => (
          <div
            key={s.id}
            className="__container">
            <div className="posts">
              <h4 className="post__number">20</h4>
              <Icon
                path={mdiPostOutline}
                style={{ height: '1.5rem' }}></Icon>
            </div>
            <div className="info__container">
              <div className="usersInfo">Username: {s.username}</div>
              <div className="usersInfo">Email: bao426834@gmail.com</div>
              <div className="usersInfo">Name: PhamBao</div>
            </div>
            <div className="isPublic text-success">Public</div>
          </div>
        ))}
    </AS3LayoutWithSidebar>
  )
}
