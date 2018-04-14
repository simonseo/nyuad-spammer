'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const config = require('config');

let helpers = ['/start', '/about', '/categories', '/menu', '/athletics', '/studentlife'];

module.exports = {

  id: 'dialogflow',

  plugin(bot, pluginConfig){

    const apiAiService = apiai(config.get('api_token'), {language: 'en', requestSource: 'telegram'});
    const sessionIds = new Map();

    function isDefined(obj) {
      if (typeof obj == 'undefined') return false;
      if (!obj) return false;
      return obj !== null;
    }

    bot.on('text', (msg) => {

      const sender = msg.from.id;
      const text = msg.text;

      if (helpers.indexOf(text) >= 0) {
        return;
      }

      if (!sessionIds.has(sender)) {
        sessionIds.set(sender, {sessionId: uuid.v4()});
      }

      let apiaiRequest = apiAiService.textRequest(text, {
        sessionId: sessionIds.get(sender).sessionId
      });

      apiaiRequest.on('response', (response) => {
        if (isDefined(response.result) && isDefined(response.result.fulfillment)) {
          let responseText = response.result.fulfillment.speech;

          console.log("APIAI Response: " + JSON.stringify(response.result));

          if(isDefined(responseText)) {
            msg.reply.text(responseText);
          }
          else {
            msg.reply.text("Sorry couldn't understand that.");
          }

        }
      });

      apiaiRequest.on('error', (error) => console.error(error));
      apiaiRequest.end();

    });
  }
};
