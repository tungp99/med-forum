import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'

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

  const [fetchAccount, { data: otherAccountData }] = useLazyQuery<GetAccount>(
    GET_ACCOUNT_QUERY,
    {
      ...gqlContext,
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const data = useMemo(
    () =>
      id && otherAccountData?.account ? otherAccountData.account : account,
    [id, otherAccountData]
  )

  useEffect(() => {
    if (id) fetchAccount({ variables: { id } })
  }, [id])

  return (
    <Container
      as="main"
      className="pt-4 profile"
      fluid="sm">
      {data && (
        <Row>
          <Col
            sm={12}
            md={8}>
            <OverviewCardComponent data={data.profile} />

            <AboutCardComponent data={data} />

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
            <NameFormComponent data={data} />

            <SecurityFormComponent />
          </Col>
        </Row>
      )}
    </Container>
  )
}
