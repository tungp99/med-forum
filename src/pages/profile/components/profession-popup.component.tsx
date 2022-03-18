import { Modal } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'
import { AS3Button, AS3Spacer } from 'system/components'
import { useDispatch, useSelector } from 'system/store'

export function ProfessionPopupComponent() {
  const { isProfessionPopupOpen } = useSelector(store => store.profilePage)
  const dispatch = useDispatch()

  return (
    <Modal
      className="as3-auth-popup"
      centered
      size="lg"
      show={isProfessionPopupOpen}
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.5}
          onClick={() => dispatch({ type: 'CLOSE_PROFESSION_POPUP' })}
        />
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body border-bottom-0">
        <AS3Button variant="primary">Submit</AS3Button>
      </Modal.Body>
    </Modal>
  )
}
