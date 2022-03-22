import { StoreAction } from 'system/store'
import { Profession } from 'system/types'

type Store = {
  title?: string
  isProfessionPopupOpen: boolean
  isSecurityPopupOpen: boolean
  isDeleteProfessionPopupOpen: boolean
  DeleteInfo: { data: Profession; title: string }
}

const initialState: Store = {
  DeleteInfo: {
    data: {
      organization: '',
      end: '',
      isWorking: false,
      position: '',
      start: '',
    },
    title: '',
  },
  title: '',
  isProfessionPopupOpen: false,
  isSecurityPopupOpen: false,
  isDeleteProfessionPopupOpen: false,
}

export const profilePageStore = (
  state = initialState,
  action: StoreAction<
    | 'OPEN_PROFESSION_POPUP'
    | 'CLOSE_PROFESSION_POPUP'
    | 'OPEN_DELETE_PROFESSION_POPUP'
    | 'CLOSE_DELETE_PROFESSION_POPUP',
    { data: Profession; title: string } | string
  >
): Store => {
  switch (action.type) {
    case 'OPEN_PROFESSION_POPUP':
      return {
        ...state,
        title: action.payload as string,
        isProfessionPopupOpen: true,
      }
    case 'CLOSE_PROFESSION_POPUP':
      return {
        ...state,
        title: action.payload as string,
        isProfessionPopupOpen: false,
      }
    case 'OPEN_DELETE_PROFESSION_POPUP':
      return {
        ...state,
        isDeleteProfessionPopupOpen: true,
        DeleteInfo: action.payload as { data: Profession; title: string },
      }
    case 'CLOSE_DELETE_PROFESSION_POPUP':
      return {
        ...state,
        isDeleteProfessionPopupOpen: false,
      }
    default:
      return state
  }
}
