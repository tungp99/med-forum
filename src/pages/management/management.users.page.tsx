import { useLazyQuery } from '@apollo/client'
import { mdiPostOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { useNavigate } from 'react-router-dom'
import { AS3Input } from 'system/components'
import { Toast } from 'system/store'
import { GET_USERS_QUERY } from './gql'
import './management.style.scss'

export default function ManageUsersPage() {
  const navigate = useNavigate()
  const [fetch, { data }] = useLazyQuery(GET_USERS_QUERY, {
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })
  console.log(data)
  return (
    <>
      <div className="filter__container">
        <button className="sort__btn">Sort</button>
        <AS3Input placeholder="Search"></AS3Input>
      </div>

      <div className="__container">
        <div className="posts">
          <h4 className="post__number">20</h4>
          <Icon
            path={mdiPostOutline}
            style={{ height: '1.5rem' }}></Icon>
        </div>
        <div className="info__container">
          <div className="usersInfo">Username: {data?.accounts}</div>
          <div className="usersInfo">Email: bao426834@gmail.com</div>
          <div className="usersInfo">Name: PhamBao</div>
        </div>
        <div className="isPublic text-success">Public</div>
      </div>
    </>
  )
}
