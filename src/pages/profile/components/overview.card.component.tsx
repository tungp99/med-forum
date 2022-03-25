import { Card, ListGroup, Ratio } from 'react-bootstrap'
import Icon from '@mdi/react'
import {
  mdiCamera,
  mdiEmailMultipleOutline,
  mdiHospitalBuilding,
  mdiPhone,
  mdiSchoolOutline,
} from '@mdi/js'

import { Profile } from 'system/types'
import { AS3Avatar, AS3Button } from 'system/components'
import { useMemo, useRef } from 'react'
import { Toast } from 'system/store'
import { useMutation } from '@apollo/client'
import { UPDATE_AVATAR_MUTATION } from '../gql'
import { UpdateAvatar } from 'system/generated/gql.types'

type OverviewCardComponentProps = {
  data: { profile: Profile; username: string | null; email: string | null }
  editable: boolean
}

export function OverviewCardComponent({
  data: {
    profile: {
      avatarUrl,
      firstName,
      lastName,
      country,
      experience,
      education,
      phoneNumber,
    },
    username,
    email,
  },
  editable,
}: OverviewCardComponentProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const { workplaces, occupations, schools } = useMemo(() => {
    let workplaces = []
    let occupations = []
    for (const item of experience) {
      item.isWorking === true &&
        (workplaces.push(item.organization), occupations.push(item.position))
    }
    workplaces = Array.from(new Set(workplaces))
    occupations = Array.from(new Set(occupations))

    let schools = []
    for (const item of education) {
      item.isWorking === true && schools.push(item.organization)
    }
    schools = Array.from(new Set(schools))

    return { workplaces, occupations, schools }
  }, [experience, education])

  const [updateAvatar, { data: avatarMutationResponse }] =
    useMutation<UpdateAvatar>(UPDATE_AVATAR_MUTATION, {
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })

  return (
    <Card className="overview">
      <input
        ref={avatarInputRef}
        type="file"
        className="d-none"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.item(0)
          if (file && file.type.startsWith('image/')) {
            updateAvatar({
              variables: {
                input: {
                  // accountId = null means current user's id
                  file,
                },
              },
            })
          } else {
            Toast.error({ title: '', content: 'Inappropriate file type' })
          }

          e.target.value = ''
        }}
      />

      <Ratio aspectRatio={20}>
        <Card.Img
          variant="top"
          src={'https://via.placeholder.com/600x150.jpg'}
        />
      </Ratio>

      <div className="introduction">
        <Card.Body>
          <div className="avatar-wrapper">
            <AS3Avatar
              src={
                avatarMutationResponse?.updateAvatar.avatarUrl ??
                avatarUrl ??
                undefined
              }
              width={128}
              height={128}
            >
              {editable && (
                <AS3Button
                  icon={mdiCamera}
                  iconSize={1.2}
                  text
                  iconColor="#666"
                  onClick={() => {
                    avatarInputRef.current?.click()
                  }}
                />
              )}
            </AS3Avatar>
          </div>

          <Card.Title className="mt-2">
            {firstName} {lastName}
          </Card.Title>

          {occupations.length > 0 && (
            <Card.Subtitle className="mb-2 d-flex align-items-center">
              {occupations.join(' | ')}
            </Card.Subtitle>
          )}

          {username && (
            <Card.Subtitle className="mb-3">{`as3/${username}`}</Card.Subtitle>
          )}

          <Card.Subtitle className="mb-2 d-flex align-items-center">
            <Icon
              className="me-1"
              path={mdiEmailMultipleOutline}
              size={0.8} />{' '}
            {email}
          </Card.Subtitle>

          {phoneNumber && (
            <Card.Subtitle className="mb-2 d-flex align-items-center">
              <Icon
                className="me-1"
                path={mdiPhone}
                size={0.8} /> {phoneNumber}
            </Card.Subtitle>
          )}
          {schools.length > 0 && (
            <Card.Subtitle className="mb-2">Student</Card.Subtitle>
          )}
          <Card.Subtitle className="location">{country}</Card.Subtitle>
        </Card.Body>

        <ListGroup
          className="work"
          variant="flush">
          {workplaces.map((h, key) => (
            <ListGroup.Item
              className="border-0"
              key={key}>
              <Icon
                className="me-2"
                path={mdiHospitalBuilding}
                size={1} />
              {h}
            </ListGroup.Item>
          ))}
          {schools.length !== 0 &&
            schools.map((h, key) => (
              <ListGroup.Item key={key}>
                <Icon
                  className="me-2"
                  path={mdiSchoolOutline}
                  size={1} />
                {h}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </Card>
  )
}
