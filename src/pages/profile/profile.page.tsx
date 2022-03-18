import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'

import { Toast } from 'system/store'
import { useAuth } from 'system/auth'
import { ProfessionCardComponent } from './components/profession-card.component'
import { OverviewCardComponent } from './components/overview-card.component'
import { NameFormComponent } from './components/name-form.component'
import { SecurityFormComponent } from './components/security-form.component'
import { GET_ACCOUNT_QUERY } from './gql'
import { GetAccount } from 'system/generated/gql.types'
import './profile.style.scss'

export default function ProfilePage() {
  const { id } = useParams()
  const { account: currentAccount, gqlContext } = useAuth()

  const gqlVariables = useMemo(
    () => ({ variables: { id: id ?? currentAccount.id } }),
    [id]
  )

  const [fetchAccount, { data, loading }] = useLazyQuery<GetAccount>(
    GET_ACCOUNT_QUERY,
    {
      ...gqlContext,
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    fetchAccount(gqlVariables)
  }, [gqlVariables])

  return (
    <Container
      as="main"
      className="pt-4 profile"
      fluid="sm">
      {loading && 'pls wait ;)'}

      {data?.account && (
        <Row>
          <Col
            sm={12}
            md={8}>
            <OverviewCardComponent data={data.account.profile} />

            <ProfessionCardComponent
              title="Experience"
              data={data.account.profile.experience}
            />

            <ProfessionCardComponent
              title="Education"
              data={data.account.profile.education}
            />
          </Col>

          <Col
            sm={12}
            md={4}>
            <NameFormComponent data={data.account} />

            <SecurityFormComponent />
          </Col>
        </Row>
      )}
    </Container>
  )
}
