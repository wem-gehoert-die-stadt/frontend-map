import { put } from 'redux-saga/effects'

import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { City, slugifyCityName } from '../util/city'
import httpResponseErrorMessage from '../util/httpResponseErrorMessage'
import { AddressActionTypes, addressesDataAction } from './addressActions'
import { PublicOrInternalAddresses } from './addressDataType'
import { getSecretFromUrl } from '../util/internal'

const urlBuilder = ({
  city,
  internal,
}: {
  city: City
  internal: boolean
}): string =>
  `${
    process.env.REACT_APP_ADDRESSES_ENDPOINT ||
    'https://www.wemgehoertdiestadt.de/.netlify/functions/mapData'
  }?city=${slugifyCityName(city)}${
    internal ? `&internal&secret=${getSecretFromUrl()}` : ''
  }`

export function* fetchAddressList({
  city,
  internal,
}: {
  city: City
  internal: boolean
}) {
  try {
    const response: Response = yield fetch(urlBuilder({ city, internal }), {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const { objects, owners } = yield response.json()

    const ownersById = {}
    owners.forEach((owner) => {
      ownersById[owner.id] = owner
    })
    const addresses: PublicOrInternalAddresses = objects
      .map((object) => ({
        object,
        owner: ownersById[object.parentID] || { category: -1 },
      }))
      .filter(
        (object) => object.owner.category !== -1 && object.owner.category !== 7,
      )
      .map((address, index) => ({
        ...address,
        object: {
          ...address.object,
          id: index,
        },
      }))

    yield put(addressesDataAction.store(addresses))
  } catch (error) {
    yield put(
      addressesDataAction.errored(
        `Failed to fetch project list: ${error.message}`,
      ),
    )
  }
}

const caseSetsSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AddressActionTypes.ADDRESS_LIST_DATA_ACTION,
    fetchAddressList,
  ),
]
export default caseSetsSagas
