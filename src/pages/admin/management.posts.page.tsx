import { useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import {
  AS3Button,
  AS3Dropdown,
  AS3LayoutWithSidebar,
  AS3PostCard,
} from 'system/components'
import { FilterComponent } from './components/filter.component'

import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import { GetPostsAdmin, UpdatePostInput } from 'system/generated/gql.types'
import { mdiMenuDown, mdiSync } from '@mdi/js'
import { SidebarComponent } from '../management/components/sidebar.component'
import { GET_POSTS_ADMIN_QUERY } from '../management/gql'

export default function AdminManagePostsPage() {
  const { authenticated, gqlContext } = useAuth()
  const {
    managementPage: { fetchPublished },
    homePage: { page, posts },
    admin: { filterTime },
  } = useSelector(store => store)
  const dispatch = useDispatch()

  const fetchVariables = useMemo(
    () => ({
      isPublished: fetchPublished,
      skip: page * 8,
      timeFilter: filterTime,
    }),
    [fetchPublished, page, filterTime]
  )

  const { refetch, loading } = useQuery<GetPostsAdmin>(GET_POSTS_ADMIN_QUERY, {
    variables: {
      isPublished: fetchVariables.isPublished,
      skip: fetchVariables.skip,
      timeFilter: filterTime,
    },
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
    <AS3LayoutWithSidebar
      sidebar={
        <>
          <h6 className="lh-lg">Navigation</h6>
          <SidebarComponent />
        </>
      }
    >
      <div className="">
        <AS3Dropdown
          className="ms-4"
          suffixIcon={mdiMenuDown}
          align="start"
          items={[
            {
              text: 'Published',
              separate: true,
              onClick: () => dispatch({ type: 'SET_POSTS_FILTER_PUBLISHED' }),
            },
            {
              text: 'Drafts',
              separate: true,
              onClick: () => dispatch({ type: 'SET_POSTS_FILTER_DRAFTS' }),
            },
          ]}
        >
          <span>{fetchPublished ? 'Published' : 'Drafts'}</span>
        </AS3Dropdown>
        <FilterComponent />
      </div>

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
          key={post.id}
          preview
          data={post}
          editable={!waitingForUpdate}
          afterEdit={posts => updatePost({ variables: { input: posts } })}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
