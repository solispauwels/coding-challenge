import React from 'react'

import Aside from './aside/aside'
import Header from './header/header'
import Reports from './reports/reports'
import Loading from './loading/loading'

import config from './config/config'
import http from './common/http'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.aside = React.createRef()
    this.header = React.createRef()
    this.reports = React.createRef()

    this.state = { loading: true }

    this.loadData()
  }

  onChange (filter, value) {
    this.reports.current && this.reports.current.setFilter(filter, value)
  }

  async loadData () {
    this.data = JSON.parse(await http(`${config.backendURL}/reports`, 'get'))

    this.setState({ loading: false })
  }

  render () {
    return [
      <Aside key='aside' ref={this.aside} onChange={(filter, value) => this.onChange(filter, value)} />,
      <div key='scrim' className='mdc-drawer-scrim' />,
      <div key='content' className='mdc-drawer-app-content'>
        <Header ref={this.header} onSelect={(value) => this.onChange('stateFilter', value)} />
        <main className='main-content'>
          <div className='mdc-top-app-bar--fixed-adjust'>
            {this.state.loading && <Loading />}
            {!this.state.loading && <Reports ref={this.reports} data={this.data} />}
          </div>
        </main>
      </div>
    ]
  }
}
