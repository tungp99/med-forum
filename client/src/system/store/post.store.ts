import { StoreAction } from 'system/store'
import { Post } from 'system/types'

type Store = {
  id: string
  processor: number
}

const initialState: Store = {
  id: '',
  processor: 0,
}

export const postStore = (
  state = initialState,
  action: StoreAction<
    'REFRESH_POST' | 'SET_POST_ID' | 'UPDATE_COLLECTOR',
    string | Post
  >
): Store => {
  switch (action.type) {
    case 'SET_POST_ID':
      if (!action.payload) return state

      return { ...state, id: action.payload as string }

    case 'REFRESH_POST':
      return { ...state, processor: state.processor + 1 }

    default:
      return state
  }
}
