import { Card, ListGroup, Ratio } from 'react-bootstrap'
import Icon from '@mdi/react'
import {
  mdiHospitalBuilding,
  mdiPencilOutline,
  mdiSchoolOutline,
} from '@mdi/js'

import { Profile } from 'system/types'
import { AS3Avatar, AS3Button } from 'system/components'
import { useMemo } from 'react'

type OverviewCardComponentProps = {
  data: Profile
}

export function OverviewCardComponent({
  data: { firstName, lastName, country, experience, education },
}: OverviewCardComponentProps) {
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
          <div className="avatar-wrapper">
            <AS3Avatar
              width={128}
              height={128}>
              <AS3Button
                icon={mdiPencilOutline}
                iconSize={1}
                text />
            </AS3Avatar>
          </div>

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
          {workplaces.map((h, key) => (
            <ListGroup.Item key={key}>
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
