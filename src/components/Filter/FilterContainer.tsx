import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../data/rootReducer'
import DataStateManager from '../common/DataStateManager'
import { DataReady, Loadable } from '../../data/util/dataState/dataStateTypes'
import {
  PositionedAddress,
  PublicOrInternalAddresses,
} from '../../data/addresses/addressDataType'
import { FilterState } from '../../data/filter/filterReducers'
import {
  setFilterPeriods,
  setFilterSearchString,
} from '../../data/filter/filterActions'
import useFilteredProjects from '../../util/useFilteredProjects'

import FilterComponent from './FilterComponent'

interface FilterContainerProps {
  internal: boolean
}
const FilterContainer: React.FC<FilterContainerProps> = ({ internal }) => {
  const projects = useSelector<RootState, Loadable<PublicOrInternalAddresses>>(
    (state) => state.projects,
  )
  const filteredProjects = useFilteredProjects()
  const filters = useSelector<RootState, FilterState>((state) => state.filters)
  const dispatch = useDispatch()

  return (
    <DataStateManager
      data={projects}
      componentFunction={(projectsData): JSX.Element => (
        <FilterComponent
          internal={internal}
          projects={projectsData}
          filteredProjects={
            (filteredProjects as DataReady<PositionedAddress[]>).data
          }
          filters={filters}
          setFilterPeriods={(periods): void => {
            dispatch(setFilterPeriods(periods))
          }}
          setFilterSearchString={(searchString): void => {
            dispatch(setFilterSearchString(searchString))
          }}
        />
      )}
    />
  )
}

export default FilterContainer
