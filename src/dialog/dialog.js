import { MDCDialog } from '@material/dialog'
import { MDCList } from '@material/list'

import React from 'react'
import { withTranslation } from 'react-i18next'

import '@material/dialog/mdc-dialog.scss'
import './dialog.scss'

class Dialog extends React.Component {
  componentDidMount () {
    this.dialog = new MDCDialog(document.querySelector('.mdc-dialog'))
    if (this.props.list) {
      this.list = new MDCList(document.querySelector('.mdc-dialog .mdc-list'))
      this.dialog.listen('MDCDialog:opened', () => { this.list.layout() })
    }
    this.dialog.listen('MDCDialog:closed', (event) => { this.props.onClosed(event.detail && event.detail.action) })
    this.open()
  }

  open () {
    this.dialog.open()
  }

  close (action) {
    this.dialog.close(action)
  }

  render () {
    return (
      <div
        className='mdc-dialog'
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='my-dialog-title'
        aria-describedby='my-dialog-content'
      >
        <div className='mdc-dialog__container'>
          <div className='mdc-dialog__surface'>
            {this.props.children}
          </div>
        </div>
        <div className='mdc-dialog__scrim' />
      </div>
    )
  }
}

export default withTranslation('translation', { withRef: true })(Dialog)
