'use strict';

const config = require('config');
const TeleBot = require('telebot');

const bot = new TeleBot({
  token: config.get('access_token'),
  usePlugins: ['about', 'dialogflow'],
  pluginFolder: '../../../plugins/'
});

bot.on('text', (msg) => {

  if (msg.text.toLowerCase() == 'start' || msg.text.toLowerCase() == '/start'){
    return bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!`).then(() => {
        bot.sendMessage(msg.from.id, 'Welcome to the NYUAD Spammer Bot');
    });
  }

});

bot.start();
