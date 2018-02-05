'use strict'
const rp = require('request-promise')

class Wordnik {
  constructor (urlPrefix, urlPostfix) {
    this.urlPrefix = urlPrefix
    this.urlPostfix = urlPostfix
    this.apiKey = process.env.WORDNIK_API_KEY
  }
  lookup (word, callback, callbackError) {
    var options = {
      url: this.urlPrefix + word + this.urlPostfix + this.apiKey,
      method: 'GET'
    }
    rp(options)
      .then(callback)
      .catch(callbackError)
  }
}

module.exports = Wordnik
