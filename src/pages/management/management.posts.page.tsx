import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import {
  AS3Button,
  AS3InfiniteScroller,
  AS3Layout,
  AS3PostCard,
} from 'system/components'
import { FilterComponent } from './components/filter.component'

import { GET_COLLECTOR_QUERY, GET_MY_POSTS_QUERY } from './gql'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import {
  GetCollectedPosts,
  GetPosts,
  UpdatePostInput,
} from 'system/generated/gql.types'
import { mdiSync } from '@mdi/js'
import { useCollector } from 'system/plugins'

export default function ManagementPage() {
  const { account } = useAuth()
  const { fetchPosts, page, posts } = useSelector(store => store.managementPage)

  const { collection } = useCollector()
  const dispatch = useDispatch()
  const [hasNextPage, setHasNextPage] = useState(true)

  const [fetch, { loading, refetch }] = useLazyQuery<GetPosts>(
    GET_MY_POSTS_QUERY,
    {
      onCompleted(response) {
        if (response.posts?.items) {
          fetchPosts !== null &&
            dispatch({
              type: 'ADD_MANAGEMENT_POSTS',
              payload: posts.concat(response.posts.items),
            })
          setHasNextPage(response.posts?.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [fetchCollector, { loading: coLoading }] =
    useLazyQuery<GetCollectedPosts>(GET_COLLECTOR_QUERY, {
      onCompleted(response) {
        if (response.posts?.items) {
          fetchPosts !== null &&
            dispatch({
              type: 'ADD_MANAGEMENT_POSTS',
              payload: posts.concat(response.posts.items),
            })
          setHasNextPage(response.posts?.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  useEffect(() => {
    fetchPosts !== null
      ? fetch({
          variables: {
            isPublished: fetchPosts === null ? true : fetchPosts,
            skip: page * 8,
            accountId: account.id,
          },
        })
      : fetchCollector({
          variables: {
            skip: page * 8,
            collection: collection,
          },
        })
  }, [page, account, fetchPosts, collection])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      onCompleted() {
        refetch()
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  return (
    <AS3Layout className="w-70 mt-3">
      <FilterComponent />

      <div className="d-flex justify-content-center mb-3">
        <AS3Button
          text
          loading={fetchPosts === null ? coLoading : loading}
          disabled={loading}
          icon={mdiSync}
          onClick={() =>
            fetchPosts !== null
              ? fetch({
                  variables: {
                    isPublished: fetchPosts === null ? true : fetchPosts,
                    skip: page * 8,
                    accountId: account.id,
                  },
                })
              : fetchCollector({
                  variables: {
                    skip: page * 8,
                    collection: collection,
                  },
                })
          }
        />
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
          {posts.map(post => (
            <AS3PostCard
              key={post.id}
              preview
              data={{ ...post, comments: [] }}
              editable={!waitingForUpdate}
              afterEdit={data => updatePost({ variables: { input: data } })}
            />
          ))}
        </>
      </AS3InfiniteScroller>
    </AS3Layout>
  )
}
