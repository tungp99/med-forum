import { Card, Stack } from 'react-bootstrap'
import {
  faFireFlameSimple,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'

import { AS3Chip } from 'system/components/as3-chip/as3-chip.component'

export function Filter() {
  return (
    <>
      <h6>Popular Posts</h6>
      <Card className='mb-3'>
        <Card.Body>
          <Stack
            direction="horizontal"
            gap={3}>
            <AS3Chip icon={faFireFlameSimple}>Hot</AS3Chip>
            <AS3Chip icon={faSun}>New</AS3Chip>
            <AS3Chip icon={faArrowTrendUp}>Rising</AS3Chip>
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}
