'use strict';

module.exports =  {

  id: 'categories',
  defaultConfig: {
    messageTypes: ['text'],
  },

  plugin(bot, pluginConfig) {

    bot.on('/categories', (msg) => {

      let parseMode = 'html';
      let list = '\n' + '/athletics' + '\n' + '/studentlife';

      return bot.sendMessage(
        msg.from.id, 'Our <b>current</b> categories are: ' + list, {parseMode}
      );

    });
  }
};
