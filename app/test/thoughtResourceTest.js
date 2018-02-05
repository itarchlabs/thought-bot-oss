/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict'

const expect = require('chai').expect
const ThoughtResourceFactory = require('../thoughtResources/thoughtResourceFactory')
const Wordnik = require('../thoughtResources/wordnik')
const Wikipedia = require('../thoughtResources/wikipedia')
const Quote = require('../thoughtResources/quote')
var rp = require('request-promise')
var sinon = require('sinon')
const config = require('../infra/config')
const fs = require('fs')

describe('Thought Resource', function () {
  var sandbox
  var rpStub
  before(function () {
    sandbox = sinon.createSandbox()
    rpStub = sandbox.stub(rp, 'Request')
  })

  it('factory constructs dictionary resource', function () {
    var dictionary = ThoughtResourceFactory.constructDictionary(config)
    expect(dictionary).to.not.be.null
    expect(dictionary).to.be.an.instanceof(Wordnik)
  })
  it('factory constructs encyclopedia resource', function () {
    var encyclopedia = ThoughtResourceFactory.constructEncyclopedia(config)
    expect(encyclopedia).to.not.be.null
    expect(encyclopedia).to.be.an.instanceof(Wikipedia)
  })
  it('factory constructs thesaurus resource', function () {
    var thesaurus = ThoughtResourceFactory.constructThesaurus(config)
    expect(thesaurus).to.not.be.null
    expect(thesaurus).to.be.an.instanceof(Wordnik)
  })
  it('factory constructs quote resource', function () {
    var quote = ThoughtResourceFactory.constructQuote(config)
    expect(quote).to.not.be.null
    expect(quote).to.be.an.instanceof(Quote)
  })
  it('dictionary lookup works', function () {
    var stubResponse = fs.readFileSync('./test/define_dog_response.json', 'utf8')
    rpStub.resolves(stubResponse)
    var dictionary = ThoughtResourceFactory.constructDictionary(config)
    dictionary.lookup('dog', function (response) {
      expect(response).to.equal(stubResponse)
    })
  })
  it('encyclopedia lookup works', function () {
    var stubResponse = fs.readFileSync('./test/research_dog_response.txt', 'utf8')
    rpStub.resolves(stubResponse)
    var encyclopedia = ThoughtResourceFactory.constructEncyclopedia(config)
    encyclopedia.lookup('dog', function (response) {
      expect(response).to.equal(stubResponse)
    })
  })
  it('thesaurus lookup works', function () {
    var stubResponse = fs.readFileSync('./test/thesaurus_witch_response.json', 'utf8')
    rpStub.resolves(stubResponse)
    var thesaurus = ThoughtResourceFactory.constructThesaurus(config)
    thesaurus.lookup('witch', function (response) {
      expect(response).to.equal(stubResponse)
    })
  })
  it('quote lookup works', function () {
    var stubResponse = fs.readFileSync('./test/quote_famous_response.json', 'utf8')
    rpStub.resolves(stubResponse)
    var quote = ThoughtResourceFactory.constructQuote(config)
    quote.lookup('witch', function (response) {
      expect(response).to.equal(stubResponse)
    })
  })

  after(function () {
    rp.Request.restore()
  })
})
