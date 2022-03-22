import { Card, ListGroup, Ratio } from 'react-bootstrap'
import Icon from '@mdi/react'
import {
  mdiHospitalBuilding,
  mdiPencilOutline,
  mdiSchoolOutline,
} from '@mdi/js'

import { Profile } from 'system/types'
import { AS3Avatar, AS3Button } from 'system/components'
import { useMemo, useRef } from 'react'
import { Toast } from 'system/store'

type OverviewCardComponentProps = {
  data: Profile
}

export function OverviewCardComponent({
  data: { firstName, lastName, country, experience, education },
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

  return (
    <Card className="overview">
      <Ratio aspectRatio={20}>
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/600x150.jpg" />
      </Ratio>

      <div className="introduction">
        <Card.Body>
          <AS3Avatar
            width={128}
            height={128} />

          <Card.Title className="mt-2">
            {firstName} {lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2">
            {occupations.join(' | ')}
          </Card.Subtitle>
          {schools.length !== 0 && (
            <Card.Subtitle className="mb-2">Student</Card.Subtitle>
          )}
          <Card.Subtitle className="location">{country}</Card.Subtitle>
        </Card.Body>

        <ListGroup
          className="work"
          variant="flush">
          <AS3Button
            className="btn-edit"
            icon={mdiPencilOutline}
            iconSize={1}
            text
            onClick={() => {
              avatarInputRef.current?.click()
            }}
          ></AS3Button>

          <ListGroup.Item>
            <Icon
              className="me-2"
              path={mdiHospitalBuilding}
              size={1} />
            {workplaces.join(' | ')}
          </ListGroup.Item>
          {schools.length !== 0 && (
            <ListGroup.Item>
              <Icon
                className="me-2"
                path={mdiSchoolOutline}
                size={1} />
              {schools.join(' | ')}
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>

      <input
        ref={avatarInputRef}
        type="file"
        className="d-none"
        accept="image/*"
        onChange={e => {
          if (e.target.type.startsWith('image/')) console.log(e.target.files)
          else Toast.error({ title: '', content: 'Inappropriate file type' })
        }}
      />
    </Card>
  )
}
