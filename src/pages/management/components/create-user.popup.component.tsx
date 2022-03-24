import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Input } from 'system/components'
import { CREATE_ACCOUNT_MUTATION } from '../gql'
import { CreateAccount, CreateAccountInput } from 'system/generated/gql.types'

type CreateUserPopupComponentProps = { onCreated: () => void }

export function CreateUserPopupComponent(props: CreateUserPopupComponentProps) {
  const state = useSelector(store => store.managementPage)
  const dispatch = useDispatch()
  const { gqlContext } = useAuth()
  const [CreateAccount] = useMutation<CreateAccount>(CREATE_ACCOUNT_MUTATION, {
    ...gqlContext,
    onCompleted() {
      props.onCreated()
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })
  const { handleSubmit, control } = useForm<CreateAccountInput>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      profile: {
        firstName: '',
        lastName: '',
        isPublic: true,
        phoneNumber: '',
      },
    },
  })

  return (
    <Modal
      className="as3-auth-popup"
      centered
      size="lg"
      show={state.isCreateUserPopupActive}
      onEscapeKeyDown={() => dispatch({ type: 'CLOSE_CREATE_USER_POPUP' })}
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.2}
          onClick={() => dispatch({ type: 'CLOSE_CREATE_USER_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body border-bottom-0">
        <Row className="justify-content-center py-5">
          <Col
            lg={6}
            md={8}
            sm={12}>
            <h4 className="title">Create User</h4>

            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="Username"
                  size="lg"
                  value={value ?? ''}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="profile.firstName"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="First Name"
                  size="lg"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="profile.lastName"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="Last Name"
                  size="lg"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="email"
                  label="Email"
                  size="lg"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="password"
                  label="Password"
                  size="lg"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <AS3Button
              variant="primary"
              size="lg"
              onClick={handleSubmit(data => {
                dispatch({ type: 'CLOSE_CREATE_USER_POPUP' })

                CreateAccount({
                  variables: {
                    input: data,
                  },
                })
              })}
            >
              Submit
            </AS3Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
