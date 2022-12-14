import dotProp from 'dot-prop-immutable'

import { DataAction, DataActionTypes } from './dataActionTypes'
import { DataState, LoadingState } from './dataStateTypes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const identity = <V>(x): V => x as any as V

/**
 * Generic reducer for DataStateActions
 * @param path A function (returning a string) or string indicating where in the state to store the data. Omit (or empty string) for root. [Default: Root[
 * @param dataTransform A function to transform the incoming data before saving in the store [Default: Identity]
 * @param preflight A function to test whether to store the data (returned true) or not (returned false) [Default: No preflight]
 */
const dataStateGenericReducer =
  <
    StateType,
    DataActionDataType,
    TransformedDataType = DataActionDataType,
    DataActionMetadataType = void,
  >({
    path,
    dataTransform = identity,
    preflight,
  }: {
    path?:
      | ((
          action: DataAction<DataActionDataType, void, DataActionMetadataType>,
        ) => string)
      | string
      | null
    dataTransform?: (data: DataActionDataType) => TransformedDataType
    preflight?: (
      state: StateType,
      action: DataAction<DataActionDataType, void, DataActionMetadataType>,
    ) => boolean
  } = {}) =>
  (
    state: StateType,
    action: DataAction<DataActionDataType, void, DataActionMetadataType>,
  ): StateType => {
    if (preflight) {
      if (!preflight(state, action)) {
        return state
      }
    }

    let newValue
    if (action.payload.intent === DataActionTypes.LOAD) {
      newValue = LoadingState
    } else if (action.payload.intent === DataActionTypes.ERROR) {
      newValue = { state: DataState.ERRORED, error: action.payload.error }
    } else if (action.payload.intent === DataActionTypes.STORE) {
      newValue = {
        state: DataState.READY,
        data: dataTransform(action.payload.data),
      }
    } else {
      newValue = { state: DataState.INITIAL }
    }

    if (path) {
      let evaluatedPath
      if (typeof path === 'function') {
        evaluatedPath = path(action)
      } else {
        evaluatedPath = path
      }
      return dotProp.set(state, evaluatedPath, newValue)
    }
    return newValue
  }

export default dataStateGenericReducer
