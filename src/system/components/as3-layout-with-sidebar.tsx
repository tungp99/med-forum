import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

type AS3LayoutWithSidebarProps = ComponentPropsWithoutRef<'div'> & {
  sidebar: ReactNode
}

export function AS3LayoutWithSidebar({
  children,
  className,
  sidebar,
}: AS3LayoutWithSidebarProps) {
  const classList = ['pt-4']
  className && classList.push(className)

  return (
    <Container
      as="main"
      className={classList.join(' ')}
      fluid="sm">
      <Row>
        <Col lg={9}>{children}</Col>
        <Col lg={3}>{sidebar}</Col>
      </Row>
    </Container>
  )
}
