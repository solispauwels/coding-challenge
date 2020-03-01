import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

import './translations/i18n'

import './index.scss'
import './common/common.scss'
import '@material/typography/mdc-typography.scss'
import '@material/elevation/mdc-elevation.scss'

ReactDOM.render(<App />, document.querySelector('#root'))
