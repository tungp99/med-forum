import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'

import { Toast, useDispatch } from 'system/store'
import { useAuth } from 'system/auth'
import { ProfessionCardComponent } from './components/profession.card.component'
import { OverviewCardComponent } from './components/overview.card.component'
import { NameFormComponent } from './components/name.form.component'
import { SecurityFormComponent } from './components/security.form.component'
import './profile.style.scss'
import {
  GET_ACCOUNT_QUERY,
  UPDATE_EDUCATION_MUTATION,
  UPDATE_EXPERIENCE_MUTATION,
} from './gql'
import {
  GetAccount,
  UpdateEducation,
  UpdateExperience,
} from 'system/generated/gql.types'

export default function ProfilePage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { account: currentAccount, gqlContext } = useAuth()

  const fetchAccountVariables = useMemo(
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
    fetchAccount(fetchAccountVariables)
  }, [fetchAccountVariables])

  const [updateExperience] = useMutation<UpdateExperience>(
    UPDATE_EXPERIENCE_MUTATION,
    {
      ...gqlContext,
      onCompleted({ updateExperience: response }) {
        dispatch({ type: 'CLOSE_PROFESSION_POPUP' })
        response.affectedRecords && fetchAccount(fetchAccountVariables)
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [updateEducation] = useMutation<UpdateEducation>(
    UPDATE_EDUCATION_MUTATION,
    {
      ...gqlContext,
      onCompleted({ updateEducation: response }) {
        dispatch({ type: 'CLOSE_PROFESSION_POPUP' })
        response.affectedRecords && fetchAccount(fetchAccountVariables)
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

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
              onAddNewItem={newProfession =>
                data.account &&
                updateExperience({
                  variables: {
                    input: {
                      accountId: fetchAccountVariables.variables.id,
                      professions: [
                        data.account.profile.experience.map(s => ({
                          ...s,
                          __typename: undefined,
                        })),
                        newProfession,
                      ],
                    },
                  },
                })
              }
            />

            <ProfessionCardComponent
              title="Education"
              data={data.account.profile.education}
              onAddNewItem={newProfession =>
                data.account &&
                updateEducation({
                  variables: {
                    input: {
                      accountId: fetchAccountVariables.variables.id,
                      professions: [
                        ...data.account.profile.education.map(s => ({
                          ...s,
                          __typename: undefined,
                        })),
                        newProfession,
                      ],
                    },
                  },
                })
              }
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
