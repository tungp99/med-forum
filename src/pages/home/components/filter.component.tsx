import { useNavigate } from 'react-router-dom'
// import { useLazyQuery } from '@apollo/client'

import { Card, Stack } from 'react-bootstrap'
import {
  mdiFire,
  mdiPencilBoxOutline,
  mdiStar,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

import { useAuth } from 'system/auth'
// import { GetPosts } from 'system/generated/gql.types'
import { useDispatch, useSelector } from 'system/store'
import { AS3Chip, AS3Spacer } from 'system/components'
// import { GET_POSTS_QUERY } from '../gql'

export function FilterComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {} = useSelector(store => store.homePage)
  const { authenticated } = useAuth()

  return (
    <>
      <h6>Popular Posts</h6>
      <Card className="mb-3">
        <Card.Body>
          <Stack
            direction="horizontal"
            gap={3}>
            <AS3Chip
              icon={mdiStar}
              onClick={() => {
                dispatch({
                  type: 'SET_HOMEPAGE_POSTS_PAGE',
                  payload: 0,
                })
                dispatch({ type: 'FILTER_POST_UPDATE', payload: 'MostRating' })
                dispatch({
                  type: 'SET_HOMEPAGE_POSTS',
                  payload: [],
                })
              }}
            >
              Most Rating
            </AS3Chip>
            <AS3Chip
              icon={mdiFire}
              onClick={() => {
                dispatch({
                  type: 'SET_HOMEPAGE_POSTS_PAGE',
                  payload: 0,
                })
                dispatch({ type: 'FILTER_POST_UPDATE', payload: 'Hot' })
                dispatch({
                  type: 'SET_HOMEPAGE_POSTS',
                  payload: [],
                })
              }}
            >
              Hot
            </AS3Chip>
            <AS3Chip
              icon={mdiWhiteBalanceSunny}
              onClick={() => {
                dispatch({
                  type: 'SET_HOMEPAGE_POSTS_PAGE',
                  payload: 0,
                })
                dispatch({ type: 'FILTER_POST_UPDATE', payload: 'New' })
                dispatch({
                  type: 'SET_HOMEPAGE_POSTS',
                  payload: [],
                })
              }}
            >
              New
            </AS3Chip>

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
