/* eslint-disable import/prefer-default-export */
import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core'

import { selectedBackgroundColor } from './util/styleConstants'

export const getTheme = (dark = false): Theme => {
  const themeCustomizations = createMuiTheme({
    typography: {
      fontFamily: "'Jost', sans-serif",
    },
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        main: dark ? '#1d5bb4' : '#1e88e5',
      },
      secondary: {
        main: '#008f68',
      },
    },
    overrides: {
      MuiTableRow: {
        root: {
          '&$selected': {
            backgroundColor: `${selectedBackgroundColor} !important`,
          },
          '&:hover': {
            backgroundColor: 'initial',
          },
        },
      },
    },
  })

  themeCustomizations.typography.h1.fontSize = '2rem'
  themeCustomizations.typography.h2.fontSize = '1.8rem'
  themeCustomizations.typography.h3.fontSize = '1.5rem'
  themeCustomizations.typography.body1.fontSize = '0.875rem'

  const theme = responsiveFontSizes(themeCustomizations)

  return theme
}
