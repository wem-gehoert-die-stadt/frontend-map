import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../data/rootReducer'
import { DataState, Loadable } from '../data/util/dataState/dataStateTypes'
import { PublicOrInternalAddresses } from '../data/addresses/addressDataType'
import { FilterState } from '../data/filter/filterReducers'
import { companyTypes } from '../data/util/constants'

let cachedSearchMap = null
const getSearchMap = (projects: PublicOrInternalAddresses | null) => {
  if (projects === null) {
    return null
  }
  if (!cachedSearchMap) {
    cachedSearchMap = {}
    projects.forEach(({ object: { id, street, zipCode, parentID } }) => {
      cachedSearchMap[id] = [street, zipCode, `p:${parentID}`]
        .join('|')
        .toLowerCase()
    })
  }
  return cachedSearchMap
}

const filterProjects = (
  projects: PublicOrInternalAddresses,
  filters: FilterState,
): PublicOrInternalAddresses => {
  let filteredProjects = projects
  if (filters.searchString) {
    const searchMap = getSearchMap(projects)
    const searchStringWords = filters.searchString.toLowerCase().split(' ')
    filteredProjects = filteredProjects.filter(({ object: { id } }) =>
      searchStringWords.every((searchStringWord) =>
        searchMap[id].includes(searchStringWord),
      ),
    )
  }

  if (filters.companyTypes.length < Object.keys(companyTypes).length) {
    filteredProjects = filteredProjects.filter(({ owner: { category } }) =>
      filters.companyTypes.includes(category),
    )
  }
  return filteredProjects
}

const useFilteredProjects = (): Loadable<PublicOrInternalAddresses> => {
  const projects = useSelector<RootState, Loadable<PublicOrInternalAddresses>>(
    (state) => state.projects,
  )
  const filters = useSelector<RootState, FilterState>((state) => state.filters)

  return useMemo(() => {
    if (projects.state !== DataState.READY) {
      return projects
    }

    return {
      state: DataState.READY,
      data: filterProjects(projects.data, filters),
    }
  }, [projects, filters])
}

export default useFilteredProjects
