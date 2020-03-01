import React from 'react'

import { withTranslation } from 'react-i18next'

import config from '../config/config'
import ReportDialog from './report-dialog'
import http from '../common/http'

import '@material/chips/mdc-chips.scss'

class Reports extends React.Component {
  constructor (props) {
    super(props)

    this.reportDialog = React.createRef()

    this.stateFilter = 'OPEN'
    this.items = props.data
    this.state = { items: this.getItems() }
  }

  filter (item, filter, value) {
    return this[filter] && this[filter] !== 'ALL' ? value === this[filter] : item
  }

  getItems () {
    return this.items
      .filter(item => this.filter(item, 'stateFilter', item.state))
      .filter(item => this.filter(item, 'reportTypeFilter', item.payload.reportType))
      .filter(item => this.filter(item, 'resourceTypeFilter', item.payload.referenceResourceType))
  }

  setFilter (filter, value) {
    this[filter] = value
    this.setState({ items: this.getItems() })
  }

  clickButton (event, id, state) {
    event.stopPropagation()
    this.editItem(id, state)
  }

  editItem (id, state) {
    const item = this.items.find(item => item.id === id)
    if (item) {
      item.state = state
    }

    try {
      http(`${config.backendURL}/reports/${id}`, 'put', JSON.stringify({ ticketState: state }))
    } catch (error) {
      console.log(error)
    }

    this.setState({ items: this.getItems() })
  }

  openDialog (item) {
    this.reportDialog.current.open(item)
  }

  closeDialog (action) {
    if (action !== 'closed' && action !== 'cancel') {
      this.reportDialog.current && this.editItem(this.reportDialog.current.item.id, action)
    }
  }

  render () {
    const { t } = this.props
    return [
      <div key='card' className='mdc-card'>
        <ul className='mdc-list mdc-list--two-line'>
          {!this.state.items.length && <li key='no-results' className='mdc-list-item'>{t('noContent')}</li>}
          {this.state.items.map((item, index) =>
            <div key={index}>
              <li className='mdc-list-item mdc-ripple-upgraded' onClick={() => this.openDialog(item)}>
                <span className='mdc-list-item__text'>
                  <span className='mdc-list-item__primary-text'>{item.id}</span>
                  <span className='mdc-list-item__secondary-text'>
                    <span className={`mdc-chip ${item.state}`}>{t(item.state)}</span>
                    <span className={`mdc-chip ${item.payload.reportType}`}>{t(item.payload.reportType)}</span>
                    <span className={`mdc-chip ${item.payload.referenceResourceType}`}>{t(item.payload.referenceResourceType)}</span>
                    <span>{item.payload.message}</span>
                  </span>
                </span>
                <span className='mdc-list-item__meta' aria-hidden='true'>
                  {config.state.map((state, index) => state.name !== item.state && state.name !== 'ALL' &&
                    <button
                      key={index}
                      className='mdc-button mdc-button--unelevated mdc-button-shaped mdc-ripple-upgraded'
                      onClick={(event) => this.clickButton(event, item.id, state.name)}
                    >
                      <span className='mdc-button__label'>{t(state.action)}</span>
                    </button>
                  )}
                </span>
              </li>
              {(index !== this.state.items.length - 1) ? <li className='mdc-list-divider' /> : null}
            </div>
          )}
        </ul>
      </div>,
      <ReportDialog key='reportDialog' ref={this.reportDialog} onClose={action => this.closeDialog(action)} />
    ]
  }
}

export default withTranslation('translation', { withRef: true })(Reports)
