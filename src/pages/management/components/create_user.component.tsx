import { Controller, useForm } from 'react-hook-form'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { useDispatch, useStore } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Input } from 'system/components'
import { RegisterInput } from 'system/generated/gql.types'

export function AS3CreateUser() {
  const state = useStore(store => store.auth)
  const dispatch = useDispatch()
  const { register } = useAuth()
  const { handleSubmit, control } = useForm<RegisterInput>({
    defaultValues: {
      email: '',
      password: '',
      confirmationPassword: '',
      profile: {
        firstName: '',
        lastName: '',
        isPublic: true,
        phoneNumber: '',
        professions: [],
        educations: [],
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
          iconSize={1.5}
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
              onClick={handleSubmit(data => register(data))}
            >
              Submit
            </AS3Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
