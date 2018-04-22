'use strict';

module.exports = (bot) => {

  const doNothing = (convo) => {
		return;
	};

  const addToTable = (convo) => {
    return;
    //add user to table using id and list of categories
  };

  const removeFromTable = (convo) => {
    return
    //remove category from table using user id
  };

  const subscribeToCategory = (convo) => {

    convo.ask(doNothing, (payload, chat) => {
      const userID = payload.sender.id;
      const userCategory = payload.message.text;

      if (userCategory == "studentlife"){
        convo.set('userID', userID);
        convo.set('userCategory', userCategory);

        addToTable(convo);
        return;
      }
      else {
        convo.say("This category is not found in Student Portal. Click the subscribe button to try again!", { typing: true });
        convo.end();
      }

    });
  };

  const unsubscribeToCategory = (convo) => {

    convo.ask(doNothing, (payload, chat) => {
      const userID = payload.sender.id;
      const userCategory = payload.message.text;

      if (userCategory == "studentlife"){
        convo.set('userID', userID);
        convo.set('userCategory', userCategory);

        removeFromTable(convo);
        return;
      }
      else {
        convo.say("This category is not found in Student Portal. Click the unsubscribe button to try again!", { typing: true });
        convo.end();
      }

    });
  };

  bot.on('postback:MENU_SUBSCRIBE', (payload, chat) => {
    chat.conversation((convo) => {

      convo.ask({
        text: 'Do you want to see the categories first?',
        quickReplies: ['Yes', 'No']
      }, (payload, chat) => {

        const answer = payload.message.text;
        if (answer == "Yes"){
          chat.say("The categories are:", { typing: true });
        }

        chat.say('Type the name of the category you wish to be subscribed to', { typing: true });
        subscribeToCategory(convo);

        return;

      });
    });
  });

  bot.on('postback:MENU_UNSUBSCRIBE', (payload, chat) => {
    chat.conversation((convo) => {

      convo.ask({
        text: 'Do you want to see the categories first?',
        quickReplies: ['Yes', 'No']
      }, (payload, chat) => {

        const answer = payload.message.text;
        if (answer == "Yes"){
          chat.say("The categories are:", { typing: true });
        }

        chat.say('Type the name of the category you wish to be unsubscribed from', { typing: true });
        unsubscribeToCategory(convo);

        return;

      });
    });
  });


};
