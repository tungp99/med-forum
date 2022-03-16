import { Controller, useForm } from 'react-hook-form'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { useDispatch, useStore } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Input, AS3Link } from 'system/components'

export function AS3AuthLogin() {
  const state = useStore(store => store.auth)
  const dispatch = useDispatch()
  const { login } = useAuth()
  const { handleSubmit, control } = useForm({
    defaultValues: { email: '', password: '' },
  })

  return (
    <Modal
      className="as3-auth-popup"
      centered
      size="lg"
      show={state.isLoginPopupActive}
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.5}
          onClick={() => dispatch({ type: 'CLOSE_LOGIN_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body border-bottom-0">
        <Row className="justify-content-center py-5">
          <Col
            lg={6}
            md={8}
            sm={12}>
            <h4 className="title">Sign In</h4>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <AS3Input
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
              onClick={handleSubmit(data => login({ ...data }))}
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
