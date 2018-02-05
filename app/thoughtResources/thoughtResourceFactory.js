'use strict'

const ThoughtResourceFactory = {
  constructDictionary (config) {
    var Wordnik = require('./wordnik')
    var dictionary = new Wordnik(config.thoughtResources.dictionary.urlPrefix, config.thoughtResources.dictionary.urlPostfix)
    return dictionary
  },
  constructEncyclopedia (config) {
    var Wikipedia = require('./wikipedia')
    var encyclopedia = new Wikipedia()
    return encyclopedia
  },
  constructThesaurus (config) {
    var Wordnik = require('./wordnik')
    var thesaurus = new Wordnik(config.thoughtResources.thesaurus.urlPrefix, config.thoughtResources.thesaurus.urlPostfix)
    return thesaurus
  },
  constructQuote (config) {
    var Quote = require('./quote')
    var quote = new Quote(config.thoughtResources.quote.urlPrefix, config.thoughtResources.quote.urlPostfix)
    return quote
  }
}

module.exports = ThoughtResourceFactory
