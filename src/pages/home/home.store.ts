import { StoreAction } from 'system/store'
import { Pagination, Post } from 'system/types'

type Action =
  | 'SET_HOMEPAGE_POSTS'
  | 'SET_HOMEPAGE_POSTS_PAGE'
  | 'INCREASE_HOMEPAGE_POSTS_PAGE'

type Payload = Post[] | Partial<Pagination>

type State = {
  posts: Post[]
  pagination: Pagination
}

const initialState: State = {
  posts: [],
  pagination: { page: 0, itemsPerPage: 8 },
}

export const homePageStore = (
  state = initialState,
  action: StoreAction<Action, Payload>
): State => {
  if (!action.payload) return state

  switch (action.type) {
    case 'SET_HOMEPAGE_POSTS':
      return { ...state, posts: action.payload as Post[] }
    case 'SET_HOMEPAGE_POSTS_PAGE': {
      const { page } = action.payload as Partial<Pagination>
      return {
        ...state,
        pagination: { ...state.pagination, page: page ?? 0 },
      }
    }
    case 'INCREASE_HOMEPAGE_POSTS_PAGE':
      return {
        ...state,
        pagination: { ...state.pagination, page: state.pagination.page + 1 },
      }
    default:
      return state
  }
}
