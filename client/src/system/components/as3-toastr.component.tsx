import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'system/store'

export function AS3Toastr() {
  const notifications = useSelector(store => store.notifications)
  const dispatch = useDispatch()

  return (
    <ToastContainer position="top-end">
      {notifications.map(s => (
        <Toast
          key={s.id.toMillis()}
          delay={1500}
          onClose={() => dispatch({ type: 'UNTOAST', payload: { id: s.id } })}
        >
          <Toast.Header>
            <strong className="me-auto">{s.title}</strong>
            <small className="text-muted">{s.id.toRelative()}</small>
          </Toast.Header>
          <Toast.Body>{s.content}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}
