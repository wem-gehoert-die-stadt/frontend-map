import { combineReducers } from 'redux'
import projectReducers, { AddressesState } from './addresses/addressReducers'
import applicationReducers, {
  ApplicationState,
} from './application/applicationReducers'
import filterReducers, { FilterState } from './filter/filterReducers'

export interface RootState {
  application: ApplicationState
  projects: AddressesState
  filters: FilterState
}

const rootReducer = combineReducers({
  application: applicationReducers,
  projects: projectReducers,
  filters: filterReducers,
})

export default rootReducer
