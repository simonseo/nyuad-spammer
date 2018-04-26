'use strict';

const BootBot = require('bootbot');
const config = require('config');

const spammerModule = require('./modules/spammer');
const dialogflowModule = require('./modules/dialogflow');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret'),
});

bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile()
  .then((user) => {
    chat.say(`Hello, ${user.first_name}! I am the NYUAD Spammer Bot. I am here to help you access Student Portal quickly and efficiently.`)
    .then(() => {
      chat.say('To subscribe to notifications, or unsubscribe from them, just click the buttons from the menu.', { typing: true });
    });
  });
});

bot.setPersistentMenu([
  {
    title: 'Updates',
    type: 'postback',
    payload: 'MENU_UPDATES'
  },
  {
    title: 'Subscribe',
    type: 'postback',
    payload: 'MENU_SUBSCRIBE'
  },
  {
    title: 'Unsubscribe',
    type: 'postback',
    payload: 'MENU_UNSUBSCRIBE'
  }
]);

bot.module(spammerModule);
bot.module(dialogflowModule);

bot.start(process.env.PORT || 3000);
