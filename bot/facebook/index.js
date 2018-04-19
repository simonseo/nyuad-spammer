'use strict';

const BootBot = require('bootbot');
const config = require('config');

const aboutModule = require('./modules/about');
const dialogflowModule = require('./modules/dialogflow');
// const spammerModule = require('./modules/spammer');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret'),
});

bot.module(aboutModule);
// bot.module(spammerModule);

bot.hear(['hello', 'hi', 'hey'], (payload, chat) => {
  chat.getUserProfile().then((user) => {
    chat.say(`Hello, ${user.first_name}!`).then(() => {
      chat.say('Welcome to the NYUAD Spammer Bot', { typing: true });
    });
  });
});

bot.module(dialogflowModule);

bot.start(process.env.PORT || 3000);
