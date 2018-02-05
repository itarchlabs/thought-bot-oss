'use strict'
const envalid = require('envalid')
const { str } = envalid
const config = require('./infra/config')
const logger = require('./infra/logger')
const ThoughtBot = require('./bot/thoughtBot')

const env = envalid.cleanEnv(process.env, {
  NODE_ENV: str(),
  LOG_LEVEL: str(),
  WORDNIK_API_KEY: str(),
  MICROSOFT_BOT_APP_ID: str(),
  MICROSOFT_BOT_APP_PASSWORD: str(),
  QUOTE_API_KEY: str()
})

if (!env.isProd) {
  require('dotenv').config()
}

logger.info('%s running in %s v%s', config.appName, process.env.NODE_ENV, config.version)
var thoughtBot = new ThoughtBot(config)
thoughtBot.initialize()
thoughtBot.runServer()
