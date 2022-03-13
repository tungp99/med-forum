import { Card, ListGroup, Ratio } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiHospitalBuilding } from '@mdi/js'

import { useAuth } from 'system/auth'
import { AS3Avatar } from 'system/components'
import { EditButtonComponent } from './edit-button.component'

export function OverviewCardComponent() {
  const { account } = useAuth()

  if (!account) return null

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
            {account.profile.firstName} {account.profile.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2">Doctor</Card.Subtitle>
          <Card.Subtitle className="location">Hanoi, Vietnam</Card.Subtitle>
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
