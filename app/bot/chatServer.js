'use strict'
const restify = require('restify')
const logger = require('../infra/logger')

class ChatServer {
  run (uri, connector, port) {
    var server = restify.createServer()
    server.listen(process.env.port || process.env.PORT || port || 3978, function () {
      logger.info('%s listening to %s', server.name, server.url)
    })
    server.post(uri, connector.listen())
  }
}

module.exports = ChatServer
