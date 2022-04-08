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
import { useNavigate } from 'react-router-dom'

type OverviewCardComponentProps = {
  data: {
    profile: Profile
    username: string | null
    email: string | null
    id: string
  }
  editable: boolean
  isProfile?: boolean
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
      qualifications,
    },
    username,
    email,
    id,
  },
  isProfile,
  editable,
}: OverviewCardComponentProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const { workplaces, occupations, schools, departments } = useMemo(() => {
    let workplaces = []
    let occupations = []
    for (const item of experience) {
      item.isWorking === true &&
        (workplaces.push(item.organization), occupations.push(item.position))
    }
    workplaces = Array.from(new Set(workplaces))
    occupations = Array.from(new Set(occupations))

    let schools = []
    let departments = []
    for (const item of education) {
      item.isWorking === true && schools.push(item.organization),
        departments.push(item.position)
    }
    schools = Array.from(new Set(schools))
    departments = Array.from(new Set(departments))

    return { workplaces, occupations, schools, departments }
  }, [experience, education])

  const [updateAvatar, { data: avatarMutationResponse }] =
    useMutation<UpdateAvatar>(UPDATE_AVATAR_MUTATION, {
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    })
  const navigate = useNavigate()

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

      <Ratio aspectRatio={isProfile ? 20 : 15}>
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
              width={isProfile ? 128 : 64}
              height={isProfile ? 128 : 64}
            >
              {(editable && (
                <AS3Button
                  icon={mdiCamera}
                  iconSize={1.2}
                  text
                  iconColor="#666"
                  onClick={() => {
                    avatarInputRef.current?.click()
                  }}
                />
              )) ||
                undefined}
            </AS3Avatar>
          </div>

          <Card.Title
            className={isProfile ? 'mt-2' : 'mt-2 cursor'}
            onClick={() => (isProfile ? null : navigate(`/profile/${id}`))}
          >
            {firstName} {lastName}
          </Card.Title>

          {isProfile ? (
            <>
              {username && (
                <Card.Subtitle className="mb-3">{`as3/${username}`}</Card.Subtitle>
              )}

              {occupations.length > 0 && (
                <Card.Subtitle className="mb-2 d-flex align-items-center">
                  {occupations.join(' | ')}
                </Card.Subtitle>
              )}

              <Card.Subtitle className="mb-2 d-flex align-items-center">
                <Icon
                  className="me-1"
                  path={mdiEmailMultipleOutline}
                  size={0.8}
                />{' '}
                {email}
              </Card.Subtitle>

              {phoneNumber && (
                <Card.Subtitle className="mb-2 d-flex align-items-center">
                  <Icon
                    className="me-1"
                    path={mdiPhone}
                    size={0.8} />{' '}
                  {phoneNumber}
                </Card.Subtitle>
              )}
              {schools.length > 0 && (
                <Card.Subtitle className="mb-2">Student</Card.Subtitle>
              )}

              <Card.Subtitle className="location fw-light">
                {country}
              </Card.Subtitle>
            </>
          ) : (
            <>
              {username && (
                <Card.Subtitle className="mb-2">{`as3/${username}`}</Card.Subtitle>
              )}
              <Card.Subtitle className="location fw-light mb-3">
                {country}
              </Card.Subtitle>

              {occupations.length > 0 && (
                <Card.Subtitle className="mb-2 d-flex align-items-center">
                  {`Working as ${occupations[0]} at ${workplaces[0]}`}
                </Card.Subtitle>
              )}

              {occupations.length === 0 && schools.length > 0 && (
                <Card.Subtitle className="mb-2 d-flex align-items-center">
                  {`Learning ${departments[0]} at ${schools[0]}`}
                </Card.Subtitle>
              )}

              {qualifications.length > 0 && (
                <Card.Subtitle className="mb-2 d-flex align-items-center fw-bold">
                  {`Achieved ${qualifications[0].title} issued by ${qualifications[0].issuedBy}`}
                </Card.Subtitle>
              )}
            </>
          )}
        </Card.Body>

        {isProfile && (
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
        )}
      </div>
    </Card>
  )
}
