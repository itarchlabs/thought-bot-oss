'use strict'
const logger = require('../infra/logger')
const config = require('../infra/config')
const builder = require('botbuilder')
const ThoughtResourceFactory = require('../thoughtResources/thoughtResourceFactory')

var regExHelp = new builder.RegExpRecognizer('help', /^(help|Help)/i)
var regExThanks = new builder.RegExpRecognizer('thanks', /^(thanks|Thanks|thank-you|Thank-you|thankyou|Thankyou)/i)
var regExVersion = new builder.RegExpRecognizer('version', /^(version|Version)/i)
var regExDefine = new builder.RegExpRecognizer('define', /^(define|definition|Define|Definition)/i)
var regExResearch = new builder.RegExpRecognizer('research', /^(research|Research)/i)
var regExSynonym = new builder.RegExpRecognizer('synonym', /^(synonym|Synonym)/i)
var regExQuote = new builder.RegExpRecognizer('quote', /^(quote|Quote)/i)

module.exports = new builder.IntentDialog(
  {
    recognizers: [regExHelp, regExThanks, regExVersion, regExDefine, regExResearch, regExSynonym, regExQuote]
  })
  .matches('help', helpDialog)
  .matches('thanks', thanksDialog)
  .matches('version', versionDialog)
  .matches('define', dictionaryDialog)
  .matches('research', encyclopediaDialog)
  .matches('synonym', thesaurusDialog)
  .matches('quote', quoteDialog)
  .onDefault(unknown)

function helpDialog (session) {
  logger.info('bot.dialog.help()')
  session.endDialog(config.dialog.help)
}

function thanksDialog (session) {
  logger.info('bot.dialog.you are welcome()')
  session.endDialog(config.dialog.youAreWelcome)
}

function versionDialog (session) {
  logger.info('bot.dialog.version()')
  session.endDialog('%s running in %s v%s', config.appName, process.env.NODE_ENV, config.version)
}

function dictionaryDialog (session) {
  logger.info('bot.dialog.dictionary()')
  var match = session.message.text.toLocaleLowerCase().match(/define(.*)/)
  if (match == null) {
    match = session.message.text.toLocaleLowerCase().match(/definition(.*)/)
  }
  var word = match[1].trim()
  session.send('Going to lookup "%s" in the dictionary', word)

  var dictionary = ThoughtResourceFactory.constructDictionary(config)
  dictionary.lookup(word, function (response) {
    var result = JSON.parse(response)
    var definitionCards = []
    var i = 0
    result.forEach(function (element) {
      definitionCards[i] = new builder.HeroCard(session)
            .title(element.word.toLocaleLowerCase())
            .subtitle(element.partOfSpeech + ' ' + element.attributionText.toLocaleLowerCase())
            .text(element.text)
      i++
    })
    if (definitionCards.length === 0) {
      session.send("Didn't find any definitions for \"%s\"", word).endDialog()
      return
    }
    var msg = new builder.Message(session)
    msg.attachmentLayout(builder.AttachmentLayout.list)
    msg.attachments(definitionCards)
    session.send(msg).endDialog()
  },
  function (error) {
    logger.error(error, 'error calling the API')
    session.send('Oops! There was a problem, please try a different assistance request.').endDialog()
  })
}

function encyclopediaDialog (session) {
  logger.info('bot.dialog.encyclopedia()')
  var match = session.message.text.toLocaleLowerCase().match(/research(.*)/)
  var word = match[1].trim()
  session.send('Going to lookup "%s" in the encyclopedia', word)

  var encyclopedia = ThoughtResourceFactory.constructEncyclopedia(config)
  encyclopedia.lookup(word,
        function (response) {
          var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.list)
            .textFormat(builder.TextFormat.plain)
            .attachments([
              new builder.HeroCard(session)
              .title(response.title)
              .subtitle('wikipedia')
              .images([builder.CardImage.create(session, response.image)])
              .text(response.summary)
              .buttons([
                builder.CardAction.openUrl(session, response.fullurl, 'open web page')
              ])
            ])
          session.send(msg).endDialog()
        },
        function (error) {
          logger.error(error, 'error calling the API')
          session.send('Oops! There was a problem, please try a different assistance request.').endDialog()
        })
}

function thesaurusDialog (session) {
  logger.info('bot.dialog.thesaurus()')
  var match = session.message.text.toLocaleLowerCase().match(/synonym(.*)/)
  var word = match[1].trim()
  session.send('Going to lookup "%s" in the thesaurus', word)

  var thesaurus = ThoughtResourceFactory.constructThesaurus(config)
  thesaurus.lookup(word, function (response) {
    var result = JSON.parse(response)
    var cards = []
    var i = 0
    result.forEach(function (element) {
      cards[i] = new builder.HeroCard(session)
          .title(word.toLocaleLowerCase())
          .subtitle(element.relationshipType)
          .text(element.words.join(' | '))
      i++
    })
    if (cards.length === 0) {
      session.send("Didn't find any synonyms for \"%s\"", word).endDialog()
      return
    }
    var msg = new builder.Message(session)
    msg.attachmentLayout(builder.AttachmentLayout.list)
    msg.attachments(cards)
    session.send(msg).endDialog()
  },
  function (error) {
    logger.error(error, 'error calling the API')
    session.send('Oops! There was a problem, please try a different assistance request.').endDialog()
  })
}

function quoteDialog (session) {
  logger.info('bot.dialog.quote()')
  var match = session.message.text.toLocaleLowerCase().match(/quote(.*)/)
  var word = match[1].trim()
  if (word.toLocaleLowerCase() !== 'movies' && word.toLocaleLowerCase() !== 'famous') {
    session.send('I only support "movies and famous" quotes, I\'ll grab a few for you', word)
  } else {
    session.send('Going to lookup "%s" quotes', word)
  }
  var quote = ThoughtResourceFactory.constructQuote(config)
  quote.lookup(word, function (response) {
    var result = JSON.parse(response)
    var cards = []
    var i = 0
    logger.debug(result)
    if (result.size) {
      result.forEach(function (element) {
        cards[i] = new builder.ThumbnailCard(session)
            .title(element.category.toLocaleLowerCase() + ' quote')
            .text(element.author)
            .subtitle('"%s"', element.quote.toLocaleLowerCase())
        i++
      })
    } else {
      cards[i] = new builder.ThumbnailCard(session)
          .title(result.category.toLocaleLowerCase() + ' quote')
          .text(result.author)
          .subtitle('"%s"', result.quote.toLocaleLowerCase())
      i++
    }
    if (cards.length === 0) {
      session.send("Didn't find any quotes for \"%s\"", word).endDialog()
      return
    }
    var msg = new builder.Message(session)
    msg.attachmentLayout(builder.AttachmentLayout.list)
    msg.attachments(cards)
    session.send(msg).endDialog()
  },
  function (error) {
    logger.error(error, 'error calling the API')
    session.send('Oops! There was a problem, please try a different assistance request.').endDialog()
  })
}

function unknown (session) {
  logger.info('bot.dialog.default()')
  session.send(config.dialog.hello)
}
