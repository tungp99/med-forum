import { StoreAction } from 'system/store'

type Store = {
  fetchPosts: boolean | null
  isPublic: boolean | undefined
  filterTitle: string
  filterText: string
  isCreateUserPopupActive: boolean
  isDeleteUserPopupActive: boolean
  deleteId?: string
}

const initialState: Store = {
  fetchPosts: true,
  isPublic: undefined,
  filterTitle: 'All',
  filterText: '',
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
    | 'SET_POSTS_FILTER_COLLECTED'
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
        fetchPosts: true,
      }
    case 'SET_POSTS_FILTER_DRAFTS':
      return {
        ...state,
        fetchPosts: false,
      }
    case 'SET_POSTS_FILTER_COLLECTED':
      return {
        ...state,
        fetchPosts: null,
      }
    case 'SET_ACCOUNT_FILTER_PUBLIC':
      return {
        ...state,
        isPublic: true,
        filterTitle: 'Public',
      }
    case 'SET_ACCOUNT_FILTER_PRIVATE':
      return {
        ...state,
        isPublic: false,
        filterTitle: 'Private',
      }
    case 'SET_ACCOUNT_FILTER_ALL':
      return {
        ...state,
        filterTitle: 'All',
      }
    case 'SET_ACCOUNT_UPDATE_FILTER':
      const filter_text = action.payload
      return {
        ...state,
        filterText: filter_text ?? '',
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
