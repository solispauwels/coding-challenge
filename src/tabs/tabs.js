import React from 'react'
import { withTranslation } from 'react-i18next'

import './tabs.scss'

class Tabs extends React.Component {
  constructor (props) {
    super(props)

    this.state = { active: 0 }
  }

  componentDidMount () {
    this.select(0)
  }

  select (index) {
    this.setState({ active: index })
    this.props.onSelect && this.props.onSelect(this.props.items[index])
  }

  render () {
    const { t, items } = this.props
    return (
      <div className='mdc-tab-bar' role='tablist'>
        <div className='mdc-tab-scroller'>
          <div className='mdc-tab-scroller__scroll-area'>
            <div className='mdc-tab-scroller__scroll-content'>
              {items.map((item, index) =>
                <button
                  onClick={() => this.select(index)}
                  className={this.state.active === index ? 'mdc-tab mdc-tab--active' : 'mdc-tab '}
                  role='tab'
                  aria-selected='true'
                  key={index}
                >
                  <span className='mdc-tab__content'>
                    <span className='mdc-tab__text-label'>{t(item.name)}</span>
                  </span>
                  <span className={this.state.active === index ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator'}>
                    <span className='mdc-tab-indicator__content mdc-tab-indicator__content--underline' />
                  </span>
                  <span className='mdc-tab__ripple' />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Tabs)
