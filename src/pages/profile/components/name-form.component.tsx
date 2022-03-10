import { Card, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Input, AS3Spacer } from 'system/components'

export function NameFormComponent() {
  const { account } = useAuth()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: account?.username,
      firstName: account?.profile?.firstName,
      lastName: account?.profile?.lastName,
      birthDate: new Date(),
      phoneNumber: '',
      makePublic: true,
    },
  })

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">You on AS3</Card.Title>
        <Card.Text>
          <AS3Input label="Username" />
          <AS3Input label="First Name" />
          <AS3Input label="Last Name" />
          <AS3Input
            label="Birthday"
            type="date" />
          <AS3Input
            label="Phone Number"
            type="tel" />
        </Card.Text>

        <Stack direction="horizontal">
          <AS3Spacer />
          <AS3Button variant="primary">Save</AS3Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
