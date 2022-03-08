import { StoreAction } from 'system/store'

type Action = 'TOAST_SUCCESS' | 'TOAST_ERROR' | 'TOAST_INFO' | 'TOAST_WARNING'

type Payload = {
  title: string
  content: string
}

type Store = {
  id: number
  variant?: 'success' | 'danger' | 'info' | 'warning'
  title?: string
  content?: string
}

const initialState: Store[] = []

export const notificationsStore = (
  state = initialState,
  action: StoreAction<Action, Payload>
): Store[] => {
  if (!action.payload) return state

  const notification: Store = {
    ...action.payload,
    id: new Date().getTime(),
  }

  setTimeout(() => (state = state.filter(s => s.id !== notification.id)), 3000)

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
    case 'TOAST_INFO':
      return [{ ...notification, variant: 'info' }, ...state]
    case 'TOAST_WARNING':
      return [{ ...notification, variant: 'warning' }, ...state]
    default:
      return state
  }
}
