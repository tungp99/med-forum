import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import { Card, Stack } from 'react-bootstrap'
import {
  mdiFinance,
  mdiFire,
  mdiFormatListCheckbox,
  mdiPencilBoxOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

import { useAuth } from 'system/auth'
import { GetPosts } from 'system/generated/gql.types'
import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Chip, AS3Spacer } from 'system/components'
import { GET_POSTS_QUERY } from '../gql'

export function FilterComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pagination } = useSelector(store => store.homePage)
  const { account, authenticated } = useAuth()

  const [fetchCurrentUserPosts] = useLazyQuery<GetPosts>(GET_POSTS_QUERY, {
    variables: {
      skip: pagination.page * pagination.itemsPerPage,
      take: pagination.itemsPerPage,
      userId: account.id,
    },
    onCompleted({ posts }) {
      if (posts?.items) {
        dispatch({
          type: 'SET_HOMEPAGE_POSTS',
          payload: [...posts.items],
        })
        dispatch({
          type: 'SET_HOMEPAGE_POSTS_PAGE',
          payload: { page: 0 },
        })
      }
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

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

            {authenticated && (
              <>
                <AS3Chip
                  icon={mdiFormatListCheckbox}
                  onClick={() => fetchCurrentUserPosts()}
                >
                  Mine
                </AS3Chip>

                <AS3Chip
                  icon={mdiPencilBoxOutline}
                  onClick={() => navigate('/posts/write')}
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
