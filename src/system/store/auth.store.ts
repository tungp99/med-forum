import { StoreAction } from 'system/store'

type Action =
  | 'OPEN_LOGIN_POPUP'
  | 'CLOSE_LOGIN_POPUP'
  | 'OPEN_REGISTER_POPUP'
  | 'CLOSE_REGISTER_POPUP'
  | 'OPEN_CREATE_USER_POPUP'
  | 'CLOSE_CREATE_USER_POPUP'

type Store = {
  isLoginPopupActive: boolean
  isRegisterPopupActive: boolean
  isCreateUserPopupActive: boolean
}

const initialState: Store = {
  isLoginPopupActive: false,
  isRegisterPopupActive: false,
  isCreateUserPopupActive: false,
}

export const authStore = (
  state = initialState,
  action: StoreAction<Action, undefined>
): Store => {
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
    case 'OPEN_CREATE_USER_POPUP':
      return {
        ...state,
        isCreateUserPopupActive: true,
      }
    case 'CLOSE_CREATE_USER_POPUP':
      return {
        ...state,
        isCreateUserPopupActive: false,
      }
    default:
      return state
  }
}
