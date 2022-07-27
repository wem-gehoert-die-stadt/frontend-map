import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, ThemeProvider } from '@material-ui/core'
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@material-ui/icons'

import { RootState } from './data/rootReducer'
import Error from './components/common/Error'
import Filter from './components/Filter'
import MapComponent from './components/Map'
import List from './components/List'
import Table from './components/Table'
import {
  setSidebarFilterOpen,
  setSidebarRightStatus,
} from './data/application/applicationActions'
import {
  ApplicationState,
  SidebarRightStatus,
} from './data/application/applicationReducers'
import { addressesDataAction } from './data/addresses/addressActions'
import { City } from './data/util/city'
import { getTheme } from './theme'

import * as Styled from './Map.style'

export interface MapProps {
  city: City
  internal: boolean
}

const Map: React.FC<MapProps> = ({ city, internal }) => {
  const dispatch = useDispatch()
  const { fatalError, sidebarFilterOpen, sidebarRightStatus } = useSelector<
    RootState,
    ApplicationState
  >((state) => state.application)

  useEffect(() => {
    dispatch(addressesDataAction.load({ city, internal }))

    if (internal) {
      dispatch(setSidebarRightStatus(SidebarRightStatus.OPEN_LIST))
    }
  }, [dispatch])

  const sidebarFilterTheme = useMemo(() => getTheme(true), [])

  let sidebarRight
  if (sidebarRightStatus === SidebarRightStatus.OPEN_LIST) {
    sidebarRight = (
      <Styled.SidebarList>
        <Box display='flex' justifyContent='space-between'>
          <IconButton
            color='inherit'
            onClick={(): void =>
              dispatch(setSidebarRightStatus(SidebarRightStatus.OPEN_TABLE))
            }
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            color='inherit'
            onClick={(): void =>
              dispatch(setSidebarRightStatus(SidebarRightStatus.CLOSED))
            }
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Styled.SidebarListContainer>
          <List />
        </Styled.SidebarListContainer>
      </Styled.SidebarList>
    )
  } else if (sidebarRightStatus === SidebarRightStatus.OPEN_TABLE) {
    sidebarRight = (
      <Styled.SidebarTable>
        <Box display='flex' justifyContent='flex-end'>
          <IconButton
            color='inherit'
            onClick={(): void =>
              dispatch(setSidebarRightStatus(SidebarRightStatus.OPEN_LIST))
            }
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Styled.SidebarTableContainer>
          <Table />
        </Styled.SidebarTableContainer>
      </Styled.SidebarTable>
    )
  } else if (sidebarRightStatus === SidebarRightStatus.CLOSED) {
    sidebarRight = (
      <Styled.SidebarTriggerRight
        onClick={(): void =>
          dispatch(setSidebarRightStatus(SidebarRightStatus.OPEN_LIST))
        }
      >
        <Styled.SidebarTriggerText>Liste</Styled.SidebarTriggerText>
      </Styled.SidebarTriggerRight>
    )
  }

  return (
    <Styled.Container>
      <ThemeProvider theme={sidebarFilterTheme}>
        {sidebarFilterOpen ? (
          <Styled.SidebarFilter>
            <IconButton
              color='inherit'
              onClick={(): void => dispatch(setSidebarFilterOpen(false))}
            >
              <ArrowBackIcon />
            </IconButton>
            <Styled.SidebarFullHeightBox padding={2}>
              <Filter internal={internal} />
            </Styled.SidebarFullHeightBox>
          </Styled.SidebarFilter>
        ) : (
          <Styled.SidebarTriggerFilter
            onClick={(): void => dispatch(setSidebarFilterOpen(true))}
          >
            <Styled.SidebarTriggerText>Filter</Styled.SidebarTriggerText>
          </Styled.SidebarTriggerFilter>
        )}
      </ThemeProvider>

      <Styled.Main>
        {fatalError ? (
          <Error error={fatalError} />
        ) : (
          <MapComponent city={city} internal={internal} />
        )}
      </Styled.Main>

      {sidebarRight}
    </Styled.Container>
  )
}

export default Map
