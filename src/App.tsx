import React from 'react'

import { detectCityFromUrl } from './data/util/city'
import { detectInternalFromUrl } from './data/util/internal'
import Map from './Map'

const App: React.FC<Record<string, never>> = () => {
  const city = detectCityFromUrl()
  const internal = detectInternalFromUrl()

  return <Map city={city} internal={internal} />
}

export default App
