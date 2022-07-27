import styled from 'styled-components'
import { CardActions } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

export const CardActionsEnd = styled(CardActions)`
  justify-content: flex-end;
`

export const CenteredPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`
