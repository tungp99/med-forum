import { gql, useQuery } from '@apollo/client'
import { mdiSync } from '@mdi/js'

import { GetHomePageContent } from 'system/generated/gql.types'
import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'

import { FilterComponent } from './components/filter.component'
import { useNavigate } from 'react-router-dom'
import { PAGE_ROUTE } from 'system/constants'

export default function HomePage() {
  const navigate = useNavigate()
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

      <div className="d-flex justify-content-center mb-3">
        <AS3Button
          text
          icon={mdiSync}
          onClick={() => refetch()}></AS3Button>
      </div>

      {posts.map(post => (
        <AS3PostCard
          key={post.id}
          data={{ ...post }}
          onClick={() => navigate(`/posts/${post.id}`)}
        />
      ))}
    </AS3LayoutWithSidebar>
  )
}
