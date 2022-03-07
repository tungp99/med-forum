import { Toast, ToastContainer } from 'react-bootstrap'
import { DateTime } from 'luxon'

import { useSelector } from 'system/store'

export function AS3Toastr() {
  const notifications = useSelector(store => store.notifications)

  return (
    <ToastContainer>
      {notifications.map(s => (
        <Toast key={s.id}>
          <Toast.Header>
            <strong className="me-auto">{s.title}</strong>
            <small className="text-muted">
              {DateTime.fromMillis(s.id).toLocaleString(DateTime.TIME_SIMPLE)}
            </small>
          </Toast.Header>
          <Toast.Body>{s.content}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}
