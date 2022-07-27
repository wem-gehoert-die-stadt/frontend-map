import { City } from '../util/city'
import generateDataStateActions from '../util/dataState/generateDataStateActions'
import { PublicOrInternalAddresses } from './addressDataType'

export enum AddressActionTypes {
  ADDRESS_LIST_DATA_ACTION = 'ADDRESS_LIST_DATA_ACTION',
}

export const addressesDataAction = generateDataStateActions<
  PublicOrInternalAddresses,
  { city: City; internal: boolean }
>(AddressActionTypes.ADDRESS_LIST_DATA_ACTION)
