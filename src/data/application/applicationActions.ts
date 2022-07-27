import { createAction } from 'redux-actions'
import { SidebarRightStatus } from './applicationReducers'

export enum ApplicationActionTypes {
  FATAL_ERROR = 'FATAL_ERROR',
  SET_SIDEBAR_FILTER_OPEN = 'SET_SIDEBAR_FILTER_OPEN',
  SET_SIDEBAR_RIGHT_STATUS = 'SET_SIDEBAR_RIGHT_STATUS',
}

export const fatalError = createAction<string>(
  ApplicationActionTypes.FATAL_ERROR,
)

export const setSidebarFilterOpen = createAction<boolean>(
  ApplicationActionTypes.SET_SIDEBAR_FILTER_OPEN,
)

export const setSidebarRightStatus = createAction<SidebarRightStatus>(
  ApplicationActionTypes.SET_SIDEBAR_RIGHT_STATUS,
)
