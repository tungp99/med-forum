import { useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { Controller, useForm } from 'react-hook-form'
import { Card } from 'react-bootstrap'

import { Account } from 'system/types'
import { AS3Button, AS3Editor, AS3Spacer } from 'system/components'

import { EditButtonComponent } from './edit-button.component'
import { UpdateAccountInput } from 'system/generated/gql.types'

type AboutCardComponentProps = {
  data: Account
}

export function AboutCardComponent({ data }: AboutCardComponentProps) {
  const defaultValues = useMemo(() => {
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
          : undefined,
        professions: profile.professions,
        educations: profile.educations,
        about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum
        dolor sit amet consectetur adipiscing elit. Sodales ut etiam sit amet
        nisl purus in mollis. Nibh sit amet commodo nulla facilisi nullam
        vehicula ipsum. Amet est placerat in egestas erat imperdiet sed
        euismod nisi.`,
      },
    }
  }, [data])

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const [editing, setEditing] = useState(false)

  return (
    <Card className="about">
      <Card.Body>
        <Card.Title>
          About
          <AS3Spacer />
          {!editing && <EditButtonComponent onClick={() => setEditing(true)} />}
        </Card.Title>
        <Card.Text as="div">
          <Controller
            control={control}
            name="profile.about"
            render={({ field: { onChange, value } }) => (
              <AS3Editor
                preview={!editing}
                height="auto"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {editing && (
            <AS3Button
              size="sm"
              variant="primary"
              onClick={handleSubmit(data => {
                console.log(data)
                setEditing(false)
              })}
            >
              Save
            </AS3Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
