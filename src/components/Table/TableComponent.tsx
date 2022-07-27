import React, { useRef, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import { PositionedAddress } from '../../data/addresses/addressDataType'
import useSelectedObjectId from '../../util/useSelectedObjectId'
import useSyncScrollToSelectedObject from '../../util/useSyncScrollToSelectedObject'
import { CenteredPagination } from '../common/CommonStyles'
import { InlineMarker } from '../common/Marker'
import { companyTypes } from '../../data/util/constants'

const tableRowIdFromObjectId = (objectId: number): string =>
  `project-table-row-${objectId}`

export interface ProjectListViewerTableProps {
  projects: PositionedAddress[]
}

const entriesPerPage = 100

const TableComponent: React.FC<ProjectListViewerTableProps> = ({
  projects,
}) => {
  const selectedProjectId = useSelectedObjectId()
  const tableContainerRef = useRef<HTMLUListElement>(null)
  const [page, setPage] = useState<number>(0)

  useSyncScrollToSelectedObject(
    tableContainerRef,
    tableRowIdFromObjectId,
    selectedProjectId,
  )

  return (
    <>
      <CenteredPagination
        count={Math.ceil(projects.length / entriesPerPage)}
        page={page}
        onChange={(event, newPage) => setPage(newPage)}
      />
      <TableContainer>
        <Table>
          <caption>{projects.length} projects</caption>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>PLZ</TableCell>
              <TableCell>Besitzend</TableCell>
              <TableCell>Typ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects
              .slice(page * entriesPerPage, (page + 1) * entriesPerPage)
              .map((project) => (
                <TableRow
                  key={project.object.id}
                  id={tableRowIdFromObjectId(project.object.id)}
                  selected={selectedProjectId === project.object.id}
                  onClick={(): void => {
                    window.location.href = `#${project.object.id}`
                  }}
                >
                  <TableCell>{project.object.id}</TableCell>
                  <TableCell>{project.object.street}</TableCell>
                  <TableCell>{project.object.zipCode}</TableCell>
                  <TableCell>
                    {project.owner.name} ({project.owner.id})
                  </TableCell>
                  <TableCell>
                    <InlineMarker companyType={project.owner.category} />
                    {companyTypes[project.owner.category].description}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableComponent
