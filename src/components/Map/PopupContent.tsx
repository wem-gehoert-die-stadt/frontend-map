import React from 'react'
import { PositionedAddress } from '../../data/addresses/addressDataType'

const PopupContent = ({ address }: { address: PositionedAddress }) => (
  <>
    <div>
      #{address.object.id} ({address.object.longitude}/{address.object.latitude}
      )
    </div>
    <div>
      {address.object.street}, {address.object.zipCode}
    </div>
    <div>
      {address.owner.name} ({address.owner.id})
    </div>
  </>
)

export default PopupContent
