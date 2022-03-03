import { combineReducers, createStore } from 'redux'
import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector as reduxSelector,
} from 'react-redux'

import { authReducer } from 'system/components/as3-auth'

export const store = createStore(
  combineReducers({
    auth: authReducer,
  })
)

export const useDispatch = () => reduxDispatch<typeof store.dispatch>()

export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = reduxSelector

export type PayloadAction<ActionType, PayloadType> = {
  type: ActionType
  payload?: PayloadType
}
