import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { mdiSync } from '@mdi/js'

import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'
import { GET_POSTS_QUERY } from './gql'
import { GetPosts } from 'system/generated/gql.types'

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { posts, pagination } = useSelector(store => store.homePage)

  const { refetch, loading } = useQuery<GetPosts>(GET_POSTS_QUERY, {
    variables: {
      skip: pagination.page * pagination.itemsPerPage,
      take: pagination.itemsPerPage,
    },
    onCompleted({ posts }) {
      if (posts?.items) {
        dispatch({
          type: 'SET_HOMEPAGE_POSTS',
          payload: [...posts.items],
        })
        dispatch({
          type: 'SET_HOMEPAGE_POSTS_PAGE',
          payload: { page: 0 },
        })
      }
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  return (
    <AS3LayoutWithSidebar>
      <FilterComponent />

      <div className="d-flex justify-content-center mb-3">
        <AS3Button
          text
          loading={loading}
          disabled={loading}
          icon={mdiSync}
          onClick={() => refetch()}
        />
      </div>

      {posts.map(post => (
        <AS3PostCard
          className="navigation-enabled"
          key={post.id}
          data={{ ...post }}
          onClick={() => navigate(`/posts/${post.id}`)}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
