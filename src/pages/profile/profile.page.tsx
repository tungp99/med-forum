import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'

import { Account } from 'system/types'
import { Toast } from 'system/store'
import { useAuth } from 'system/auth'
import { AboutCardComponent } from './components/about-card.component'
import { ExperienceCardComponent } from './components/experience-card.component'
import { OverviewCardComponent } from './components/overview-card.component'
import { NameFormComponent } from './components/name-form.component'
import { SecurityFormComponent } from './components/security-form.component'
import { GET_ACCOUNT_QUERY } from './gql'
import { GetAccount } from 'system/generated/gql.types'
import './profile.style.scss'

export default function ProfilePage() {
  const { id } = useParams()
  const { account, gqlContext } = useAuth()
  const [data, setData] = useState<Account>(account)

  const [fetchAccount, { loading }] = useLazyQuery<GetAccount>(
    GET_ACCOUNT_QUERY,
    {
      ...gqlContext,
      onCompleted({ account: response }) {
        response && setData({ ...response })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )
  useEffect(() => {
    if (id) fetchAccount({ variables: { id } })
  }, [id])

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
            title="Education"
            data={data.profile.educations}
          />

          <ExperienceCardComponent
            title="Experience"
            data={data.profile.professions}
          />
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
