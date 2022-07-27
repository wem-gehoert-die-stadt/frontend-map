import { Action } from 'redux'

import { ApplicationActionTypes } from './applicationActions'

export enum SidebarRightStatus {
  HIDE_COMPLETELY,
  CLOSED,
  OPEN_LIST,
  OPEN_TABLE,
}

export interface ApplicationState {
  fatalError?: string
  sidebarFilterOpen: boolean
  sidebarRightStatus: SidebarRightStatus
}

const applicationInitialState: ApplicationState = {
  sidebarFilterOpen: false,
  sidebarRightStatus: SidebarRightStatus.HIDE_COMPLETELY,
}

const actionHandlers: {
  [key in ApplicationActionTypes]: (
    state: ApplicationState,
    action,
  ) => ApplicationState
} = {
  [ApplicationActionTypes.FATAL_ERROR]: (state, action) => ({
    ...state,
    fatalError: action.payload,
  }),
  [ApplicationActionTypes.SET_SIDEBAR_FILTER_OPEN]: (state, action) => ({
    ...state,
    sidebarFilterOpen: action.payload,
  }),
  [ApplicationActionTypes.SET_SIDEBAR_RIGHT_STATUS]: (state, action) => ({
    ...state,
    sidebarRightStatus: action.payload,
  }),
}

const applicationReducers = (
  // eslint-disable-next-line default-param-last
  state = applicationInitialState,
  action: Action,
): ApplicationState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default applicationReducers
