import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Controller, useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { Card, Stack } from 'react-bootstrap'
import { mdiEarth } from '@mdi/js'

import { useAuth } from 'system/auth'
import { Toast } from 'system/store'
import { AS3Button, AS3Input, AS3Spacer, AS3Switch } from 'system/components'
import {
  UpdateAccountInput,
  UpdateProfileContact,
} from 'system/generated/gql.types'

export function NameFormComponent() {
  const { account, refreshAccount, gqlContext } = useAuth()
  const [save, { loading }] = useMutation<UpdateProfileContact>(
    gql`
      mutation UpdateProfileContact($input: UpdateAccountInput!) {
        updateAccount(input: $input) {
          isSuccess
          affectedRecords
        }
      }
    `,
    {
      ...gqlContext,
      onCompleted({ updateAccount: response }) {
        response.affectedRecords && refreshAccount()
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const { handleSubmit, control } = useForm<UpdateAccountInput>({
    defaultValues: useMemo(
      () => ({
        id: account.id,
        username: account.username ?? '',
        profile: {
          isPublic: account.profile.isPublic,
          firstName: account.profile.firstName,
          lastName: account.profile.lastName,
          phoneNumber: account.profile.phoneNumber,
          birthDate: account.profile.birthDate
            ? DateTime.fromISO(account.profile.birthDate).toISODate()
            : DateTime.now().toISODate(),
          professions: account.profile.professions,
          educations: account.profile.educations,
        },
      }),
      [account]
    ),
  })

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">
          <span>You on AS3</span>
          <AS3Spacer />

          <Controller
            control={control}
            name="profile.isPublic"
            render={({ field: { onChange, value } }) => (
              <AS3Switch
                prefixIcon={mdiEarth}
                checked={value}
                onChange={onChange}
              />
            )}
          />
        </Card.Title>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              label="Username"
              size="lg"
              value={value ?? ''}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.firstName"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              label="First Name"
              size="lg"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.lastName"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              label="Last Name"
              size="lg"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.birthDate"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              type="date"
              label="Birthday"
              size="lg"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.phoneNumber"
          render={({ field: { onChange, value } }) => (
            <AS3Input
              type="tel"
              label="Phone Number"
              size="lg"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Stack direction="horizontal">
          <AS3Spacer />
          <AS3Button
            variant="primary"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit(data =>
              save({ variables: { input: { ...data } } })
            )}
          >
            Save
          </AS3Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
