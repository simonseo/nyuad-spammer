///////////////////////////////////////
/////////////   ABOUT   ///////////////
///////////////////////////////////////

'use strict';

module.exports = (bot) => {

  bot.on('postback:MENU_ABOUT', (payload, chat) => {
    chat.getUserProfile()
    .then((user) => {
      chat.say(`Hey, ${user.first_name}! I know that accessing Student Portal can sometimes be a little bit annoying. With me, that will quickly go away!`, { typing:true })
      .then(() => {
        chat.say('Simply click the button from the menu to subscribe to get notifications from Student Portal.', { typing:true });
      });
    });
  });

}
