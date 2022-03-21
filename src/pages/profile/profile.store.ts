import { StoreAction } from 'system/store'

type Store = {
  title?: string
  isProfessionPopupOpen: boolean
  isSecurityPopupOpen: boolean
}

const initialState: Store = {
  title: '',
  isProfessionPopupOpen: false,
  isSecurityPopupOpen: false,
}

export const profilePageStore = (
  state = initialState,
  action: StoreAction<
    'OPEN_PROFESSION_POPUP' | 'CLOSE_PROFESSION_POPUP',
    string
  >
): Store => {
  switch (action.type) {
    case 'OPEN_PROFESSION_POPUP':
      return { ...state, title: action.payload, isProfessionPopupOpen: true }
    case 'CLOSE_PROFESSION_POPUP':
      return { ...state, title: action.payload, isProfessionPopupOpen: false }
    default:
      return state
  }
}
