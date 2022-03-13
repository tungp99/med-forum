import { Card, ListGroup, Stack } from 'react-bootstrap'

import { Profession } from 'system/types'
import { AS3Avatar, AS3Spacer } from 'system/components'
import { AddButtonComponent } from './add-button.component'
import { EditButtonComponent } from './edit-button.component'

type ExperienceCardComponentProps = {
  title: string

  items: Profession[]
}

export function ExperienceCardComponent(props: ExperienceCardComponentProps) {
  return (
    <Card className="experience">
      <Card.Body>
        <Card.Title>
          {props.title}

          <AS3Spacer />

          <Stack
            direction="horizontal"
            gap={2}>
            <AddButtonComponent />
            <EditButtonComponent />
          </Stack>
        </Card.Title>

        <ListGroup variant="flush">
          {props.items.map((item, index) => (
            <ListGroup.Item key={index}>
              <AS3Avatar
                width={48}
                height={48} />
              <p className="ps-3 mb-0">
                <span className="fw-bold">{item.position}</span> <br />
                <span>{item.organization}</span> <br />
                <span className="text-black-50">Jun 2010 - Present</span> <br />
                <span className="text-black-50">Hanoi, Vietnam</span> <br />
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
