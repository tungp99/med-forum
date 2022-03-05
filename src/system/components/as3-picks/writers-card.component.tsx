import { Card, ListGroup, Stack } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiChevronUp } from '@mdi/js'

import { AS3Button, AS3Chip } from 'system/components'

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
          <Icon
            className="text-success mx-3"
            path={mdiChevronUp}
            size={1.5} />
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
