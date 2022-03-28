import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import {
  AS3Button,
  AS3Dropdown,
  AS3LayoutWithSidebar,
  AS3PostCard,
} from 'system/components'
import { FilterComponent } from './components/filter.component'

import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import {
  GetPostsAdmin,
  GetPostsAdmin_posts_items,
  UpdatePostInput,
} from 'system/generated/gql.types'
import { mdiMenuDown } from '@mdi/js'
import { SidebarComponent } from '../management/components/sidebar.component'
import { GET_POSTS_ADMIN_QUERY } from '../management/gql'

export default function AdminManagePostsPage() {
  const {
    managementPage: { fetchPosts },
    homePage: { posts },
    admin: { filterTime },
  } = useSelector(store => store)
  const dispatch = useDispatch()

  const createPage = (items: GetPostsAdmin_posts_items[]) => {
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
  const resetPage = () => {
    page === 0 &&
      fetch({
        variables: {
          isPublished: fetchPosts,
          skip: page * 8,
          timeFilter: filterTime,
        },
      })
  }
  const [page, setPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fetch, { loading, called, refetch }] = useLazyQuery<GetPostsAdmin>(
    GET_POSTS_ADMIN_QUERY,
    {
      onCompleted({ posts: response }) {
        if (response && response?.items) {
          createPage(response.items)

          setHasNextPage(response.pageInfo.hasNextPage)
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
  }, [fetchPosts, filterTime])

  useEffect(() => {
    called
      ? refetch({
          isPublished: fetchPosts,
          skip: page * 8,
          timeFilter: filterTime,
        })
      : fetch({
          variables: {
            isPublished: fetchPosts,
            skip: page * 8,
            timeFilter: filterTime,
          },
        })
  }, [page])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      onCompleted() {
        resetPage()
        setPage(0)
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

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
          <span>{fetchPosts ? 'Published' : 'Drafts'}</span>
        </AS3Dropdown>
        <FilterComponent />
      </div>

      <div className="d-flex justify-content-center mb-3"></div>

      {posts.map(post => (
        <AS3PostCard
          key={post.id}
          preview
          data={post}
          editable={!waitingForUpdate}
          afterEdit={posts => updatePost({ variables: { input: posts } })}
        />
      ))}

      {hasNextPage && (
        <div className="text-center">
          <AS3Button
            loading={loading || waitingForUpdate}
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
