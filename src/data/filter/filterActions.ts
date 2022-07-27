import { createAction } from 'redux-actions'

export enum FilterActionTypes {
  SET_FILTER_COMPANY_TYPES = 'SET_FILTER_COMPANY_TYPES',
  SET_FILTER_SEARCH_STRING = 'SET_FILTER_SEARCH_STRING',
}

export const setFilterPeriods = createAction<Array<number>>(
  FilterActionTypes.SET_FILTER_COMPANY_TYPES,
)

export const setFilterSearchString = createAction<string>(
  FilterActionTypes.SET_FILTER_SEARCH_STRING,
)
