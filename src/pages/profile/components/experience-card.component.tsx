import { Card, ListGroup, Stack } from 'react-bootstrap'

import { AS3Avatar, AS3Spacer } from 'system/components'
import { AddButtonComponent } from './add-button.component'
import { EditButtonComponent } from './edit-button.component'

type ExperienceCardComponentProps = {
  title: string
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

        <Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <AS3Avatar
                width={48}
                height={48} />
              <p className="ps-3 mb-0">
                <span className="fw-bold">Fresher</span> <br />
                <span>Company</span> <br />
                <span className="text-black-50">Jun 2010 - Present</span> <br />
                <span className="text-black-50">Hanoi, Vietnam</span> <br />
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
