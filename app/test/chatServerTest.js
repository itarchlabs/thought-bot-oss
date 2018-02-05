/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict'

const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')

const builder = require('botbuilder')
const ChatServer = require('../bot/chatServer')

chai.use(chaiHttp)

describe('Bot Chat Server', () => {
  it('server is listening', (done) => {
    var connector = new builder.ChatConnector({
      appId: '12345678-1234-1234-1234-123456789012',
      appPassword: 'password'
    })
    var server = new ChatServer()
    server.run('/api/messages', connector, 3980)
    chai.request('http://localhost:3980')
    .get('/api/messages')
    .end(function (error, response) {
      expect(error).to.be.not.null
      expect(response).to.have.status(405)
      done()
    })
  })
})
