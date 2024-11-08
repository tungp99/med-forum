import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Card, Stack } from 'react-bootstrap'

import { Toast } from 'system/store'
import { AS3Button, AS3Input, AS3Spacer } from 'system/components'
import { CHANGE_PASSWORD_MUTATION } from '../gql'
import { ChangePassword, ChangePasswordInput } from 'system/generated/gql.types'

export function SecurityFormComponent() {
  const { handleSubmit, control, reset } = useForm<ChangePasswordInput>({
    defaultValues: {
      currentPassword: '',
      confirmNewPassword: '',
      newPassword: '',
    },
  })
  const [changePassword, { error }] = useMutation<ChangePassword>(
    CHANGE_PASSWORD_MUTATION,
    {
      onCompleted({ changePassword: response }) {
        if (response.isSuccess) {
          Toast.success({ title: '', content: 'Password changed!' })
          reset()
        } else Toast.error({ title: '', content: 'Cannot update password ;)' })
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
              type="password"
              label="Current Password"
              value={value}
              onChange={onChange}
              errors={
                error?.graphQLErrors[0].extensions.propertyName ===
                'CurrentPassword'
                  ? error?.graphQLErrors.map(s => s.message)
                  : undefined
              }
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              type="password"
              label="New Password"
              onChange={onChange}
              value={value}
              errors={
                error?.graphQLErrors[0].extensions.propertyName ===
                'NewPassword'
                  ? error?.graphQLErrors.map(s => s.message)
                  : undefined
              }
            />
          )}
        />
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              type="password"
              label="Confirm New Password"
              value={value}
              onChange={onChange}
              errors={
                error?.graphQLErrors[0].extensions.propertyName ===
                'ConfirmNewPassword'
                  ? error?.graphQLErrors.map(s => s.message)
                  : undefined
              }
            />
          )}
        />
        <Stack direction="horizontal">
          <AS3Spacer />
          <AS3Button
            variant="primary"
            onClick={handleSubmit(data => {
              changePassword({ variables: { input: data } })
            })}
          >
            Change Password
          </AS3Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
