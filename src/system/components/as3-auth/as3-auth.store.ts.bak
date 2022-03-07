import { PayloadAction } from 'system/store'

type ActionType =
  | 'OPEN_LOGIN_POPUP'
  | 'CLOSE_LOGIN_POPUP'
  | 'TOGGLE_LOGIN_POPUP'
  | 'OPEN_REGISTER_POPUP'
  | 'CLOSE_REGISTER_POPUP'
  | 'TOGGLE_REGISTER_POPUP'

export type AuthStore = {
  isLoginPopupActive: boolean
  isRegisterPopupActive: boolean
}

const initialState: AuthStore = {
  isLoginPopupActive: false,
  isRegisterPopupActive: false,
}

export const authReducer = (
  state = initialState,
  action: PayloadAction<ActionType, string | boolean>
): AuthStore => {
  switch (action.type) {
    case 'OPEN_LOGIN_POPUP':
      return {
        ...state,
        isLoginPopupActive: true,
      }
    case 'CLOSE_LOGIN_POPUP':
      return {
        ...state,
        isLoginPopupActive: false,
      }
    case 'TOGGLE_LOGIN_POPUP':
      return {
        ...state,
        isLoginPopupActive: !state.isLoginPopupActive,
      }
    case 'OPEN_REGISTER_POPUP':
      return {
        ...state,
        isRegisterPopupActive: true,
      }
    case 'CLOSE_REGISTER_POPUP':
      return {
        ...state,
        isRegisterPopupActive: false,
      }
    case 'TOGGLE_REGISTER_POPUP':
      return {
        ...state,
        isRegisterPopupActive: !state.isRegisterPopupActive,
      }
    default:
      return state
  }
}
