import { DateTime } from 'luxon'
import { Post } from 'system/types'
import { StoreAction } from 'system/store'

type State = {
  posts: Post[]
  page: number
  filter_type: string
  filter_time: string
}

const initialState: State = {
  posts: [],
  page: 0,
  filter_type: 'New',
  filter_time: '1111-11-11T11:11:11.111Z',
}

export const homePageStore = (
  state = initialState,
  action: StoreAction<
    | 'SET_HOMEPAGE_POSTS'
    | 'ADD_HOMEPAGE_POSTS'
    | 'SET_HOMEPAGE_POSTS_PAGE'
    | 'RESET_HOMEPAGE_POSTS_PAGE'
    | 'FILTER_POST_UPDATE',
    Post[] | number | string
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

    case 'ADD_HOMEPAGE_POSTS': {
      return {
        ...state,
        posts: [...state.posts, ...(action.payload as Post[])],
      }
    }

    case 'FILTER_POST_UPDATE':
      let filter_time = '1970-01-01T11:11:11.111Z'
      const filter_type = action.payload as string
      filter_time =
        filter_type === 'MostRating'
          ? '1111-11-11T11:11:11.111Z'
          : filter_type === 'Hot'
          ? `${DateTime.now().startOf('week').toISO()}`
          : ''
      return {
        ...state,
        page: 0,
        filter_time: filter_time,
        filter_type: action.payload as string,
      }
    default:
      return state
  }
}
