import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { gql, useLazyQuery } from '@apollo/react-hooks'

import { Card, Stack } from 'react-bootstrap'
import {
  mdiFinance,
  mdiFire,
  mdiFormatListCheckbox,
  mdiPencilBoxOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

import { useDispatch, useSelector } from 'system/store'
import { PAGE_ROUTE } from 'system/constants'
import { AS3Chip, AS3Spacer } from 'system/components'
import { GetCurrentUserPosts } from 'system/generated/gql.types'

export function FilterComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pagination } = useSelector(store => store.homePage)
  const { user, isAuthenticated } = useAuth0()

  const [fetchCurrentUserPosts, { fetchMore }] =
    useLazyQuery<GetCurrentUserPosts>(
      gql`
        query GetCurrentUserPosts($skip: Int!, $take: Int!) {
          posts(
            where: { published: { eq: true } }
            skip: $skip
            take: $take
            order: { createdAt: DESC }
          ) {
            items {
              id
              title
              markdownContent
              createdAt
              updatedAt
              published
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
          userId: user?.sub,
        },
        onError: err =>
          dispatch({
            type: 'TOAST_ERROR',
            payload: { title: err.name, content: err.message },
          }),
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
        notifyOnNetworkStatusChange: true,
      }
    )

  return (
    <>
      <h6>Popular Posts</h6>
      <Card className="mb-3">
        <Card.Body>
          <Stack
            direction="horizontal"
            gap={3}>
            <AS3Chip icon={mdiFire}>Hot</AS3Chip>
            <AS3Chip icon={mdiWhiteBalanceSunny}>New</AS3Chip>
            <AS3Chip icon={mdiFinance}>Rising</AS3Chip>

            <AS3Spacer />

            {isAuthenticated && (
              <>
                <AS3Chip
                  icon={mdiFormatListCheckbox}
                  onClick={() => fetchCurrentUserPosts()}
                >
                  Mine
                </AS3Chip>

                <AS3Chip
                  icon={mdiPencilBoxOutline}
                  onClick={() => navigate(PAGE_ROUTE.POSTS.CREATE)}
                >
                  Write One
                </AS3Chip>
              </>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}
