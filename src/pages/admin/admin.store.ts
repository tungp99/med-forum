import { DateTime } from 'luxon'
import { StoreAction } from 'system/store'

type Store = { filterType: string; filterTime: string; editable: boolean }
const initialState: Store = {
  filterTime: `${DateTime.now().startOf('day').toISO()}`,
  filterType: 'Today',
  editable: false,
}
export const adminStore = (
  state = initialState,
  action: StoreAction<
    'FILTER_POSTS_UPDATE' | 'AUTH_EDITABLE' | 'UNAUTH_EDITABLE',
    string
  >
): Store => {
  switch (action.type) {
    case 'FILTER_POSTS_UPDATE':
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
        filterType: action.payload as string,
        filterTime: filterTime,
      }
    case 'AUTH_EDITABLE':
      return { ...state, editable: true }
    case 'UNAUTH_EDITABLE':
      return { ...state, editable: false }
    default:
      return state
  }
}
