import { useEffect, useMemo, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { FilterComponent } from '../components/filter.component'

import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import { GetPosts, UpdatePostInput } from 'system/generated/gql.types'
import { mdiSync } from '@mdi/js'
import { SidebarComponent } from '../components/sidebar.component'
import { GET_POSTS_ADMIN_QUERY } from '../gql'

export default function AdminManagementPage() {
  const { authenticated, gqlContext } = useAuth()
  const { fetchPublished } = useSelector(store => store.managementPage)
  const { page } = useSelector(store => store.homePage)
  const dispatch = useDispatch()

  const fetchVariables = useMemo(
    () => ({
      isPublished: fetchPublished,
      skip: page * 8,
    }),
    [fetchPublished, page]
  )

  const { refetch, loading, data } = useQuery<GetPosts>(GET_POSTS_ADMIN_QUERY, {
    variables: { fetchVariables },
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
    refetch()
  }, [fetchVariables])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      ...gqlContext,
      onCompleted() {
        refetch()
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  useEffect(() => {
    if (authenticated) refetch()
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
          preview
          data={{ ...post, comments: [] }}
          editable={!waitingForUpdate}
          afterEdit={data => updatePost({ variables: { input: data } })}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
