import { useForm } from 'react-hook-form'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Input, AS3Link } from 'system/components'

export function AS3AuthLogin() {
  const state = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const { loading, login } = useAuth()
  const { handleSubmit, register } = useForm({
    defaultValues: { email: '', password: '' },
  })

  return (
    <Modal
      className="as3-auth-popup"
      centered
      size="lg"
      show={state.isLoginPopupActive}
    >
      <Modal.Header className="as3-auth-popup-header">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize="lg"
          onClick={() => dispatch({ type: 'CLOSE_LOGIN_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body">
        <Row className="justify-content-center py-5">
          <Col
            lg={6}
            md={8}
            sm={12}>
            <h4 className="title">Sign In</h4>

            <AS3Input
              {...register('email')}
              label="Email"
              size="lg" />

            <AS3Input
              {...register('password')}
              type="password"
              label="Password"
              size="lg"
            />

            <AS3Button
              variant="primary"
              size="lg"
              onClick={e => handleSubmit(data => login({ ...data }))(e)}
            >
              Submit
            </AS3Button>

            <div className="extension">
              New to AS3 Doctor Forum? &nbsp;
              <AS3Link
                className="extension-link"
                onClick={() => {
                  dispatch({ type: 'CLOSE_LOGIN_POPUP' })
                  dispatch({ type: 'OPEN_REGISTER_POPUP' })
                }}
              >
                Sign Up
              </AS3Link>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
