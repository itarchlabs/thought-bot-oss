# Thought Bot - Open Source Software

![thought-bot-avatar](./pics/thought-bot-avatar-64.png)

## Builds

|  Branch |                                                     Build                                                     |
|:-------:|:-------------------------------------------------------------------------------------------------------------:|
|  master | [![Build Status](https://travis-ci.com/itarchlabs/thought-bot.svg?token=cXbMVcQUupX5YqgaWxD4&branch=master)](https://travis-ci.com/itarchlabs/thought-bot-oss) |
|  develop | [![Build Status](https://travis-ci.com/itarchlabs/thought-bot.svg?token=cXbMVcQUupX5YqgaWxD4&branch=develop)](https://travis-ci.com/itarchlabs/thought-bot-oss) |

## Application Instructions

### Application Prerequisites

- NPM
- Node JS
- Setup Environment Variables
  - Make a copy of the .env.template file, naming it .env
    - Fill out the .env file with the appropriate IDs and Keys
      - You will need to get a [Wordnik API Key](http://developer.wordnik.com/) for the Dictionary lookups.
      - You will need to get a [Mashape API Key](https://market.mashape.com/explore) for the Quote lookups. Specifically you will need to register to use the following API [Random Famous Quotes](https://market.mashape.com/andruxnet/random-famous-quotes).
      - You will need to register a bot with the [Microsoft Bot Framework](https://dev.botframework.com/) to get the BOT App ID and Password.
    - This file is used by the Node JS app to simulate environment variables when developing, running and testing locally. It uses the [dotenv](https://github.com/motdotla/dotenv) NPM package to seamlessly switch between the .env file and using exported env vars.
    - **NOTE: You will need to configure and pass the environment variables outlined in the .env.template to the docker container when running in production.**

### NPM Dependencies

- [botbuilder](https://github.com/Microsoft/BotBuilder)
- [dotenv](https://github.com/motdotla/dotenv)
- [pino](http://getpino.io/)
- [restify](http://restify.com/)
- [request](https://github.com/request/request)
- [request-promise](https://github.com/request/request-promise)
- [wikijs](https://github.com/dijs/wiki)
- [standard](https://github.com/standard/standard) - Javascript Standard style. This is used during testing to verify that all the rules are followed.

### Build

```sh
npm i
npm test
```

### Run

```sh
npm start
```

---

## Docker Instructions

### Docker Prerequisites

- Docker
- Set the environment variable CONTAINER_REGISTRY of the registry where you would like to push the built container.

### Docker Build

```sh
make build
```

### Docker Push

```sh
make push
```

### Docker Run

```sh
make run
```

## [Thought Bot Architecture](architecture.md)