import { useEffect, useMemo, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Layout, AS3PostCard } from 'system/components'
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
  const { account, authenticated } = useAuth()
  const { fetchPosts } = useSelector(store => store.managementPage)
  const [state, setState] = useState({
    page: 0,
    data: {} as GetPosts | GetCollectedPosts,
  })
  const { collection } = useCollector()

  const fetchVariables = useMemo(
    () => ({
      isPublished: fetchPosts === null ? true : fetchPosts,
      skip: state.page * 8,
      accountId: account.id,
    }),
    [state.page, fetchPosts, account]
  )
  const [fetch, { loading, refetch }] = useLazyQuery<GetPosts>(
    GET_MY_POSTS_QUERY,
    {
      onCompleted(response) {
        fetchPosts !== null && setState({ ...state, data: response })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
      variables: fetchVariables,
    }
  )

  const [fetchCollector, { loading: coLoading }] =
    useLazyQuery<GetCollectedPosts>(GET_COLLECTOR_QUERY, {
      onCompleted(response) {
        fetchPosts === null && setState({ ...state, data: response })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
      variables: {
        skip: state.page * 8,
        collection: collection,
      },
    })

  useEffect(() => {
    fetchPosts !== null ? fetch() : fetchCollector()
  }, [fetchVariables, fetchPosts])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      onCompleted() {
        refetch()
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  useEffect(() => {
    if (authenticated) fetch()
  }, [authenticated])

  return (
    <AS3Layout className="w-70 mt-3">
      <FilterComponent />

      <div className="d-flex justify-content-center mb-3">
        <AS3Button
          text
          loading={fetchPosts === null ? coLoading : loading}
          disabled={loading}
          icon={mdiSync}
          onClick={() => (fetchPosts !== null ? fetch() : fetchCollector())}
        />
      </div>

      {state.data?.posts?.items?.map(post => (
        <AS3PostCard
          key={post.id}
          preview
          data={{ ...post, comments: [] }}
          editable={!waitingForUpdate}
          afterEdit={data => updatePost({ variables: { input: data } })}
        />
      ))}
    </AS3Layout>
  )
}
