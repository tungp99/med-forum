import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'
import { PicksComponent } from './components/picks.component'

import { FILTER_POST_QUERY, GET_POSTS_QUERY } from './gql'
import {
  FilterPosts,
  GetPosts,
  GetPosts_posts_items,
  UpdatePostInput,
} from 'system/generated/gql.types'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'

export default function HomePage() {
  const { posts, filter_type, filter_time } = useSelector(
    store => store.homePage
  )
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)

  const resetPage = () => {
    if (page === 0)
      filter_type === 'New'
        ? fetchPosts({ variables: { skip: 0 } })
        : filterPosts({
            variables: {
              skip: 0,
              timeFilter: filter_time,
            },
          })
  }
  const createPage = (items: GetPosts_posts_items[]) => {
    page === 0
      ? dispatch({
          type: 'SET_HOMEPAGE_POSTS',
          payload: items.map(s => ({ ...s, comments: [] })),
        })
      : dispatch({
          type: 'ADD_HOMEPAGE_POSTS',
          payload: items.map(s => ({ ...s, comments: [] })),
        })
  }

  const [fetchPosts, { refetch, loading: defaultFetching, called }] =
    useLazyQuery<GetPosts>(GET_POSTS_QUERY, {
      onCompleted({ posts: response }) {
        if (response && response.items && filter_type === 'New') {
          createPage(response.items)

          setHasNextPage(response.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  const [
    filterPosts,
    { refetch: filter_refetch, loading: filtering, called: filCalled },
  ] = useLazyQuery<FilterPosts>(FILTER_POST_QUERY, {
    onCompleted({ posts: response }) {
      if (response && response.items && filter_type !== 'New') {
        createPage(response.items)

        setHasNextPage(response.pageInfo.hasNextPage)
      }
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  useEffect(() => {
    setPage(0)
    resetPage()
  }, [filter_type])

  useEffect(() => {
    if (filter_type === 'New') {
      called
        ? refetch({ skip: page * 8 })
        : fetchPosts({ variables: { skip: page * 8 } })
    } else {
      filCalled
        ? filter_refetch({ skip: page * 8, timeFilter: filter_time })
        : filterPosts({
            variables: { skip: page * 8, timeFilter: filter_time },
          })
    }
  }, [page])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      onCompleted() {
        resetPage()
        setPage(0)
        dispatch({ type: 'FETCH_ERROR', payload: undefined })
      },
      onError(error) {
        dispatch({ type: 'FETCH_ERROR', payload: error })
      },
    })

  return (
    <AS3LayoutWithSidebar
      className="my-3"
      sidebar={<PicksComponent />}>
      <FilterComponent />

      {posts.map(post => {
        return (
          <AS3PostCard
            key={post.id}
            className="navigation-enabled"
            preview
            data={{ ...post }}
            afterEdit={data => updatePost({ variables: { input: data } })}
          />
        )
      })}

      {hasNextPage && (
        <div className="text-center">
          <AS3Button
            loading={defaultFetching || filtering || waitingForUpdate}
            text
            onClick={() => {
              setPage(page + 1)
            }}
          >
            Load more...
          </AS3Button>
        </div>
      )}
    </AS3LayoutWithSidebar>
  )
}
