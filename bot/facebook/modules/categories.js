'use strict';

module.exports = (bot) => {

  bot.on('postback:MENU_CATEGORIES', (payload, chat) => {

    chat.say("Our current categories are: ");


    // chat.say(message).then(() => { chat.say('Enjoy, and have an awesome day.', { typing: true }); });

  });
};
