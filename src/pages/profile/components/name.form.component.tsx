import { useEffect, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Card, Stack } from 'react-bootstrap'
import { mdiEarth } from '@mdi/js'

import { Account } from 'system/types'
import { useAuth } from 'system/auth'
import { Toast } from 'system/store'
import {
  AS3Button,
  AS3Input,
  AS3Select,
  AS3Spacer,
  AS3Switch,
} from 'system/components'
import {
  UpdateAccountInput,
  UpdateProfileContact,
} from 'system/generated/gql.types'
import { UPDATE_PROFILE_CONTACT_MUTATION } from '../gql'
import { locales } from 'system/plugins/index'

type NameFormComponentProps = {
  data: Account
  onSave: () => void
}

export function NameFormComponent({ data, onSave }: NameFormComponentProps) {
  const {} = useAuth()
  const [save, { loading }] = useMutation<UpdateProfileContact>(
    UPDATE_PROFILE_CONTACT_MUTATION,
    {
      onCompleted({ updateAccount: response }) {
        if (response.affectedRecords === 1) {
          Toast.success({
            title: 'Updated profile successfully!',
            content: 'Changes will be applied in several minutes',
          })
          onSave()
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const formValues = useMemo<UpdateAccountInput>(() => {
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
          ? DateTime.fromISO(profile.birthDate).toISO()
          : null,
        countryCode: profile.countryCode,
      },
    }
  }, [data])
  const { handleSubmit, control, reset } = useForm({
    defaultValues: formValues,
  })

  useEffect(() => {
    reset(formValues)
  }, [formValues])

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

        {!data.profile.birthDate ? (
          <Controller
            control={control}
            name="profile.birthDate"
            render={({ field: { onChange, value } }) => {
              console.log(value)
              return (
                <AS3Input
                  type="date"
                  label="Birthday"
                  size="lg"
                  value={value ?? ''}
                  onChange={onChange}
                />
              )
            }}
          />
        ) : (
          <AS3Input
            type="date"
            label="Birthday"
            size="lg"
            readOnly />
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
        <Controller
          control={control}
          name="profile.countryCode"
          render={({ field: { onChange, value } }) => (
            <AS3Select
              label="Country"
              size="lg"
              onChange={onChange}
              value={value?.toUpperCase() ?? ''}
              items={[
                { text: '-', value: '' },
                ...Object.entries(locales).map(([value, text]) => ({
                  text,
                  value,
                })),
              ]}
            />
          )}
        />
        <Stack direction="horizontal">
          <AS3Spacer />
          <AS3Button
            variant="primary"
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
