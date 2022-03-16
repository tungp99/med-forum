import { DateTime } from 'luxon'
import { StoreAction } from 'system/store'

type Store = {
  id: DateTime
  variant?: 'success' | 'danger' | 'info' | 'warning'
  title?: string
  content?: string
}

const initialState: Store[] = []

export const notificationsStore = (
  state = initialState,
  action: StoreAction<
    | 'TOAST_SUCCESS'
    | 'TOAST_ERROR'
    | 'TOAST_INFO'
    | 'TOAST_WARNING'
    | 'UNTOAST',
    {
      id: DateTime
      title?: string
      content?: string
    }
  >
): Store[] => {
  if (!action.payload) return state

  const notification = action.payload

  switch (action.type) {
    case 'TOAST_SUCCESS':
      notification.title = notification.title ? notification.title : 'Success'
      notification.content = notification.content
        ? notification.content
        : 'Action completed'
      return [{ ...notification, variant: 'success' }, ...state]

    case 'TOAST_ERROR':
      notification.title = notification.title ? notification.title : 'Error'
      notification.content = notification.content
        ? notification.content
        : 'Unexpected error'
      return [{ ...notification, variant: 'danger' }, ...state]

    // case 'TOAST_INFO':
    //   return [{ ...notification, variant: 'info' }, ...state]
    // case 'TOAST_WARNING':
    //   return [{ ...notification, variant: 'warning' }, ...state]
    case 'UNTOAST':
      return state.filter(s => !s.id.equals(notification.id))

    default:
      return state
  }
}
