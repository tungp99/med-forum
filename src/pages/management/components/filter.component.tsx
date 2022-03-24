import { useNavigate } from 'react-router-dom'

import { Card, Stack } from 'react-bootstrap'
import { mdiBookmark, mdiEarth, mdiFile, mdiPencilBoxOutline } from '@mdi/js'

import { useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Chip, AS3Spacer } from 'system/components'

export function FilterComponent() {
  const navigate = useNavigate()
  const { fetchPosts: fetchPublished } = useSelector(
    store => store.managementPage
  )
  const dispatch = useDispatch()
  const { authenticated } = useAuth()
  return (
    <Card className="mb-3">
      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}>
          <AS3Chip
            active={fetchPublished === true}
            icon={mdiEarth}
            onClick={() => dispatch({ type: 'SET_POSTS_FILTER_PUBLISHED' })}
          >
            Published
          </AS3Chip>

          <AS3Chip
            active={fetchPublished === false}
            icon={mdiFile}
            onClick={() => dispatch({ type: 'SET_POSTS_FILTER_DRAFTS' })}
          >
            Draft
          </AS3Chip>

          <AS3Chip
            active={fetchPublished === null}
            icon={mdiBookmark}
            onClick={() => dispatch({ type: 'SET_POSTS_FILTER_COLLECTED' })}
          >
            Collected
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
