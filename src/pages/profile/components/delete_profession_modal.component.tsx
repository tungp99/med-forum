import { useMutation } from '@apollo/client'
import { mdiClose } from '@mdi/js'
import { Modal } from 'react-bootstrap'
import { useAuth } from 'system/auth'
import { AS3Spacer, AS3Button } from 'system/components'
import { RemoveExperience } from 'system/generated/gql.types'
import { Toast, useDispatch, useSelector } from 'system/store'
import { REMOVE_EXPERIENCE_MUTATION } from '../gql'

type DeleteProfessionComponentProps = { onDeleted: () => void }

export function DeleteProfession(props: DeleteProfessionComponentProps) {
  const { gqlContext } = useAuth()
  const state = useSelector(store => store.profilePage)
  const dispatch = useDispatch()
  const [deleteProfession] = useMutation<RemoveExperience>(
    REMOVE_EXPERIENCE_MUTATION,
    {
      ...gqlContext,
      variables: { input: { ...state.DeleteInfo, __typename: undefined } },
      onCompleted() {
        props.onDeleted()
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )
  return (
    <Modal
      className=" pb-0"
      centered
      size="lg"
      show={state.isDeleteProfessionPopupOpen}
      onEscapeKeyDown={() =>
        dispatch({ type: 'CLOSE_DELETE_PROFESSION_POPUP' })
      }
    >
      <Modal.Header className="border-bottom-0 p-0">
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.2}
          onClick={() => dispatch({ type: 'CLOSE_DELETE_PROFESSION_POPUP' })}
        ></AS3Button>
      </Modal.Header>

      <Modal.Body className="as3-auth-popup-body text-center fs-5">
        Are you sure?
      </Modal.Body>
      <Modal.Footer className="justify-content-center pt-3">
        <AS3Button
          className="fs-6 btn-danger me-4"
          onClick={() => {
            deleteProfession()
            dispatch({ type: 'CLOSE_DELETE_PROFESSION_POPUP' })
          }}
        >
          Delete
        </AS3Button>
        <AS3Button
          className="fs-6 btn-light ms-4"
          onClick={() => {
            dispatch({ type: 'CLOSE_DELETE_PROFESSION_POPUP' })
          }}
        >
          Cancel
        </AS3Button>
      </Modal.Footer>
    </Modal>
  )
}
