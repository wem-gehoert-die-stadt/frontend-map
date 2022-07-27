import React from 'react'

import DataStateManager from '../common/DataStateManager'
import {
  PositionedAddress,
  PublicOrInternalAddresses,
} from '../../data/addresses/addressDataType'
import useFilteredProjects from '../../util/useFilteredProjects'
import ListComponent from './ListComponent'

const ListContainer: React.FC<Record<string, never>> = () => {
  const projects = useFilteredProjects()

  return (
    <DataStateManager<PublicOrInternalAddresses>
      data={projects}
      componentFunction={(projectsData): JSX.Element => (
        <ListComponent projects={projectsData as Array<PositionedAddress>} />
      )}
    />
  )
}

export default ListContainer
