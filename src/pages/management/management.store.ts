import { GetPosts_posts_items } from 'system/generated/gql.types'
import { StoreAction } from 'system/store'

type Store = {
  fetchPosts: boolean | null
  isPublic: boolean | undefined
  filterTitle: string
  filterText: string
  isCreateUserPopupActive: boolean
  isDeleteUserPopupActive: boolean
  deleteId?: string
  page: number
  posts: GetPosts_posts_items[]
}

const initialState: Store = {
  fetchPosts: true,
  isPublic: undefined,
  filterTitle: 'All',
  filterText: '',
  isCreateUserPopupActive: false,
  isDeleteUserPopupActive: false,
  page: 0,
  posts: [],
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
    | 'SET_MANAGEMENT_PAGE'
    | 'ADD_MANAGEMENT_POSTS'
    | 'DELETE_ID',
    string | number | GetPosts_posts_items[]
  >
): Store => {
  switch (action.type) {
    case 'SET_POSTS_FILTER_PUBLISHED':
      return {
        ...state,
        page: 0,
        posts: [],
        fetchPosts: true,
      }
    case 'SET_POSTS_FILTER_DRAFTS':
      return {
        ...state,
        page: 0,
        posts: [],
        fetchPosts: false,
      }
    case 'SET_POSTS_FILTER_COLLECTED':
      return {
        ...state,
        page: 0,
        posts: [],
        fetchPosts: null,
      }
    case 'SET_ACCOUNT_FILTER_PUBLIC':
      return {
        ...state,
        page: 0,
        isPublic: true,
        filterTitle: 'Public',
      }
    case 'SET_ACCOUNT_FILTER_PRIVATE':
      return {
        ...state,
        page: 0,
        isPublic: false,
        filterTitle: 'Private',
      }
    case 'SET_ACCOUNT_FILTER_ALL':
      return {
        ...state,
        page: 0,
        filterTitle: 'All',
      }
    case 'SET_ACCOUNT_UPDATE_FILTER':
      const filter_text = action.payload
      return {
        ...state,
        filterText: (filter_text as string) ?? '',
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
        deleteId: action.payload as string,
      }
    case 'SET_MANAGEMENT_PAGE':
      const page = action.payload as number
      return {
        ...state,
        page: page ?? 0,
      }
    case 'ADD_MANAGEMENT_POSTS': {
      return {
        ...state,
        posts: state.posts.concat(action.payload as GetPosts_posts_items[]),
      }
    }
    default:
      return state
  }
}
