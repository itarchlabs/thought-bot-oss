const pino = require('pino')
const config = require('./config')

const logger = pino({
  name: config.appName,
  prettyPrint: config.prettyPrint,
  safe: true,
  level: process.env.LOG_LEVEL || 'info'
},
process.stdout)

module.exports = logger
