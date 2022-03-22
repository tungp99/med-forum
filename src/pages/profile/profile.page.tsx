import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'

import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { ProfessionCardComponent } from './components/profession.card.component'
import { OverviewCardComponent } from './components/overview.card.component'
import { NameFormComponent } from './components/name.form.component'
import { SecurityFormComponent } from './components/security.form.component'
import './profile.style.scss'
import {
  ADD_EDUCATION_MUTATION,
  ADD_EXPERIENCE_MUTATION,
  GET_ACCOUNT_QUERY,
  UPDATE_QUALIFICATION_MUTATION,
} from './gql'
import {
  AddEducation,
  AddExperience,
  GetAccount,
  updateQualification,
} from 'system/generated/gql.types'
import { ProfessionPopupComponent } from './components/profession-popup.component'
import { DeleteProfession } from './components/delete_profession_modal.component'
import { QualificationCardComponent } from './components/qualification.card.component'
import { QualificationPopup } from './components/qualification_popup.component'

export default function ProfilePage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { account: currentAccount, gqlContext } = useAuth()
  const { title } = useSelector(store => store.profilePage)

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

  const [updateQualification] = useMutation<updateQualification>(
    UPDATE_QUALIFICATION_MUTATION,
    {
      ...gqlContext,
      onCompleted() {
        dispatch({ type: 'CLOSE_QUALIFICATION_POPUP' })
        fetchAccount(fetchAccountVariables)
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [addExperience] = useMutation<AddExperience>(ADD_EXPERIENCE_MUTATION, {
    ...gqlContext,
    onCompleted({ addExperience: response }) {
      dispatch({ type: 'CLOSE_PROFESSION_POPUP' })
      response.affectedRecords && fetchAccount(fetchAccountVariables)
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const [addEducation] = useMutation<AddEducation>(ADD_EDUCATION_MUTATION, {
    ...gqlContext,
    onCompleted({ addEducation: response }) {
      dispatch({ type: 'CLOSE_PROFESSION_POPUP' })
      response.affectedRecords && fetchAccount(fetchAccountVariables)
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

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
            <QualificationCardComponent
              data={data.account.profile.qualifications}
            ></QualificationCardComponent>
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
            <NameFormComponent
              data={data.account}
              onSave={() => fetchAccount(fetchAccountVariables)}
            />

            <SecurityFormComponent />
          </Col>
        </Row>
      )}

      <ProfessionPopupComponent
        onSave={newProfession => {
          if (title === 'Experience') {
            data?.account &&
              addExperience({
                variables: {
                  input: {
                    ...newProfession,
                    accountId: fetchAccountVariables.variables.id,
                  },
                },
              })
          } else {
            data?.account &&
              addEducation({
                variables: {
                  input: {
                    ...newProfession,
                    accountId: fetchAccountVariables.variables.id,
                  },
                },
              })
          }
        }}
      />
      <QualificationPopup
        onSave={newQualification => {
          data?.account &&
            updateQualification({
              variables: { input: newQualification },
            })
        }}
      ></QualificationPopup>
      <DeleteProfession
        onDeleted={() => {
          fetchAccount(fetchAccountVariables)
        }}
      ></DeleteProfession>
    </Container>
  )
}
