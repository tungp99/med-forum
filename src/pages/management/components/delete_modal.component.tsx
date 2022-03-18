import { Modal } from 'react-bootstrap'
import { useDispatch, useStore } from 'system/store'
import { AS3Button, AS3Spacer } from 'system/components'
import { mdiClose } from '@mdi/js'

export function AS3Delete() {
  const state = useStore(store => store.managementPage)
  const dispatch = useDispatch()

  return (
    <Modal
      className=" pb-0"
      centered
      size="lg"
      show={state.isDeleteUserPopupActive}
      onEscapeKeyDown={() => dispatch({ type: 'CLOSE_DELETE_USER_POPUP' })}
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.2}
          onClick={() => dispatch({ type: 'CLOSE_DELETE_USER_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body text-center fs-5">
        Are you sure?
      </Modal.Body>
      <Modal.Footer className="justify-content-center pt-3">
        <AS3Button className="fs-6 btn-danger me-4">Delete</AS3Button>
        <AS3Button
          className="fs-6 btn-light ms-4"
          onClick={() => dispatch({ type: 'CLOSE_DELETE_USER_POPUP' })}
        >
          Cancel
        </AS3Button>
      </Modal.Footer>
    </Modal>
  )
}
