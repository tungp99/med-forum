import { StoreAction } from 'system/store'

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
  action: StoreAction<'REFRESH_POST' | 'SET_POST_ID', string>
): Store => {
  switch (action.type) {
    case 'SET_POST_ID':
      if (!action.payload) return state

      return { ...state, id: action.payload }
    case 'REFRESH_POST':
      return { ...state, processor: state.processor + 1 }

    default:
      return state
  }
}
