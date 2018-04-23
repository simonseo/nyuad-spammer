'use strict';

module.exports =  {

  id: 'spammer',
  defaultConfig: {
    messageTypes: ['text'],
  },

  plugin(bot, pluginConfig) {

    var categories = ['/athletics', '/studentlife'];

    bot.on('/menu', (msg) => {
      //INLINE BUTTONS
      let replyMarkup = bot.inlineKeyboard([
        [bot.inlineButton('news', {callback: 'news'})],
        [bot.inlineButton('subscribe', {callback: 'subscriptions'})],
        [bot.inlineButton('unsubscribe', {callback: 'unsubscriptions'})]
      ]);
      return bot.sendMessage(msg.from.id, 'Select your option', {replyMarkup});
    });


    bot.on('callbackQuery', (msg) => {
      //NEWS
      if (msg.data == 'news'){
        return bot.sendMessage(msg.from.id, 'We don\'t have any announcements yet.');
      }
      //SUBSCRIPTIONS
      if (msg.data == 'subscriptions'){
        return bot.sendMessage(msg.from.id, 'Type the category you wish to subscribe to', {ask: 'sub_category'});
      }
      //UNSUBSCRIPTIONS
      if (msg.data == 'unsubscriptions'){
        return bot.sendMessage(msg.from.id, 'Type the category you wish to unsubscribe from', {ask: 'unsub_category'});
      }
    });

    bot.on('ask.sub_category', (msg) => {
      if (categories.indexOf(msg.text) >= 0){
        return bot.sendMessage(msg.from.id, 'You are now subscribed to ' + msg.text);
      } else {
        return bot.sendMessage(msg.from.id, 'We don\'t have that category. Sorry!');
      }
    });

    bot.on('ask.unsub_category', (msg) => {
      if (categories.indexOf(msg.text) >= 0){
        return bot.sendMessage(msg.from.id, 'You are now unsubscribed from ' + msg.text);
      } else {
        return bot.sendMessage(msg.from.id, 'We don\'t have that category. Sorry!');
      }
    });

  }
};
