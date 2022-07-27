import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import configureStore from './configureStore'
import { getTheme } from './theme'

const store = configureStore()

const withProviders =
  <WrappedComponentProps,>(
    WrappedComponent: React.ComponentType<WrappedComponentProps>,
  ) =>
  (props: React.ComponentProps<typeof WrappedComponent>): JSX.Element => {
    const theme = useMemo(() => getTheme(), [])

    return (
      <Provider store={store}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <WrappedComponent {...props} />
          </ThemeProvider>
        </StylesProvider>
      </Provider>
    )
  }

export default withProviders
