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
import { ProfessionPopupComponent } from './components/profession-popup.component'
import { DeleteProfessionPopupComponent } from './components/delete-profession.popup.component'
import { QualificationCardComponent } from './components/qualification.card.component'
import { QualificationPopup } from './components/qualification.popup.component'
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

type ProfilePageProps = { editable: boolean }

export default function ProfilePage({ editable }: ProfilePageProps) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { account: currentAccount } = useAuth()
  const { title } = useSelector(store => store.profilePage)

  const fetchAccountVariables = useMemo(
    () => ({ variables: { id: id ?? currentAccount.id } }),
    [id]
  )
  const [fetchAccount, { data, loading }] = useLazyQuery<GetAccount>(
    GET_ACCOUNT_QUERY,
    {
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
    onCompleted({ addExperience: response }) {
      dispatch({ type: 'CLOSE_PROFESSION_POPUP' })
      response.affectedRecords && fetchAccount(fetchAccountVariables)
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const [addEducation] = useMutation<AddEducation>(ADD_EDUCATION_MUTATION, {
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

      {data?.account ? (
        <Row>
          {editable ? <></> : <Col sm={1}></Col>}
          <Col
            sm={12}
            md={editable ? 8 : 10}>
            <OverviewCardComponent
              editable={editable}
              data={{
                profile: data.account.profile,
                username: data.account.username,
                email: data.account.email,
                id: data.account.id,
              }}
              isProfile
            />

            <QualificationCardComponent
              editable={editable}
              data={data.account.profile.qualifications}
              accountId={fetchAccountVariables.variables.id}
            />

            <ProfessionCardComponent
              editable={editable}
              title="Experience"
              data={data.account.profile.experience}
              accountId={fetchAccountVariables.variables.id}
            />

            <ProfessionCardComponent
              editable={editable}
              title="Education"
              data={data.account.profile.education}
              accountId={fetchAccountVariables.variables.id}
            />
          </Col>

          {editable ? (
            <Col
              sm={12}
              md={4}>
              <NameFormComponent
                data={data.account}
                onSave={() => fetchAccount(fetchAccountVariables)}
              />
              <SecurityFormComponent />
            </Col>
          ) : (
            <></>
          )}
        </Row>
      ) : (
        !loading && <span>This profile is private or not existed</span>
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
              variables: {
                input: {
                  ...newQualification,
                  accountId: fetchAccountVariables.variables.id,
                },
              },
            })
        }}
      />

      <DeleteProfessionPopupComponent
        onDeleted={() => {
          fetchAccount(fetchAccountVariables)
        }}
      />
    </Container>
  )
}
