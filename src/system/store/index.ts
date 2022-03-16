import { combineReducers, createStore } from 'redux'
import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector as reduxSelector,
} from 'react-redux'
import { DateTime } from 'luxon'

import { authStore } from './auth.store'
import { notificationsStore } from './notification.store'
import { homePageStore, managementPageStore } from 'pages'
import { postStore } from 'system/components'

export const store = createStore(
  combineReducers({
    auth: authStore,
    notifications: notificationsStore,
    homePage: homePageStore,
    managementPage: managementPageStore,
    post: postStore,
  })
)

export const useDispatch = () => reduxDispatch<typeof store.dispatch>()

export const useStore: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
  reduxSelector

export type StoreAction<ActionType, PayloadType> = {
  type: ActionType
  payload?: PayloadType
}

export const Toast = {
  success(payload: { title: string; content: string }) {
    const id = DateTime.now()

    store.dispatch({
      type: 'TOAST_SUCCESS',
      payload: { ...payload, id },
    })

    setTimeout(() => store.dispatch({ type: 'UNTOAST', payload: { id } }), 6000)
  },
  error(payload: { title: string; content: string }) {
    const id = DateTime.now()

    store.dispatch({
      type: 'TOAST_ERROR',
      payload: { ...payload, id },
    })

    setTimeout(() => store.dispatch({ type: 'UNTOAST', payload: { id } }), 6000)
  },
}
