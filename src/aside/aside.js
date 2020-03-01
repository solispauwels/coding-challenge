import React from 'react'
import { withTranslation } from 'react-i18next'

import './aside.scss'

import config from '../config/config'
import responsiveDrawer from './responsive-drawer'

class Aside extends React.Component {
  componentDidMount () {
    responsiveDrawer()

    document.querySelectorAll('.mdc-radio__native-control[value="ALL"]').forEach(element => { element.checked = true })
  }

  onChange (filter, value) {
    this.props.onChange && this.props.onChange(filter, value)
  }

  render () {
    const { t } = this.props
    return (
      <aside className='mdc-drawer'>
        <div className='mdc-drawer__content'>
          <nav className='mdc-list'>
            <h6 className='mdc-list-group__subheader'>{t('reportType')}</h6>
            {config.reportType.map((item, index) =>
              <div className='mdc-list-group__subheader' key={index}>
                <div className='mdc-form-field'>
                  <div className='mdc-radio'>
                    <input
                      className='mdc-radio__native-control'
                      onChange={(event) => this.onChange('reportTypeFilter', event.target.value)}
                      type='radio'
                      name='reportType'
                      id={`reportType-${index}`}
                      value={item}
                    />
                    <div className='mdc-radio__background'>
                      <div className='mdc-radio__outer-circle' />
                      <div className='mdc-radio__inner-circle' />
                    </div>
                    <div className='mdc-radio__ripple' />
                  </div>
                  <label htmlFor={`reportType-${index}`}>{t(item)}</label>
                </div>
              </div>
            )}
            <hr className='mdc-list-divider' />
            <h6 className='mdc-list-group__subheader'>{t('resourceType')}</h6>
            {config.resourceType.map((item, index) =>
              <div className='mdc-list-group__subheader' key={index}>
                <div className='mdc-form-field'>
                  <div className='mdc-radio'>
                    <input
                      className='mdc-radio__native-control'
                      onChange={(event) => this.onChange('resourceTypeFilter', event.target.value)}
                      type='radio'
                      name='resourceType'
                      id={`resourceType-${index}`}
                      value={item}
                    />
                    <div className='mdc-radio__background'>
                      <div className='mdc-radio__outer-circle' />
                      <div className='mdc-radio__inner-circle' />
                    </div>
                    <div className='mdc-radio__ripple' />
                  </div>
                  <label htmlFor={`resourceType-${index}`}>{t(item)}</label>
                </div>
              </div>
            )}
          </nav>
        </div>
      </aside>
    )
  }
}

export default withTranslation('translation', { withRef: true })(Aside)
