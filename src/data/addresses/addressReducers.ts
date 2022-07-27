import { Action } from 'redux'

import { InitialState, Loadable } from '../util/dataState/dataStateTypes'
import { AddressActionTypes } from './addressActions'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'
import { PublicOrInternalAddresses } from './addressDataType'

export type AddressesState = Loadable<PublicOrInternalAddresses>

const caseSetsInitialState: AddressesState = InitialState

const actionHandlers: {
  [key in AddressActionTypes]: (state: AddressesState, action) => AddressesState
} = {
  [AddressActionTypes.ADDRESS_LIST_DATA_ACTION]: dataStateGenericReducer(),
}

const addressReducer = (
  // eslint-disable-next-line default-param-last
  state = caseSetsInitialState,
  action: Action,
): AddressesState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default addressReducer
