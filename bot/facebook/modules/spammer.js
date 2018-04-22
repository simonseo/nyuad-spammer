'use strict';

const config = require('config');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const SECRET = config.get('secret');

module.exports = (bot) => {

  const tokens = new Map();

  const generateToken = (userID) => {
    if (tokens.has(userID)){
      return;
    }
    const token = jwt.sign(userID, SECRET);
    tokens.set(userID, { token: token });
  };

  const doNothing = (convo) => {
		return;
	};

  const subscribeToCategory = (convo) => {

    convo.ask(doNothing, (payload, chat) => {
      const userCategory = payload.message.text;

      if (userCategory == "studentlife"){
        convo.set('userCategory', userCategory);

        generateToken(convo.get('userID'));

        const userID = convo.get('userID');
        const token = tokens.get(userID).token;
        const config = { headers: { 'x-access-token': token } };
        const category = convo.get('userCategory');

        console.log(JSON.stringify(category));

        //save user and category in server

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
      const userCategory = payload.message.text;

      if (userCategory == "studentlife"){
        convo.set('userCategory', userCategory);

        generateToken(userID);

        //remove the category from the token list

        return;
      }
      else {
        convo.say("This category is not found in Student Portal. Click the unsubscribe button to try again!", { typing: true });
        convo.end();
      }

    });
  };

  bot.on('postback:MENU_SUBSCRIBE', (payload, chat) => {
    const userID = payload.sender.id;

    chat.conversation((convo) => {
      convo.set('userID', userID);

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
    const userID = payload.sender.id;

    chat.conversation((convo) => {
      convo.set('userID', userID);

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
