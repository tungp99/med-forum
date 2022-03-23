import { DateTime } from 'luxon'
import { StoreAction } from 'system/store'
import { Post } from 'system/types'

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
    | 'SET_HOMEPAGE_POSTS_PAGE'
    | 'INCREASE_HOMEPAGE_POSTS_PAGE'
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
    case 'INCREASE_HOMEPAGE_POSTS_PAGE':
      return {
        ...state,
        page: state.page + 1,
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
