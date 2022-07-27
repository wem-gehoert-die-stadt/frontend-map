import styled from 'styled-components'

import { selectedBackgroundColor } from '../../util/styleConstants'

export const ListContainer = styled.ul`
  padding-left: 0;
`

export const ListEntry = styled.li<{ selected: boolean }>`
  padding: 1rem 1.5rem;
  &:not(:last-child) {
    border-bottom: 1px rgba(224, 224, 224, 1) solid;
  }

  list-style-type: none;

  ${({ selected }): string =>
    selected ? `background-color: ${selectedBackgroundColor};` : ''}
`
export const Title = styled.div`
  font-weight: bold;
`
export const Details = styled.div`
  display: flex;
  justify-content: space-between;
`

export const YearWithMarker = styled.div`
  flex-shrink: 0;
  margin-left: 1rem;
`
