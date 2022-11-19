import { ComponentPropsWithoutRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

type AS3LayoutProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode
}

export function AS3Layout(props: AS3LayoutProps) {
  const classList = ['pt-4']
  props.className && classList.push(props.className)

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
