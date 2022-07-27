import styled from 'styled-components'
import { Checkbox } from '@material-ui/core'
import { companyTypes } from '../../data/util/constants'

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Title = styled.h1`
  font-size: 1.2rem;
  margin-top: 0;
`

export const HeadingSection = styled.h2`
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`

export const HeadingFilter = styled.h3`
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0.5em;
`

export const ColoredCheckbox = styled(Checkbox)<{ companyType: string }>`
  svg {
    color: ${({ companyType }): string => {
      const { color } = companyTypes[companyType]
      return color === 'black' ? '#222' : color
    }};
  }
`

export const FilterCountIndicator = styled.div`
  margin-top: auto;
  text-align: center;
`
