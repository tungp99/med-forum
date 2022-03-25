import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import {
  AS3Dropdown,
  AS3InfiniteScroller,
  AS3LayoutWithSidebar,
  AS3PostCard,
} from 'system/components'
import { FilterComponent } from './components/filter.component'

import { UPDATE_POST_MUTATION } from 'pages/posts/gql'
import { GetPostsAdmin, UpdatePostInput } from 'system/generated/gql.types'
import { mdiMenuDown } from '@mdi/js'
import { SidebarComponent } from '../management/components/sidebar.component'
import { GET_POSTS_ADMIN_QUERY } from '../management/gql'

export default function AdminManagePostsPage() {
  const {
    managementPage: { fetchPosts },
    homePage: { posts },
    admin: { filterTime, page },
  } = useSelector(store => store)
  const dispatch = useDispatch()

  const [hasNextPage, setHasNextPage] = useState(true)
  const [fetch, { loading }] = useLazyQuery<GetPostsAdmin>(
    GET_POSTS_ADMIN_QUERY,
    {
      onCompleted({ posts: response }) {
        if (response && response?.items) {
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
    console.log(page)

    fetch({
      variables: {
        isPublished: fetchPosts,
        skip: page * 8,
        timeFilter: filterTime,
      },
    })
  }, [page, fetchPosts, filterTime])

  const [updatePost, { loading: waitingForUpdate }] =
    useMutation<UpdatePostInput>(UPDATE_POST_MUTATION, {
      onCompleted() {
        fetch()
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
      <AS3InfiniteScroller
        callback={() => {
          dispatch({
            type: 'SET_ADMIN_POSTS_PAGE',
            payload: page + 1,
          })
        }}
        updateCallbackUsingDependencies={[page]}
        allowScrollingWhen={hasNextPage && !loading}
      >
        <>
          {posts.map(post => (
            <AS3PostCard
              key={post.id}
              preview
              data={post}
              editable={!waitingForUpdate}
              afterEdit={posts => updatePost({ variables: { input: posts } })}
            />
          ))}
        </>
      </AS3InfiniteScroller>
    </AS3LayoutWithSidebar>
  )
}
