'use strict';

module.exports = (bot) => {

  bot.on('postback:MENU_CATEGORIES', (payload, chat) => {

    chat.say("Our current categories are: ", { typing: true });


  });

};
