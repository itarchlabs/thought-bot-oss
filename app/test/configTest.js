/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
'use strict'

const expect = require('chai').expect

describe('App Configuration', function () {
  it('config returns app name', function () {
    var config = require('../infra/config')
    expect(config.appName).to.equal('thought-bot-oss')
  })
  it('config returns dialog', () => {
    var config = require('../infra/config')
    expect(config.dialog).to.not.be.null
  })
  it('config returns thoughtResources', () => {
    var config = require('../infra/config')
    expect(config.thoughtResources).to.not.be.null
  })
})
