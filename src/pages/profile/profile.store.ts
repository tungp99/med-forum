import { StoreAction } from 'system/store'

type Store = {
  isProfessionPopupOpen: boolean
  isSecurityPopupOpen: boolean
}

const initialState: Store = {
  isProfessionPopupOpen: false,
  isSecurityPopupOpen: false,
}

export const profilePageStore = (
  state = initialState,
  action: StoreAction<
    'OPEN_PROFESSION_POPUP' | 'CLOSE_PROFESSION_POPUP',
    undefined
  >
): Store => {
  switch (action.type) {
    case 'OPEN_PROFESSION_POPUP':
      return { ...state, isProfessionPopupOpen: true }
    case 'CLOSE_PROFESSION_POPUP':
      return { ...state, isProfessionPopupOpen: false }
    default:
      return state
  }
}
