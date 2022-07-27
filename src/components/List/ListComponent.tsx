import React, { useRef, useState } from 'react'

import { PositionedAddress } from '../../data/addresses/addressDataType'
import useSelectedObjectId from '../../util/useSelectedObjectId'
import { InlineMarker } from '../common/Marker'
import { CenteredPagination } from '../common/CommonStyles'

import * as Styled from './ListComponent.style'

const listElementIdFromObjectId = (projectId: number): string =>
  `project-list-entry-${projectId}`

export interface ProjectListViewerListProps {
  projects: PositionedAddress[]
}

const entriesPerPage = 100

const ListComponent: React.FC<ProjectListViewerListProps> = ({ projects }) => {
  const selectedProjectId = useSelectedObjectId()
  const listContainerRef = useRef<HTMLUListElement>(null)
  const [page, setPage] = useState<number>(0)

  return (
    <>
      <CenteredPagination
        count={Math.ceil(projects.length / entriesPerPage)}
        page={page}
        onChange={(event, newPage) => setPage(newPage)}
      />
      <Styled.ListContainer ref={listContainerRef}>
        {projects
          .slice(page * entriesPerPage, (page + 1) * entriesPerPage)
          .map((project) => (
            <Styled.ListEntry
              key={project.object.id}
              id={listElementIdFromObjectId(project.object.id)}
              selected={selectedProjectId === project.object.id}
              onClick={(): void => {
                window.location.href = `#${project.object.id}`
              }}
            >
              <Styled.Title>
                <InlineMarker companyType={project.owner.category} />
                {project.object.street}{' '}
                {project.object.zipCode ? (
                  <>({project.object.zipCode})</>
                ) : (
                  <i>(Unbekannte PLZ)</i>
                )}
              </Styled.Title>
            </Styled.ListEntry>
          ))}
      </Styled.ListContainer>
    </>
  )
}

export default ListComponent
