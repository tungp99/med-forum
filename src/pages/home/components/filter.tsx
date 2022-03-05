import { Card, Stack } from 'react-bootstrap'

import { AS3Chip } from 'system/components/as3-chip/as3-chip.component'
import { mdiFinance, mdiFire, mdiWhiteBalanceSunny } from '@mdi/js'

export function Filter() {
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
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}
