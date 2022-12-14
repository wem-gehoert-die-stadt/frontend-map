import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'

import App from './App'
import * as serviceWorker from './serviceWorker'
import withProviders from './withProviders'

const AppWithProviders = withProviders(App)

ReactDOM.render(<AppWithProviders />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
