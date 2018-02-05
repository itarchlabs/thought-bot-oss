/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict'

const expect = require('chai').expect
const builder = require('botbuilder')
const config = require('../infra/config')
const ThoughtBot = require('../bot/thoughtBot')
const fs = require('fs')
var sinon = require('sinon')
var rp = require('request-promise')

describe('Bot', () => {
  var sandbox
  var rpStub
  before(function () {
    sandbox = sinon.createSandbox()
    rpStub = sandbox.stub(rp, 'Request')
  })

  it('should say help text', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.help)
      done()
    })
    connector.processMessage('help')
  })
  it('should say help text 2', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.help)
      done()
    })
    connector.processMessage('Help')
  })
  it('should say hello text', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.hello)
      done()
    })
    connector.processMessage('hello')
  })
  it('should say hello text 2', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.hello)
      done()
    })
    connector.processMessage('Hello')
  })
  it('should say you are welcome text', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.youAreWelcome)
      done()
    })
    connector.processMessage('thanks')
  })
  it('should say you are welcome text', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.youAreWelcome)
      done()
    })
    connector.processMessage('thankyou')
  })
  it('should say you are welcome text', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.dialog.youAreWelcome)
      done()
    })
    connector.processMessage('thank-you')
  })
  it('should say version text', function (done) {
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()

    bot.on('send', function (message) {
      expect(message.text).to.equal(config.appName + ' running in ' + process.env.NODE_ENV + ' v' + config.version)
      done()
    })
    connector.processMessage('version')
  })
  it('should say the definitions of dog', function (done) {
    var stubResponse = fs.readFileSync('./test/define_dog_response.json', 'utf8')
    rpStub.resolves(stubResponse)

    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()
    var iter = 1
    bot.on('send', function (message) {
      if (iter === 1) {
        expect(message.text).to.equal('Going to lookup "dog" in the dictionary')
      }
      if (iter === 2) {
        expect(message.attachmentLayout).to.equal(builder.AttachmentLayout.list)
        expect(message.attachments.length).to.equal(3)
        done()
      }
      iter++
    })
    connector.processMessage('define dog')
  })
  it('should say the research results of dog', function (done) {
    // TODO: Get the wiki calls stubbed out
    // var stubResponse = fs.readFileSync('./test/research_dog_response.txt', 'utf8')
    // wikipedia.lookup = function () {}
    // var wikiStub = sandbox.stub(wikipedia, 'lookup')
    // wikiStub.resolves(stubResponse)
    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()
    var iter = 1
    bot.on('send', function (message) {
      if (iter === 1) {
        expect(message.text).to.equal('Going to lookup "dog" in the encyclopedia')
      }
      if (iter === 2) {
        expect(message.attachmentLayout).to.equal(builder.AttachmentLayout.list)
        expect(message.attachments.length).to.equal(1)
        done()
      }
      iter++
    })
    connector.processMessage('research dog')
  })
  it('should say the synonyms of witch', function (done) {
    var stubResponse = fs.readFileSync('./test/thesaurus_witch_response.json', 'utf8')
    rpStub.resolves(stubResponse)

    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()
    var iter = 1
    bot.on('send', function (message) {
      if (iter === 1) {
        expect(message.text).to.equal('Going to lookup "witch" in the thesaurus')
      }
      if (iter === 2) {
        expect(message.attachmentLayout).to.equal(builder.AttachmentLayout.list)
        expect(message.attachments.length).to.equal(1)
        done()
      }
      iter++
    })
    connector.processMessage('synonym witch')
  })
  it('should say the quote of famous', function (done) {
    var stubResponse = fs.readFileSync('./test/quote_famous_response.json', 'utf8')
    rpStub.resolves(stubResponse)

    var connector = new builder.ConsoleConnector()
    var thoughtBot = new ThoughtBot(config, connector)
    var bot = thoughtBot.initialize()
    var iter = 1
    bot.on('send', function (message) {
      if (iter === 1) {
        expect(message.text).to.equal('Going to lookup "famous" quotes')
      }
      if (iter === 2) {
        expect(message.attachmentLayout).to.equal(builder.AttachmentLayout.list)
        expect(message.attachments.length).to.equal(1)
        done()
      }
      iter++
    })
    connector.processMessage('quote famous')
  })

  after(function () {
    rp.Request.restore()
  })
})
