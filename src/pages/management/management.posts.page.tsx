import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { useCollector } from 'system/plugins'
import { AS3Button, AS3Layout, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'

import { GET_COLLECTOR_QUERY, GET_MY_POSTS_QUERY } from './gql'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import {
  GetCollectedPosts,
  GetPosts,
  UpdatePost,
} from 'system/generated/gql.types'

export default function ManagementPage() {
  const { account } = useAuth()
  const { fetchPosts, posts } = useSelector(store => store.managementPage)

  const { collection } = useCollector()
  const dispatch = useDispatch()
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(0)
  const resetPage = () => {
    if (page == 0)
      fetchPosts !== null
        ? fetch({
            variables: {
              isPublished: fetchPosts === null ? true : fetchPosts,
              skip: page * 8,
              accountId: account.id,
            },
          })
        : fetchCollection({
            variables: {
              skip: page * 8,
              collection,
            },
          })
  }

  const [fetch, { refetch, loading, called }] = useLazyQuery<GetPosts>(
    GET_MY_POSTS_QUERY,
    {
      onCompleted({ posts: response }) {
        if (response?.items) {
          page === 0
            ? dispatch({
                type: 'SET_MANAGEMENT_POSTS',
                payload: response.items.map(s => ({ ...s, comments: [] })),
              })
            : dispatch({
                type: 'SET_MANAGEMENT_POSTS',
                payload: posts.concat(
                  response.items.map(s => ({ ...s, comments: [] }))
                ),
              })
          setHasNextPage(response.pageInfo.hasNextPage)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [
    fetchCollection,
    {
      refetch: refetchCollection,
      loading: fetchingCollection,
      called: coCalled,
    },
  ] = useLazyQuery<GetCollectedPosts>(GET_COLLECTOR_QUERY, {
    onCompleted({ posts: response }) {
      if (response?.items) {
        page === 0
          ? dispatch({
              type: 'SET_MANAGEMENT_POSTS',
              payload: response.items.map(s => ({ ...s, comments: [] })),
            })
          : dispatch({
              type: 'SET_MANAGEMENT_POSTS',
              payload: posts.concat(
                response.items.map(s => ({ ...s, comments: [] }))
              ),
            })
        setHasNextPage(response.pageInfo.hasNextPage)
      }
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const [updatePost, { loading: waitingForUpdate }] = useMutation<UpdatePost>(
    UPDATE_POST_MUTATION,
    {
      onCompleted({ updatePost: response }) {
        if (response.isSuccess) {
          resetPage()
          setPage(0)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    resetPage()
    setPage(0)
  }, [fetchPosts])

  useEffect(() => {
    if (fetchPosts !== null) {
      const variables = {
        isPublished: fetchPosts === null ? true : fetchPosts,
        skip: page * 8,
        accountId: account.id,
      }
      if (called) refetch(variables)
      else fetch({ variables })
      return
    }

    const variables = {
      skip: page * 8,
      collection,
    }
    if (coCalled) refetchCollection(variables)
    else fetchCollection({ variables })
  }, [page, account])

  return (
    <AS3Layout className="my-3">
      <FilterComponent />

      {posts.map(post => (
        <AS3PostCard
          key={post.id}
          preview
          data={{ ...post, comments: [] }}
          editable={!waitingForUpdate}
          afterEdit={data => updatePost({ variables: { input: data } })}
        />
      ))}

      {hasNextPage && (
        <div className="text-center">
          <AS3Button
            loading={loading || fetchingCollection || waitingForUpdate}
            text
            onClick={() => setPage(page + 1)}
          >
            Load more...
          </AS3Button>
        </div>
      )}
    </AS3Layout>
  )
}
