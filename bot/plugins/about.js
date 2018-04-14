'use strict';

module.exports =  {

  id: 'about',
  defaultConfig: {
    messageTypes: ['text'],
  },

  plugin(bot, pluginConfig) {

    bot.on('text', (msg) => {

      let message = 'This bot was developed as part of the Software Engineering class. ' +
      'It has the purpose of helping students access Student Portal more efficiently. ' +
      'Please type "/commands" or "commands" to see what type of information is available.';

       if (msg.text.toLowerCase() == 'about' || msg.text.toLowerCase() == '/about'){
          return bot.sendMessage(msg.from.id, message);
        };

    });
  }
};
