import { useEffect, useMemo } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { mdiSync } from '@mdi/js'

import { Toast, useDispatch, useSelector } from 'system/store'

import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'
import { PicksComponent } from './components/picks.component'

import { FILTER_POST_QUERY, GET_POSTS_QUERY } from './gql'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import {
  FilterPosts,
  GetPosts,
  UpdatePostInput,
} from 'system/generated/gql.types'

export default function HomePage() {
  const { posts, page, filter_type, filter_time } = useSelector(
    store => store.homePage
  )
  const dispatch = useDispatch()

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

  const fetchFilterVariables = useMemo(
    () => ({
      skip: page * 8,
      timeFilter: filter_time,
    }),
    [filter_type]
  )
  const [filterPost_fetch] = useLazyQuery<FilterPosts>(FILTER_POST_QUERY, {
    variables: fetchFilterVariables,
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

  useEffect(() => {
    if (filter_type === 'New') {
      refetch()
    } else {
      filterPost_fetch()
    }
  }, [filter_type])

  const [updatePost] = useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
    onCompleted() {
      filter_type === 'New' ? refetch() : filterPost_fetch()
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
          onClick={() =>
            filter_type === 'New' ? refetch() : filterPost_fetch()
          }
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
