'use strict'
const rp = require('request-promise')
const util = require('util')

class Quote {
  constructor (urlPrefix, urlPostfix) {
    this.urlPrefix = urlPrefix
    this.urlPostfix = urlPostfix
    this.apiKey = process.env.QUOTE_API_KEY
  }
  lookup (word, callback, callbackError) {
    var options = {
      url: this.urlPrefix + util.format(this.urlPostfix, word),
      method: 'GET',
      headers: {
        'X-Mashape-Key': this.apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    rp(options)
      .then(callback)
      .catch(callbackError)
  }
}

module.exports = Quote
