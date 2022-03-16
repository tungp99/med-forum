import { useEffect, useMemo, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useStore } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from './components/filter.component'

import { GET_MY_POSTS_QUERY } from './gql'
import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import { GetPosts, UpdatePostInput } from 'system/generated/gql.types'
import { mdiSync } from '@mdi/js'
import { SidebarComponent } from './components/sidebar.component'

export default function ManagementPage() {
  const { account, authenticated, gqlContext } = useAuth()
  const { fetchPublished } = useStore(store => store.managementPage)
  const [state] = useState({ page: 0 })

  const fetchVariables = useMemo(
    () => ({
      isPublished: fetchPublished,
      skip: state.page * 8,
      accountId: account.id,
    }),
    [state, account, fetchPublished]
  )
  const [fetch, { data, loading, refetch }] = useLazyQuery<GetPosts>(
    GET_MY_POSTS_QUERY,
    {
      ...gqlContext,
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
      variables: fetchVariables,
    }
  )

  useEffect(() => {
    fetch()
  }, [fetchVariables])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      ...gqlContext,
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  useEffect(() => {
    if (authenticated) fetch()
  }, [authenticated])

  return (
    <AS3LayoutWithSidebar sidebar={<SidebarComponent />}>
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

      {data?.posts?.items?.map(post => (
        <AS3PostCard
          key={post.id}
          data={{ ...post }}
          editable={!waitingForUpdate}
          afterEdit={async data => {
            await updatePost({ variables: { input: data } })
            refetch()
          }}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
