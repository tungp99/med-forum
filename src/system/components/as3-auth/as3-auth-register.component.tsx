import { useForm } from 'react-hook-form'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { useDispatch, useStore } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Input, AS3Link } from 'system/components'

export function AS3AuthRegister() {
  const state = useStore(store => store.auth)
  const dispatch = useDispatch()
  const { register: sendRegister } = useAuth()
  const { handleSubmit, register } = useForm({
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
        birthDate: new Date(),
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
      show={state.isRegisterPopupActive}
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize="lg"
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

            <AS3Input
              {...register('profile.firstName')}
              label="First Name"
              size="lg"
            />

            <AS3Input
              {...register('profile.lastName')}
              label="Last Name"
              size="lg"
            />

            <AS3Input
              {...register('email')}
              type="email"
              label="Email"
              size="lg"
            />

            <AS3Input
              {...register('password')}
              type="password"
              label="Password"
              size="lg"
            />

            <AS3Input
              {...register('confirmationPassword')}
              type="password"
              label="Confirmation Password"
              size="lg"
            />

            <AS3Button
              variant="primary"
              size="lg"
              onClick={handleSubmit(data => sendRegister({ ...data }))}
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
