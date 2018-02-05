'use strict'
const wiki = require('wikijs').default
const logger = require('../infra/logger')
// const fs = require('fs')
class Wikipedia {
  lookup (word, callback, callbackError) {
    var url, mainImage, summary, title
    wiki().page(word).then((page) => {
      url = page.raw.fullurl
      title = page.raw.title
      page.summary()
          .then((summaryResult) => {
            summary = summaryResult
            page.mainImage()
              .then((mainImageResult) => {
                mainImage = mainImageResult
                var result = {
                  title: title,
                  fullurl: url,
                  summary: summary,
                  image: mainImage
                }
                callback(result)
              })
              .catch((error) => {
                logger.error(error)
                callbackError(error)
              })
          })
          .catch((error) => {
            logger.error(error)
            callbackError(error)
          })
    })
      .catch((error) => {
        logger.error(error)
        callbackError(error)
      })
  }
}

module.exports = Wikipedia
