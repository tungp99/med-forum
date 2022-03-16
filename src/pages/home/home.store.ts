import { StoreAction } from 'system/store'
import { Post } from 'system/types'

type State = {
  posts: Post[]
  page: number
}

const initialState: State = {
  posts: [],
  page: 0,
}

export const homePageStore = (
  state = initialState,
  action: StoreAction<
    | 'SET_HOMEPAGE_POSTS'
    | 'SET_HOMEPAGE_POSTS_PAGE'
    | 'INCREASE_HOMEPAGE_POSTS_PAGE',
    Post[] | number
  >
): State => {
  if (!action.payload) return state

  switch (action.type) {
    case 'SET_HOMEPAGE_POSTS':
      return { ...state, posts: action.payload as Post[] }
    case 'SET_HOMEPAGE_POSTS_PAGE': {
      const page = action.payload as number
      return {
        ...state,
        page: page ?? 0,
      }
    }
    case 'INCREASE_HOMEPAGE_POSTS_PAGE':
      return {
        ...state,
        page: state.page + 1,
      }
    default:
      return state
  }
}
