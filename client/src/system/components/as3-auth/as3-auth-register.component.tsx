import { Controller, useForm } from 'react-hook-form'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Input, AS3Link } from 'system/components'
import { RegisterInput } from 'system/generated/gql.types'

export function AS3AuthRegister() {
  const state = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const { register, register_error: error } = useAuth()
  const { handleSubmit, control } = useForm<RegisterInput>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmationPassword: '',
      profile: {
        isPublic: true,
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
    },
  })

  return (
    <Modal
      className="as3-auth-popup"
      centered
      size="lg"
      show={state.isRegisterPopupActive}
      onEscapeKeyDown={() => dispatch({ type: 'CLOSE_REGISTER_POPUP' })}
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.5}
          onClick={() => dispatch({ type: 'CLOSE_REGISTER_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body border-bottom-0">
        <Row className="justify-content-center py-5">
          <Col
            lg={6}
            md={8}
            sm={12}>
            <h4 className="title">Sign Up</h4>

            <Controller
              control={control}
              name="profile.firstName"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="First Name"
                  size="lg"
                  value={value}
                  onChange={onChange}
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'Profile.FirstName'
                      ? [error.message]
                      : undefined
                  }
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
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'Profile.LastName'
                      ? [error.message]
                      : undefined
                  }
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
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName === 'Email'
                      ? [error.message]
                      : undefined
                  }
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
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'Password'
                      ? [error.message]
                      : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="confirmationPassword"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="password"
                  label="Confirmation Password"
                  size="lg"
                  value={value}
                  onChange={onChange}
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'ConfirmationPassword'
                      ? [error.message]
                      : undefined
                  }
                />
              )}
            />

            <AS3Button
              variant="primary"
              size="lg"
              onClick={handleSubmit(data => register(data))}
            >
              Submit
            </AS3Button>

            <div className="extension">
              Already a member? &nbsp;
              <AS3Link
                className="extension-link"
                onClick={() => {
                  dispatch({ type: 'CLOSE_REGISTER_POPUP' })
                  dispatch({ type: 'OPEN_LOGIN_POPUP' })
                }}
              >
                Sign In
              </AS3Link>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
