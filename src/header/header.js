import React from 'react'

import './header.scss'

import config from '../config/config'

import Tabs from '../tabs/tabs'

export default class Header extends React.Component {
  onSelect (item) {
    this.props.onSelect && this.props.onSelect(item.name)
  }

  render () {
    return (
      <header className='mdc-top-app-bar mdc-elevation--z1'>
        <div className='mdc-top-app-bar__row'>
          <section className='mdc-top-app-bar__section mdc-top-app-bar__section--align-start'>
            <span className='material-icons mdc-top-app-bar__navigation-icon'>menu</span>
            <Tabs key='states' items={config.state} onSelect={(item) => this.onSelect(item)} />
          </section>
        </div>
      </header>
    )
  }
}
