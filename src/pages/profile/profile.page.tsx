import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from 'system/auth'

import { AboutCardComponent } from './components/about-card.component'
import { ExperienceCardComponent } from './components/experience-card.component'
import { OverviewCardComponent } from './components/overview-card.component'
import { NameFormComponent } from './components/name-form.component'
import { SecurityFormComponent } from './components/security-form.component'
import './profile.style.scss'

export default function ProfilePage() {
  const {
    account: {
      profile: { professions, educations },
    },
  } = useAuth()

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

          <ExperienceCardComponent
            title="Experience"
            items={professions} />

          <ExperienceCardComponent
            title="Education"
            items={educations} />
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
