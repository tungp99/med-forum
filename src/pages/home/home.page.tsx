import { gql, useQuery } from '@apollo/client'
import { mdiSync } from '@mdi/js'

import { GetHomePageContent } from 'system/generated/gql.types'
import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'

import { FilterComponent } from './components/filter.component'

export default function HomePage() {
  const dispatch = useDispatch()
  const { posts, pagination } = useSelector(store => store.homePage)

  const { fetchMore, refetch } = useQuery<GetHomePageContent>(
    gql`
      query GetHomePageContent($skip: Int!, $take: Int!) {
        posts(skip: $skip, take: $take, order: { createdAt: DESC }) {
          items {
            id
            title
            markdownContent
            createdAt
            updatedAt
            isPublished
            commentsCount
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `,
    {
      variables: {
        skip: pagination.page * pagination.itemsPerPage,
        take: pagination.itemsPerPage,
      },
      onError: err => Toast.error({ title: err.name, content: err.message }),
      onCompleted: data => {
        if (data.posts?.items) {
          dispatch({
            type: 'SET_HOMEPAGE_POSTS',
            payload: [...data.posts.items],
          })
          dispatch({
            type: 'SET_HOMEPAGE_POSTS_PAGE',
            payload: { page: 0 },
          })
        }
      },
    }
  )

  return (
    <AS3LayoutWithSidebar>
      <FilterComponent />

      {posts.length ? (
        posts.map(post => <AS3PostCard
          key={post.id}
          data={{ ...post }} />)
      ) : (
        <AS3Button
          text
          icon={mdiSync}
          onClick={() => refetch()}></AS3Button>
      )}
    </AS3LayoutWithSidebar>
  )
}
