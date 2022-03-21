import { Controller, useForm } from 'react-hook-form'
import { Card, Stack } from 'react-bootstrap'
import { AS3Button, AS3Input, AS3Spacer } from 'system/components'
import { ChangePassword, ChangePasswordInput } from 'system/generated/gql.types'
import { CHANGE_PASSWORD_MUTATION } from '../gql'
import { Toast } from 'system/store'
import { useMutation } from '@apollo/client'
import { useAuth } from 'system/auth'

export function SecurityFormComponent() {
  const { handleSubmit, control, reset } = useForm<ChangePasswordInput>({
    defaultValues: {
      currentPassword: '',
      confirmNewPassword: '',
      newPassword: '',
    },
  })
  const { gqlContext } = useAuth()
  const [ChangePassword_fetch] = useMutation<ChangePassword>(
    CHANGE_PASSWORD_MUTATION,
    {
      ...gqlContext,
      onCompleted() {
        Toast.success({ title: '', content: 'Password changed!' })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Security</Card.Title>
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              label="Current Password"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              label="New Password"
              onChange={onChange}
              value={value} />
          )}
        />
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              label="Confirm New Password"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Stack direction="horizontal">
          <AS3Spacer />
          <AS3Button
            variant="primary"
            onClick={handleSubmit(data => {
              ChangePassword_fetch({ variables: { input: data } })
              reset()
            })}
          >
            Change Password
          </AS3Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
