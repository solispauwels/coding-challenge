const Hapi = require('@hapi/hapi')
const data = require('./data/reports.json')
// const fs = require('fs')

const frontEnd = async () => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost'
  })

  await server.register({
    plugin: require('inert')
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)

  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'build/'
      }
    }
  })
}

const backEnd = async () => {
  const server = Hapi.server({
    port: 3333,
    host: 'localhost',
    routes: { cors: true }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)

  server.route({
    method: 'GET',
    path: '/reports',
    handler: () => data.elements || []
  })

  server.route({
    method: 'GET',
    path: '/reports/{state}',
    handler: ({ params: { state } }) => data.elements.filter(item => item.state.toLowerCase() === state) || []
  })

  server.route({
    method: 'GET',
    path: '/blocked',
    handler: () => data.elements.filter(item => item.state.toLowerCase() === 'blocked').map(item => item.payload.referenceResourceId) || []
  })

  server.route({
    method: 'put',
    path: '/reports/{id}',
    handler: ({ payload, params: { id } }) => {
      const item = data.elements.find(item => item.id === id)
      const ticketState = JSON.parse(payload).ticketState // no time to do it with joi

      if (item && ticketState) {
        item.state = ticketState
      }

      /**
       * This line is commited in order to retrun back to the initial state of the dataata at each hapijs runtime for the DEMO purpose
       * fs.writeFileSync('data/reports.json', JSON.stringify(data, null, 4))
       * */

      return true
    }
  })
}

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit(1)
})

frontEnd()
backEnd()
