import styled, { css } from 'styled-components'
import { Box } from '@material-ui/core'

export const Container = styled.div`
  position: relative;
`

const AbsoluteElement = css`
  z-index: 1000;
  position: absolute;
  top: 0;
  height: 100vh;
`

export const COLLAPSED_SIDEBAR_BREAKPOINT = '600px'
export const WIDTH_SIDEBAR_CLOSED = '3rem'
export const WIDTH_SIDEBAR_FILTER_OPEN = '18rem'

export const SidebarTrigger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${WIDTH_SIDEBAR_CLOSED};
  cursor: pointer;

  @media (max-width: ${COLLAPSED_SIDEBAR_BREAKPOINT}) {
    height: 15ch !important;
    border-bottom: 1px solid white;
  }
`

export const SidebarTriggerText = styled.div`
  transform: rotate(-90deg) translate(50%);
  @media (max-width: ${COLLAPSED_SIDEBAR_BREAKPOINT}) {
    transform: rotate(-90deg);
  }
  font-size: 1.2rem;
`

const SidebarBaseFilter = css`
  ${AbsoluteElement}
  left: 0;

  color: white;
  background-color: black;
  border-right: 1px solid white;
`

export const SidebarFilter = styled.div`
  ${SidebarBaseFilter}
  width: ${WIDTH_SIDEBAR_FILTER_OPEN};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-y: auto;
`

export const SidebarTriggerFilter = styled(SidebarTrigger)`
  ${SidebarBaseFilter}
`

export const SidebarFullHeightBox = styled(Box)`
  height: 100%;
`

const SidebarBaseRight = css`
  ${AbsoluteElement}
  right: 0;

  color: black;
  background-color: white;
  border-left: 1px solid black;
`
export const SidebarList = styled.div`
  ${SidebarBaseRight}
  width: 30rem; // mirrored in maps.scss (can't reference explicitly)

  display: flex;
  flex-direction: column;
`

export const SidebarTable = styled.div`
  ${SidebarBaseRight}
  width: 80rem; // mirrored in maps.scss (can't reference explicitly)
  max-width: calc(100% - 30rem);

  display: flex;
  flex-direction: column;
`

export const SidebarTriggerRight = styled(SidebarTrigger)`
  ${SidebarBaseRight}
`

export const SidebarListContainer = styled(Box)`
  overflow-y: auto;
`

export const SidebarTableContainer = styled(Box)`
  overflow-y: auto;
`

export const Main = styled.main``
