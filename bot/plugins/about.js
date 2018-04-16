'use strict';

module.exports =  {

  id: 'about',
  defaultConfig: {
    messageTypes: ['text'],
  },

  plugin(bot, pluginConfig) {

    bot.on('/about', (msg) => {

      let parseMode = 'html';
      let message = `Hello, ${ msg.from.first_name },` + '\n\n' +
      'I see you have finally decided to try me out. Let me tell you that you have ' +
      'made the right decision!' + '\n\n' +
      '<b>About</b>' + '\n' +
      'With me, you will always be the first one at NYUAD to be informed of ' +
      'upcoming deadlines, current events, modified dining hall hours, new ticket ' +
      'sales, and much more.' + '\n\n' +
      '<b>Announcements and Subscriptions</b>' + '\n' +
      'If you wish to read about current announcements or subscribe to notifications, ' +
      'simply go to our menu by typing: /menu ' + '\n' +
      'Select your desired option and then type the name of a Student Portal ' +
      'category: /studentlife' + '\n\n' +
      '<b>Categories</b>' + '\n' +
      'To view the list of available Student Portal categories I currently have, ' +
      'please type: /categories.' + '\n\n' +
      'Enjoy!';

      return bot.sendMessage(msg.from.id, message, {parseMode});

    });
  }
};
