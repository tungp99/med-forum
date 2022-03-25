import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import {
  AS3InfiniteScroller,
  AS3LayoutWithSidebar,
  AS3PostCard,
} from 'system/components'
import { FilterComponent } from './components/filter.component'
import { PicksComponent } from './components/picks.component'

import { FILTER_POST_QUERY, GET_POSTS_QUERY } from './gql'
import {
  FilterPosts,
  GetPosts,
  UpdatePostInput,
} from 'system/generated/gql.types'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'

export default function HomePage() {
  const { posts, page, filter_type, filter_time } = useSelector(
    store => store.homePage
  )
  const dispatch = useDispatch()

  const [hasNextPage, setHasNextPage] = useState(true)

  const [fetchPosts, { loading: defaultFetching }] = useLazyQuery<GetPosts>(
    GET_POSTS_QUERY,
    {
      onCompleted({ posts: response }) {
        if (response && response.items) {
          dispatch({
            type: 'ADD_HOMEPAGE_POSTS',
            payload: response.items.map(s => ({ ...s, comments: [] })),
          })

          setHasNextPage(response.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [filterPosts, { loading: filtering }] = useLazyQuery<FilterPosts>(
    FILTER_POST_QUERY,
    {
      onCompleted({ posts: response }) {
        if (response && response.items) {
          dispatch({
            type: 'ADD_HOMEPAGE_POSTS',
            payload: response.items.map(s => ({ ...s, comments: [] })),
          })

          setHasNextPage(response.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    if (filter_type === 'New') {
      fetchPosts({ variables: { skip: page * 8 } })
    } else {
      filterPosts({
        variables: {
          skip: page * 8,
          timeFilter: filter_time,
        },
      })
    }
  }, [filter_type, page])

  const [updatePost] = useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
    onCompleted() {
      filter_type === 'New' ? fetchPosts() : filterPosts()
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  return (
    <AS3LayoutWithSidebar sidebar={<PicksComponent />}>
      <FilterComponent />

      <AS3InfiniteScroller
        callback={() => {
          dispatch({
            type: 'SET_HOMEPAGE_POSTS_PAGE',
            payload: page + 1,
          })
        }}
        updateCallbackUsingDependencies={[page]}
        allowScrollingWhen={hasNextPage && !defaultFetching && !filtering}
      >
        <>
          {posts.map(post => (
            <AS3PostCard
              key={post.id}
              className="navigation-enabled"
              preview
              data={{ ...post }}
              afterEdit={data => updatePost({ variables: { input: data } })}
            />
          ))}
        </>
      </AS3InfiniteScroller>
    </AS3LayoutWithSidebar>
  )
}
