import { StoreAction } from 'system/store'

type Store = {
  fetchPublished: boolean
  isPublic: boolean | undefined
  filter_title: string
  filter_text: string
  isCreateUserPopupActive: boolean
  isDeleteUserPopupActive: boolean
  deleteId?: string
}

const initialState: Store = {
  fetchPublished: false,
  isPublic: undefined,
  filter_title: 'All',
  filter_text: '',
  isCreateUserPopupActive: false,
  isDeleteUserPopupActive: false,
}

export const managementPageStore = (
  state = initialState,
  action: StoreAction<
    | 'SET_POSTS_FILTER_PUBLISHED'
    | 'SET_POSTS_FILTER_DRAFTS'
    | 'SET_ACCOUNT_FILTER_PUBLIC'
    | 'SET_ACCOUNT_FILTER_PRIVATE'
    | 'SET_ACCOUNT_FILTER_ALL'
    | 'SET_ACCOUNT_UPDATE_FILTER'
    | 'OPEN_CREATE_USER_POPUP'
    | 'CLOSE_CREATE_USER_POPUP'
    | 'OPEN_DELETE_USER_POPUP'
    | 'CLOSE_DELETE_USER_POPUP'
    | 'DELETE_ID',
    string
  >
): Store => {
  switch (action.type) {
    case 'SET_POSTS_FILTER_PUBLISHED':
      return {
        ...state,
        fetchPublished: true,
      }
    case 'SET_POSTS_FILTER_DRAFTS':
      return {
        ...state,
        fetchPublished: false,
      }
    case 'SET_ACCOUNT_FILTER_PUBLIC':
      return {
        ...state,
        isPublic: true,
        filter_title: 'Public',
      }
    case 'SET_ACCOUNT_FILTER_PRIVATE':
      return {
        ...state,
        isPublic: false,
        filter_title: 'Private',
      }
    case 'SET_ACCOUNT_FILTER_ALL':
      return {
        ...state,
        filter_title: 'All',
      }
    case 'SET_ACCOUNT_UPDATE_FILTER':
      const filter_text = action.payload
      return {
        ...state,
        filter_text: filter_text ?? '',
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
    case 'OPEN_DELETE_USER_POPUP':
      return {
        ...state,
        isDeleteUserPopupActive: true,
      }
    case 'CLOSE_DELETE_USER_POPUP':
      return {
        ...state,
        isDeleteUserPopupActive: false,
      }
    case 'DELETE_ID':
      return {
        ...state,
        deleteId: action.payload,
      }
    default:
      return state
  }
}
