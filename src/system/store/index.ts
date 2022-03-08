import { combineReducers, createStore } from 'redux'
import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector as reduxSelector,
} from 'react-redux'

import { authStore } from './auth.store'
import { notificationsStore } from './notification.store'
import { homePageStore } from 'pages'

export const store = createStore(
  combineReducers({
    auth: authStore,
    notifications: notificationsStore,
    homePage: homePageStore,
  })
)

export const useDispatch = () => reduxDispatch<typeof store.dispatch>()

export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = reduxSelector

export type StoreAction<ActionType, PayloadType> = {
  type: ActionType
  payload?: PayloadType
}
