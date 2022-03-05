import { Card } from 'react-bootstrap'
import { AS3Spacer } from 'system/components'

import { EditButtonComponent } from './edit-button.component'

export function AboutCardComponent() {
  return (
    <Card className="about">
      <Card.Body>
        <Card.Title>
          About
          <AS3Spacer />
          <EditButtonComponent />
        </Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum
          dolor sit amet consectetur adipiscing elit. Sodales ut etiam sit amet
          nisl purus in mollis. Nibh sit amet commodo nulla facilisi nullam
          vehicula ipsum. Amet est placerat in egestas erat imperdiet sed
          euismod nisi.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
