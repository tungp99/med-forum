import { useMutation, useQuery } from '@apollo/client'
import { mdiSync } from '@mdi/js'

import { Toast, useDispatch, useStore } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'
import { PicksComponent } from './components/picks.component'

import { GET_POSTS_QUERY } from './gql'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import { GetPosts, UpdatePostInput } from 'system/generated/gql.types'

export default function HomePage() {
  const { posts, page } = useStore(store => store.homePage)
  const dispatch = useDispatch()
  const { gqlContext } = useAuth()

  const { refetch, loading } = useQuery<GetPosts>(GET_POSTS_QUERY, {
    variables: { skip: page * 8 },
    onCompleted({ posts }) {
      if (posts?.items) {
        dispatch({
          type: 'SET_HOMEPAGE_POSTS',
          payload: posts.items.map(s => ({ ...s, comments: [] })),
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

  const [updatePost] = useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
    ...gqlContext,
    onCompleted() {
      refetch()
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
          afterEdit={data => updatePost({ variables: { input: data } })}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
