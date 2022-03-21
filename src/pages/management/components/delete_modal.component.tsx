import { Modal } from 'react-bootstrap'
import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3Spacer } from 'system/components'
import { mdiClose } from '@mdi/js'
import { useMutation } from '@apollo/client'
import { DeleteAccount } from 'system/generated/gql.types'
import { DELETE_ACCOUNT_MUTATION } from '../gql'
import { useAuth } from 'system/auth'

type DeleteModalComponentProps = { id?: string; onDeleted: () => void }

export function AS3Delete(props: DeleteModalComponentProps) {
  const { gqlContext } = useAuth()
  const state = useSelector(store => store.managementPage)
  const dispatch = useDispatch()
  const [deleteAccount_fetch] = useMutation<DeleteAccount>(
    DELETE_ACCOUNT_MUTATION,
    {
      ...gqlContext,
      onCompleted() {
        props.onDeleted()
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
      variables: { id: props.id },
    }
  )

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
        <AS3Button
          className="fs-6 btn-danger me-4"
          onClick={() => {
            deleteAccount_fetch()
            dispatch({ type: 'CLOSE_DELETE_USER_POPUP' })
          }}
        >
          Delete
        </AS3Button>
        <AS3Button
          className="fs-6 btn-light ms-4"
          onClick={() => {
            dispatch({ type: 'CLOSE_DELETE_USER_POPUP' })
          }}
        >
          Cancel
        </AS3Button>
      </Modal.Footer>
    </Modal>
  )
}
