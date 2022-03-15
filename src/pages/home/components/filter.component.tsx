import { useNavigate } from 'react-router-dom'
// import { useLazyQuery } from '@apollo/client'

import { Card, Stack } from 'react-bootstrap'
import {
  mdiFinance,
  mdiFire,
  mdiPencilBoxOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

import { useAuth } from 'system/auth'
// import { GetPosts } from 'system/generated/gql.types'
// import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Chip, AS3Spacer } from 'system/components'
// import { GET_POSTS_QUERY } from '../gql'

export function FilterComponent() {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const { page } = useSelector(store => store.homePage)
  const { authenticated } = useAuth()

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
