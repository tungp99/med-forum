import { Card, Stack } from 'react-bootstrap'
import { AS3Button, AS3Input, AS3Spacer } from 'system/components'

export function SecurityFormComponent() {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Security</Card.Title>

        <AS3Input label="Current Password" />

        <AS3Input label="New Password" />

        <AS3Input label="Confirm New Password" />

        <Stack direction="horizontal">
          <AS3Spacer />
          <AS3Button variant="primary">Change Password</AS3Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
