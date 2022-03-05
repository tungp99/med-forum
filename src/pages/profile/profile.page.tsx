import { Container, Row, Col } from 'react-bootstrap'

import { AboutCardComponent } from './components/about-card.component'
import { ExperienceCardComponent } from './components/experience-card.component'
import { OverviewCardComponent } from './components/overview-card.component'
import { NameFormComponent } from './components/name-form.component'

import './profile.style.scss'
import { SecurityFormComponent } from './components/security-form.component'

export default function ProfilePage() {
  return (
    <Container
      as="main"
      className="pt-4 profile"
      fluid="sm">
      <Row>
        <Col
          sm={12}
          md={8}>
          <OverviewCardComponent />

          <AboutCardComponent />

          <ExperienceCardComponent title="Experience" />

          <ExperienceCardComponent title="Education" />
        </Col>

        <Col
          sm={12}
          md={4}>
          <NameFormComponent />

          <SecurityFormComponent />
        </Col>
      </Row>
    </Container>
  )
}
