import { Action } from 'redux'

import { FilterActionTypes } from './filterActions'

export interface FilterState {
  companyTypes: Array<number>
  searchString: string
}

const applicationInitialState: FilterState = {
  companyTypes: [1, 2, 3, 4, 5, 6],
  searchString: '',
}

const actionHandlers: {
  [key in FilterActionTypes]: (state: FilterState, action) => FilterState
} = {
  [FilterActionTypes.SET_FILTER_COMPANY_TYPES]: (state, action) => ({
    ...state,
    companyTypes: action.payload,
  }),
  [FilterActionTypes.SET_FILTER_SEARCH_STRING]: (state, action) => ({
    ...state,
    searchString: action.payload,
  }),
}

const filterReducers = (
  // eslint-disable-next-line default-param-last
  state = applicationInitialState,
  action: Action,
): FilterState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default filterReducers
