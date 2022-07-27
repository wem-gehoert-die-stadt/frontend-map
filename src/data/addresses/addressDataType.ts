export type PositionedAddress = {
  object: {
    id: number
    parentID: number
    street: string
    zipCode: string
    latitude: number
    longitude: number
  }
  owner: {
    id: number
    name: string
    description: string
    flatsTotal: string
    category: number
  }
}

export const PRIVATE_FIELDS = [] as const
type PrivateFields = typeof PRIVATE_FIELDS[number]

export type PublicPositionedAddress = Omit<PositionedAddress, PrivateFields>

export type PublicOrInternalAddresses =
  | Array<PositionedAddress>
  | Array<PublicPositionedAddress>
