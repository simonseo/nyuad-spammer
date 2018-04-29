'use strict';

const dialogflow = require('apiai');
const config = require('config');
const uuid = require('uuid');

module.exports = (bot) => {

	const dialogflowService = dialogflow(config.get('api_token'), {language: 'en', requestSource: "facebook"});
  const sessionIds = new Map();

	function isDefined(obj) {
    if (typeof obj == 'undefined') return false;
    if (!obj) return false;
    return obj !== null;
  }

  bot.on('message', (payload, chat, data) => {

  	const sender = payload.sender.id;
  	const text = payload.message.text;

    if (data.captured) {
      return;
    }

    if (!sessionIds.has(sender)) {
      sessionIds.set(sender, {sessionId: uuid.v4()});
    }

    let dialogflowRequest = dialogflowService.textRequest(text, {
      sessionId: sessionIds.get(sender).sessionId
    });

    dialogflowRequest.on('response', (response) => {
      if (isDefined(response.result) && isDefined(response.result.fulfillment)) {
        let responseText = response.result.fulfillment.speech;

        console.log("APIAI Response: " + JSON.stringify(response.result));

        if(isDefined(responseText)) {
          chat.say(responseText);
        }
        else {
          chat.say("Sorry couldn't understand that.");
        }

      }
    });

    dialogflowRequest.on('error', (error) => console.error(error));
    dialogflowRequest.end();

  });
};
