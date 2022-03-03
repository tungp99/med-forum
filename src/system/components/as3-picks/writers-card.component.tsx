import { Card, ListGroup, Stack } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

import { AS3Button } from '../as3-button/as3-button.component'
import { AS3Chip } from '../as3-chip/as3-chip.component'

import './writers-card.style.scss'

export function WritersCardComponent() {
  return (
    <Card className="as3-picks-writers">
      <Card.Body>
        <Card.Title>Most Qualified Members</Card.Title>
      </Card.Body>

      <ListGroup
        className="as3-picks-writers-list"
        variant="flush">
        <ListGroup.Item
          className="as3-picks-writers-list-item"
          as="button">
          <span className="text">1</span>
          <FontAwesomeIcon
            icon={faAngleUp}
            className="text-success mx-3" />
          <span className="text">drjohnsmith</span>
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <AS3Button
          variant="primary"
          className="w-100 mb-3">
          View All
        </AS3Button>

        <Stack
          direction="horizontal"
          gap={2}>
          <AS3Chip size="sm">chip chip</AS3Chip>
        </Stack>
      </Card.Body>
    </Card>
  )
}
