import { DateTime } from 'luxon'
import { StoreAction } from 'system/store'

type Store = { filterType: string; filterTime: string; page: number }
const initialState: Store = {
  filterTime: `${DateTime.now().startOf('day').toISO()}`,
  filterType: 'Today',
  page: 0,
}
export const adminStore = (
  state = initialState,
  action: StoreAction<
    'ADMIN_FILTER_POSTS_UPDATE' | 'SET_ADMIN_POSTS_PAGE',
    string | number
  >
): Store => {
  switch (action.type) {
    case 'ADMIN_FILTER_POSTS_UPDATE':
      let filterTime = ''
      const filterType = action.payload as string
      filterTime =
        filterType === 'Today'
          ? `${DateTime.now().startOf('day').toISO()}`
          : filterType === 'This week'
          ? `${DateTime.now().startOf('week').toISO()}`
          : filterType === 'This month'
          ? `${DateTime.now().startOf('month').toISO()}`
          : '1111-11-11T11:11:11.111Z'
      return {
        ...state,
        page: 0,
        filterType: action.payload as string,
        filterTime: filterTime,
      }
    case 'SET_ADMIN_POSTS_PAGE': {
      const page = action.payload as number
      return {
        ...state,
        page: page ?? 0,
      }
    }
    default:
      return state
  }
}
