import { ApolloError } from '@apollo/client'
import { StoreAction } from 'system/store'
import { Profession, Qualification } from 'system/types'

type Store = {
  title?: string
  isProfessionPopupOpen: boolean
  isSecurityPopupOpen: boolean
  isDeleteProfessionPopupOpen: boolean
  DeleteInfo: {
    data: Profession | Qualification
    title: string
    accountId: string
  }
  isQualificationPopupOpen: boolean
  error?: ApolloError
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
    accountId: '',
  },
  title: '',
  isProfessionPopupOpen: false,
  isSecurityPopupOpen: false,
  isDeleteProfessionPopupOpen: false,
  isQualificationPopupOpen: false,
  error: undefined,
}

export const profilePageStore = (
  state = initialState,
  action: StoreAction<
    | 'OPEN_PROFESSION_POPUP'
    | 'CLOSE_PROFESSION_POPUP'
    | 'OPEN_DELETE_PROFESSION_POPUP'
    | 'CLOSE_DELETE_PROFESSION_POPUP'
    | 'OPEN_QUALIFICATION_POPUP'
    | 'CLOSE_QUALIFICATION_POPUP'
    | 'FETCH_ERROR',
    { data: Profession | Qualification; title: string } | string | ApolloError
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
        DeleteInfo: action.payload as {
          data: Profession | Qualification
          title: string
          accountId: string
        },
      }
    case 'CLOSE_DELETE_PROFESSION_POPUP':
      return {
        ...state,
        isDeleteProfessionPopupOpen: false,
      }
    case 'OPEN_QUALIFICATION_POPUP':
      return {
        ...state,
        isQualificationPopupOpen: true,
      }
    case 'CLOSE_QUALIFICATION_POPUP':
      return {
        ...state,
        isQualificationPopupOpen: false,
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload as ApolloError,
      }

    default:
      return state
  }
}
