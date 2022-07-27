import React from 'react'
import { useSelector } from 'react-redux'

import DataStateManager from '../common/DataStateManager'
import { RootState } from '../../data/rootReducer'
import { PublicOrInternalAddresses } from '../../data/addresses/addressDataType'
import { City } from '../../data/util/city'
import useFilteredProjects from '../../util/useFilteredProjects'
import MapComponent from './MapComponent'

interface MapContainerProps {
  city: City
  internal: boolean
}

const MapContainer: React.FC<MapContainerProps> = ({ city, internal }) => {
  const projects = useFilteredProjects()
  const sidebarFilterOpen = useSelector<RootState, boolean>(
    (state) => state.application.sidebarFilterOpen,
  )

  return (
    <DataStateManager<PublicOrInternalAddresses>
      data={projects}
      componentFunction={(projectsData): JSX.Element => (
        <MapComponent
          city={city}
          internal={internal}
          addresses={projectsData}
          sidebarFilterOpen={sidebarFilterOpen}
        />
      )}
    />
  )
}

export default MapContainer
