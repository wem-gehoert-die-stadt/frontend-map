import React from 'react'

import DataStateManager from '../common/DataStateManager'
import useFilteredProjects from '../../util/useFilteredProjects'

import TableComponent from './TableComponent'
import {
  PositionedAddress,
  PublicOrInternalAddresses,
} from '../../data/addresses/addressDataType'

const TableContainer: React.FC<Record<string, never>> = () => {
  const projects = useFilteredProjects()

  return (
    <DataStateManager<PublicOrInternalAddresses>
      data={projects}
      componentFunction={(projectsData): JSX.Element => (
        <TableComponent projects={projectsData as Array<PositionedAddress>} />
      )}
    />
  )
}

export default TableContainer
