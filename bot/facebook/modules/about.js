'use strict';

module.exports = (bot) => {

  bot.on('postback:MENU_FOR_ABOUT', (payload, chat) => {

    let message = 'I see you have finally decided to try me out. Let me tell you ' +
      'that you have made the right decision!' + '\n\n' +
      'About' + '\n' +
      'With me, you will always be the first one at NYUAD to be informed of ' +
      'upcoming deadlines, current events, modified dining hall hours, new ticket ' +
      'sales, and much more.' + '\n\n' +
      'Announcements and Subscriptions' + '\n' +
      'If you wish to read about current announcements or subscribe to notifications, ' +
      'simply go to our menu by typing: /menu ' + '\n' +
      'Select your desired option and then type the name of a Student Portal ' +
      'category: /studentlife' + '\n\n' +
      'Categories' + '\n' +
      'To view the list of available Student Portal categories I currently have, ' +
      'please type: /categories.' + '\n\n';
    
    chat.say(message).then(() => { chat.say('Enjoy, and have an awesome day.', { typing: true }); });
  
  });
};
