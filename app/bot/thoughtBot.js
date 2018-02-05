'use strict'
const logger = require('../infra/logger')
const ChatServer = require('./chatServer')
const dialog = require('./dialog')
const builder = require('botbuilder')

class ThoughtBot {
  constructor (config, connector) {
    logger.trace('ThoughtBot.constructor(config, connector)')
    this.connector = connector || new builder.ChatConnector({
      appId: process.env.MICROSOFT_BOT_APP_ID,
      appPassword: process.env.MICROSOFT_BOT_APP_PASSWORD
    })
    this.config = config
  }
  initialize () {
    logger.trace('ThoughtBot.initialize()')
    var self = this
    var bot = new builder.UniversalBot(self.connector)
    bot.use({
      receive: function (event, next) {
        logger.debug('bot.receive, message: %s, user: %s', event.text, event.address.user.name)
        logger.trace(event)
        next()
      },
      send: function (event, next) {
        if (event.attachments) {
          logger.debug(event.attachments, 'bot.send, message: SEE_ATTACHMENTS, user: %s', event.address.user.name)
        } else {
          logger.debug('bot.send, message: %s, user: %s', event.text, event.address.user.name)
        }
        logger.trace(event)
        next()
      }
    })
    bot.dialog('/', dialog)
    return bot
  }
  runServer () {
    logger.trace('ThoughtBot.runServer()')
    var self = this
    var server = new ChatServer()
    server.run(self.config.chatServer.uri, self.connector)
  }
}

module.exports = ThoughtBot
