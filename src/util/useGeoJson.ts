import { useMemo } from 'react'
import { PublicPositionedAddress } from '../data/addresses/addressDataType'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGeoJson = (addresses: Array<PublicPositionedAddress>): any =>
  useMemo(
    () => ({
      type: 'FeatureCollection',
      name: 'wemgehoertdiestadt',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
      },
      features: addresses.map(
        ({ object: { id, latitude, longitude }, owner: { category } }) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          properties: { id, category, latitude, longitude },
        }),
      ),
    }),
    [addresses],
  )

export default useGeoJson
