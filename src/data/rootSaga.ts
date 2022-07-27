import { all } from 'redux-saga/effects'
import addressSagas from './addresses/addressSagas'

export default function* rootSaga() {
  yield all([...addressSagas])
}
