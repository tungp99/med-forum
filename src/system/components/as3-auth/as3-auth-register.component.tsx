import { Col, Modal, Row } from 'react-bootstrap'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3Spacer, AS3Input, AS3Link } from 'system/components'

export function AS3AuthRegister() {
  const state = useSelector(s => s.auth)
  const dispatch = useDispatch()

  return (
    <Modal
      className="as3-auth-popup"
      centered
      size="lg"
      show={state.isRegisterPopupActive}
    >
      <Modal.Header className="as3-auth-popup-header">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={faXmark}
          iconSize="lg"
          onClick={() => dispatch({ type: 'CLOSE_REGISTER_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body">
        <Row className="justify-content-center py-5">
          <Col
            lg={6}
            md={8}
            sm={12}>
            <h4 className="title">Sign Up</h4>

            <AS3Input
              label="First Name"
              size="lg" />

            <AS3Input
              label="Last Name"
              size="lg" />

            <AS3Input
              label="Email"
              size="lg" />

            <AS3Input
              label="Password"
              size="lg" />

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
