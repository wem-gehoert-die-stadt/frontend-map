import React from 'react'
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { BackspaceOutlined as DeleteIcon } from '@material-ui/icons'

import { PublicOrInternalAddresses } from '../../data/addresses/addressDataType'
import { companyTypes } from '../../data/util/constants'
import { FilterState } from '../../data/filter/filterReducers'

import * as Styled from './FilterComponent.style'

export interface ProjectListViewerFilterProps {
  internal: boolean
  projects: PublicOrInternalAddresses
  filteredProjects: PublicOrInternalAddresses
  filters: FilterState
  setFilterPeriods: (filterPeriods: number[]) => void
  setFilterSearchString: (searchString: string) => void
}

const FilterComponent: React.FC<ProjectListViewerFilterProps> = ({
  internal,
  projects,
  filteredProjects,
  filters,
  setFilterPeriods,
  setFilterSearchString,
}) => (
  <Styled.FilterContainer>
    {internal && (
      <>
        <Styled.HeadingSection>Suche</Styled.HeadingSection>
        <TextField
          value={filters.searchString}
          onChange={(event): void => setFilterSearchString(event.target.value)}
          placeholder='Volltextsuche'
          InputProps={{
            endAdornment: filters.searchString && (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='volltextsuche zurücksetzen'
                  onClick={() => setFilterSearchString('')}
                >
                  <DeleteIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </>
    )}
    <Styled.HeadingSection>Filter</Styled.HeadingSection>
    <div>
      <Styled.HeadingFilter>Besitz-Typen</Styled.HeadingFilter>
      {Object.entries(companyTypes).map(([key, { description }]) => {
        const companyType = parseInt(key, 10)
        return (
          <div key={key}>
            <FormControlLabel
              control={
                <Styled.ColoredCheckbox
                  companyType={key}
                  checked={filters.companyTypes.includes(companyType)}
                  onChange={(event): void =>
                    setFilterPeriods(
                      event.target.checked
                        ? filters.companyTypes.concat([companyType])
                        : filters.companyTypes.filter(
                            (type) => type !== companyType,
                          ),
                    )
                  }
                />
              }
              label={description}
            />
          </div>
        )
      })}
    </div>
    <Styled.FilterCountIndicator>
      {filteredProjects.length} von {projects.length} angezeigt
    </Styled.FilterCountIndicator>
  </Styled.FilterContainer>
)

export default FilterComponent
