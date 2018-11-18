'use strict';

const BootBot = require('bootbot');
const config = require('config');
const schedule = require('node-schedule');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = 'http://127.0.0.1:5000/';


const aboutModule = require('./modules/about');
const spammerModule = require('./modules/spammer');
const dialogflowModule = require('./modules/dialogflow');
const getUserSubs = require('./modules/getUserSubs');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret'),
});

(function scheduleExistingUsers() {
  // When the chatbot server starts, re-subscribe existing users
  var getUsersURL = url + 'getUsers';
  var xmlHTTPUser = new XMLHttpRequest();
  xmlHTTPUser.open('GET', getUsersURL, true);
  xmlHTTPUser.send();
  xmlHTTPUser.onreadystatechange = processRequest;
  function processRequest(e) {
    if (xmlHTTPUser.readyState == 4 && xmlHTTPUser.status == 200) {
      var users = JSON.parse(xmlHTTPUser.responseText);
      console.log("Current subscribed users' ids are:", users);

      for (var i=0; i<users["users"].length; i++){
        var userid = users["users"][i];
        schedule.scheduleJob('*/1 * * * *', getUserSubs(userid));
      }
    }
  }
})();

bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile()
  .then((user) => {
    chat.say(`Hello, ${user.first_name}! I am the NYUAD Spammer Bot. I am here to help you access Student Portal quickly and efficiently.`)
    .then(() => {
      chat.say('To view the latest updates, subscribe to notifications, or unsubscribe from them, just click the buttons from the menu.', { typing: true });
    });
  });

  const userid = payload.sender.id;
  var getUserURL = url + 'addUser/' + userid;
  var xmlHTTPUser = new XMLHttpRequest();
  xmlHTTPUser.open('GET', getUserURL, true);
  xmlHTTPUser.send();
  xmlHTTPUser.onreadystatechange = processRequest;
  function processRequest(e) {
    if (xmlHTTPUser.readyState == 4 && xmlHTTPUser.status == 200) {
        console.log(xmlHTTPUser.responseText);
    }
  }
  var subscription = schedule.scheduleJob('*/1 * * * *', getUserSubs(userid)); // schedule the user to be notified every minute with new announcements
});

bot.setPersistentMenu([
  {
    title: 'About',
    type: 'postback',
    payload: 'MENU_ABOUT'
  },
  {
    title: 'Subscribe',
    type: 'postback',
    payload: 'MENU_SUBSCRIPTION'
  },
  {
    title: 'Unsubscribe',
    type: 'postback',
    payload: 'MENU_UNSUBSCRIPTION'
  }
]);

bot.module(aboutModule);
bot.module(spammerModule);
bot.module(dialogflowModule);

bot.start(process.env.PORT || 3000);
