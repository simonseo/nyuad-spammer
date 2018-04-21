'use strict';

const BootBot = require('bootbot');
const config = require('config');

const categoriesModule = require('./modules/categories');
const spammerModule = require('./modules/spammer');
const dialogflowModule = require('./modules/dialogflow');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret'),
});

bot.module(categoriesModule);
bot.module(spammerModule);
bot.module(dialogflowModule);

bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile()
  .then((user) => {
    chat.say(`Hello, ${user.first_name}! I am the NYUAD Spammer Bot. I am here to help you access Student Portal quickly and efficiently.`)
    .then(() => {
      chat.say('To view our categories, subscribe to notifications, or unsubscribe from them, just click the buttons from the menu.', { typing: true });
    });
  });
});

bot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Categories',
    payload: 'MENU_CATEGORIES'
  },
  {
    type: 'postback',
    title: 'Subscribe',
    payload: 'MENU_SUBSCRIBE'
  },
  {
    type: 'postback',
    title: 'Unsubscribe',
    payload: 'MENU_UNSUBSCRIBE'
  }
]);

bot.start(process.env.PORT || 3000);
