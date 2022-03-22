import { Card, ListGroup, Ratio } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiHospitalBuilding } from '@mdi/js'

import { Profile } from 'system/types'
import { AS3Avatar } from 'system/components'
import { EditButtonComponent } from './edit-button.component'

type OverviewCardComponentProps = {
  data: Profile
}

export function OverviewCardComponent({
  data: { firstName, lastName, country },
}: OverviewCardComponentProps) {
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
          <Card.Subtitle className="mb-2">Doctor</Card.Subtitle>
          <Card.Subtitle className="location">{country}</Card.Subtitle>
        </Card.Body>

        <ListGroup
          className="work"
          variant="flush">
          <EditButtonComponent />

          <ListGroup.Item>
            <Icon
              className="me-2"
              path={mdiHospitalBuilding}
              size={1} />
            Company A
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Card>
  )
}
