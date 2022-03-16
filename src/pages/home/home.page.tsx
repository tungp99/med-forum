import { useQuery } from '@apollo/client'
import { mdiSync } from '@mdi/js'

import { Toast, useDispatch, useStore } from 'system/store'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'
import { GET_POSTS_QUERY } from './gql'
import { GetPosts } from 'system/generated/gql.types'
import { PicksComponent } from './components/picks.component'

export default function HomePage() {
  const dispatch = useDispatch()
  const { posts, page } = useStore(store => store.homePage)

  const { refetch, loading } = useQuery<GetPosts>(GET_POSTS_QUERY, {
    variables: { skip: page * 8 },
    onCompleted({ posts }) {
      if (posts?.items) {
        dispatch({
          type: 'SET_HOMEPAGE_POSTS',
          payload: [...posts.items],
        })
        dispatch({
          type: 'SET_HOMEPAGE_POSTS_PAGE',
          payload: 0,
        })
      }
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  return (
    <AS3LayoutWithSidebar sidebar={<PicksComponent />}>
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
          preview
          data={{ ...post }}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
