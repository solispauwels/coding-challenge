import React from 'react'

import { withTranslation } from 'react-i18next'

import config from '../config/config'
import Dialog from '../dialog/dialog'

class reportDialog extends React.Component {
  constructor (props) {
    super(props)

    this.dialog = React.createRef()

    this.state = { open: false }
  }

  open (item) {
    this.item = item
    this.setState({ open: true })
  }

  close (action) {
    this.dialog.current.close(action)
  }

  onClose (action) {
    this.props.onClose && this.props.onClose(action)
    this.setState({ open: false })
  }

  render () {
    const { t } = this.props
    return this.state.open &&
      <Dialog ref={this.dialog} key='places-dialog' onClosed={(action) => this.onClose(action)}>
        <h2 className='mdc-dialog__title' id='my-dialog-title'>{this.item.id}</h2>
        <div className='mdc-dialog__content' id='my-dialog-content'>
          <p><b>Source</b> <i> {this.item.source}</i></p>
          <p><b>Source identity Id</b> <i> {this.item.sourceIdentityId}</i></p>
          <p><b>Reference Id</b> <i> {this.item.reference.referenceId}</i></p>
          <p><b>Reference type</b> <i> {this.item.reference.referenceType}</i></p>
          <p><b>State</b> <i> {this.item.state}</i></p>
          <p><b>Source</b> <i> {this.item.payload.source}</i></p>
          <p><b>Report type</b> <i> {this.item.payload.reportType}</i></p>
          <p><b>Message</b> <i> {this.item.payload.message}</i></p>
          <p><b>Report Id</b> <i> {this.item.payload.reportId}</i></p>
          <p><b>Reference resource Id</b> <i> {this.item.payload.referenceResourceId}</i></p>
          <p><b>Reference resource type</b> <i> {this.item.payload.referenceResourceType}</i></p>
          <p><b>Created</b> <i> {this.item.created}</i></p>
        </div>
        <footer className='mdc-dialog__actions'>
          <button type='button' className='mdc-button mdc-dialog__button' data-mdc-dialog-action='cancel'>
            <span className='mdc-button__label'>{t('cancel')}</span>
          </button>
          {config.state.map((state, index) => state.name !== this.item.state && state.name !== 'ALL' &&
            <button
              key={index}
              className='mdc-button mdc-button--unelevated mdc-ripple-upgraded'
              data-mdc-dialog-action={state.name}
            >
              <span className='mdc-button__label'>{t(state.action)}</span>
            </button>
          )}
        </footer>
      </Dialog>
  }
}

export default withTranslation('translation', { withRef: true })(reportDialog)
