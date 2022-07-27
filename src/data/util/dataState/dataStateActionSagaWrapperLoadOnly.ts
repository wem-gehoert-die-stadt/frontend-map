import { takeEvery } from 'redux-saga/effects'

import { DataActionTypes } from './dataActionTypes'

export default function dataStateActionSagaWrapperLoadOnly(
  dataActionType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generator: (parameters: any) => Generator,
) {
  function* sagaWrapper(action) {
    if (action.payload.intent !== DataActionTypes.LOAD) {
      return
    }

    yield* generator(action.payload.parameters)
  }

  return takeEvery(dataActionType, sagaWrapper)
}
