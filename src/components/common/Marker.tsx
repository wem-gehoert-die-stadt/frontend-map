import React from 'react'
import styled from 'styled-components'
import { companyTypes } from '../../data/util/constants'

const MARKER_SIZE = 10 // px
const StyledMarker = styled.div<{ companyType: number }>`
  display: inline-block;

  height: ${MARKER_SIZE}px;
  width: ${MARKER_SIZE}px;
  border-radius: ${MARKER_SIZE / 2}px;

  background-color: ${({ companyType }) =>
    companyTypes[companyType]?.color || 'gray'};
`

export const Marker: React.FC<{ companyType: number; className?: string }> = ({
  companyType,
  className,
}) => <StyledMarker companyType={companyType} className={className} />

export const InlineMarker = styled(Marker)`
  margin-right: 0.5rem;
  opacity: 1;
`

export default Marker
