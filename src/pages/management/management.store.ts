import { StoreAction } from 'system/store'

type Store = {
  fetchPublished: boolean
}

const initialState: Store = {
  fetchPublished: false,
}

export const managementPageStore = (
  state = initialState,
  action: StoreAction<
    'SET_POSTS_FILTER_PUBLISHED' | 'SET_POSTS_FILTER_DRAFTS',
    undefined
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
    default:
      return state
  }
}
