'use strict'

const config = {
  appName: 'thought-bot-oss',
  version: '0.5.9',
  prettyPrint: true,
  chatServer: {
    uri: '/api/messages'
  },
  thoughtResources: {
    dictionary: {
      urlPrefix: 'http://api.wordnik.com:80/v4/word.json/',
      urlPostfix: '/definitions?limit=3&includeRelated=false&sourceDictionaries=ahd&useCanonical=true&includeTags=false&api_key='
    },
    thesaurus: {
      urlPrefix: 'http://api.wordnik.com:80/v4/word.json/',
      urlPostfix: '/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=10&api_key='
    },
    quote: {
      urlPrefix: 'https://andruxnet-random-famous-quotes.p.mashape.com/?',
      urlPostfix: 'cat=%s&count=3'
    }
  },
  dialog: {
    hello: 'Hello! I\'m thought bot.<br/>I can help your thoughts by assisting with various supporting activities.<br/>Type \'help\' to learn what I can do.',
    help: 'I can assist with the following: <br/>"define [word]" <br/>"research [word or phrase]" <br/>"synonym [word]" <br/>"quote [movies,famous]',
    youAreWelcome: 'You are very welcome!'
  }
}

module.exports = config
