'use strict';

const config = require('config');
const TeleBot = require('telebot');

const bot = new TeleBot({
  token: config.get('access_token'),
  usePlugins: ['about', 'spammer', 'dialogflow', 'categories', 'ask'],
  pluginFolder: '../../../plugins/'
});

bot.on(['/start'], (msg) => {

  let replyMarkup = bot.keyboard([
      ['/about', '/menu', '/categories'],
  ], {resize: true});

  return bot.sendMessage(msg.from.id, 'Welcome to the NYUAD Spammer Bot', {replyMarkup});
});

bot.start();
