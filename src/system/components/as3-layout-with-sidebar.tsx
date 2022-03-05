import { ComponentPropsWithoutRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AS3Picks } from '.'

export function AS3LayoutWithSidebar(props: ComponentPropsWithoutRef<'div'>) {
  const classList = ['pt-4']
  props.className && classList.push(...props.className.split(' '))

  return (
    <Container
      as="main"
      className={classList.join(' ')}
      fluid="sm">
      <Row>
        <Col lg={8}>{props.children}</Col>
        <Col lg={4}>
          <AS3Picks />
        </Col>
      </Row>
    </Container>
  )
}
