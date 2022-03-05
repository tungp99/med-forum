import { ComponentPropsWithoutRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export function AS3Layout(props: ComponentPropsWithoutRef<'div'>) {
  const classList = ['pt-4']
  props.className && classList.push(...props.className.split(' '))

  return (
    <Container
      as="main"
      className={classList.join(' ')}
      fluid="sm">
      <Row>
        <Col sm={12}>{props.children}</Col>
      </Row>
    </Container>
  )
}
