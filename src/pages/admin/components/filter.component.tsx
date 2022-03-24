import { useNavigate } from 'react-router-dom'

import { Card, Stack } from 'react-bootstrap'
import { mdiPencilBoxOutline } from '@mdi/js'

import { useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Chip, AS3Spacer } from 'system/components'

export function FilterComponent() {
  const navigate = useNavigate()
  const { filterType } = useSelector(store => store.admin)
  const dispatch = useDispatch()
  const { authenticated } = useAuth()

  return (
    <Card className="mb-3">
      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}>
          <AS3Chip
            active={filterType === 'Today'}
            onClick={() =>
              dispatch({ type: 'FILTER_POSTS_UPDATE', payload: 'Today' })
            }
          >
            Today
          </AS3Chip>

          <AS3Chip
            active={filterType === 'This week'}
            onClick={() =>
              dispatch({ type: 'FILTER_POSTS_UPDATE', payload: 'This week' })
            }
          >
            This week
          </AS3Chip>
          <AS3Chip
            active={filterType === 'This month'}
            onClick={() =>
              dispatch({ type: 'FILTER_POSTS_UPDATE', payload: 'This month' })
            }
          >
            This month
          </AS3Chip>
          <AS3Chip
            active={filterType === 'All'}
            onClick={() =>
              dispatch({ type: 'FILTER_POSTS_UPDATE', payload: 'All' })
            }
          >
            All
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
  )
}
