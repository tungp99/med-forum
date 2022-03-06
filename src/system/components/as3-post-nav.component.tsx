import { useNavigate } from 'react-router-dom'
import { Card, Stack } from 'react-bootstrap'
import {
  mdiFinance,
  mdiFire,
  mdiFormatListCheckbox,
  mdiPencilBoxOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

import { PAGE_ROUTE } from 'system/constants'
import { AS3Chip, AS3Spacer } from 'system/components'

export function AS3PostNavigator() {
  const navigate = useNavigate()

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

            <AS3Chip
              icon={mdiFormatListCheckbox}
              onClick={() => navigate(PAGE_ROUTE.POSTS.MINE)}
            >
              Mine
            </AS3Chip>
            <AS3Chip
              icon={mdiPencilBoxOutline}
              onClick={() => navigate(PAGE_ROUTE.POSTS.CREATE)}
            >
              Write One
            </AS3Chip>
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}
