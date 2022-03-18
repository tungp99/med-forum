import { useEffect, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Card, Stack } from 'react-bootstrap'
import { mdiEarth } from '@mdi/js'

import { Account } from 'system/types'
import { useAuth } from 'system/auth'
import { Toast } from 'system/store'
import { AS3Button, AS3Input, AS3Spacer, AS3Switch } from 'system/components'
import {
  UpdateAccountInput,
  UpdateProfileContact,
} from 'system/generated/gql.types'
import { UPDATE_PROFILE_CONTACT_MUTATION } from '../gql'

type NameFormComponentProps = {
  data: Account
}

export function NameFormComponent({ data }: NameFormComponentProps) {
  const { gqlContext } = useAuth()
  const [save, { loading }] = useMutation<UpdateProfileContact>(
    UPDATE_PROFILE_CONTACT_MUTATION,
    {
      ...gqlContext,
      onCompleted({ updateAccount: response }) {
        response.affectedRecords === 1 &&
          Toast.success({
            title: 'Updated profile successfully!',
            content: 'Changes will be applied in several minutes',
          })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const defaultValues = useMemo<UpdateAccountInput>(() => {
    const { id, username, profile } = data

    return {
      id,
      username: username ?? '',
      profile: {
        isPublic: profile.isPublic,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        birthDate: profile.birthDate
          ? DateTime.fromISO(profile.birthDate).toISODate()
          : null,
      },
    }
  }, [data])

  const { handleSubmit, control, reset } = useForm<UpdateAccountInput>({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

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

        <AS3Input
          label="Email"
          size="lg"
          value={data.email}
          readOnly />

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

        {data.profile.birthDate ? (
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
        ) : (
          <AS3Input
            type="date"
            label="Birthday"
            size="lg" />
        )}

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