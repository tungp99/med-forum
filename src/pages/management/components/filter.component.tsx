import { mdiAccountEye, mdiCalendar, mdiWhiteBalanceSunny } from '@mdi/js'
import { Card, Stack } from 'react-bootstrap'
import { AS3Chip } from 'system/components'

export function Filter() {
  return (
    <>
      <Card>
        <Card.Body>
          <Stack
            direction="horizontal"
            gap={3}>
            <AS3Chip icon={mdiAccountEye}>Most view</AS3Chip>
            <AS3Chip icon={mdiWhiteBalanceSunny}>Latest</AS3Chip>
            <AS3Chip icon={mdiCalendar}>Oldest</AS3Chip>
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}
