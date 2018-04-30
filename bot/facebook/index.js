'use strict';

const BootBot = require('bootbot');
const config = require('config');
const schedule = require('node-schedule');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = 'http://127.0.0.1:5000/';

var TurndownService = require('turndown');
var turndownService = new TurndownService();

const aboutModule = require('./modules/about');
const spammerModule = require('./modules/spammer');
const dialogflowModule = require('./modules/dialogflow');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret'),
});

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

  var subscription = schedule.scheduleJob('*/3 * * * *', function(){

    var postsURL = url + 'getUserSubs/' + userid;;
    var xmlHTTPPost = new XMLHttpRequest();

    xmlHTTPPost.open('GET', postsURL, true);
    xmlHTTPPost.send();
    xmlHTTPPost.onreadystatechange = processRequest;
    function processRequest(e) {

      if (xmlHTTPPost.readyState == 4 && xmlHTTPPost.status == 200) {

        var posts = JSON.parse(xmlHTTPPost.responseText);
        console.log(posts)

        for (var i=0; i<posts["posts"].length; i++){
            var markdown = turndownService.turndown(posts["posts"][i])
            chat.say(markdown);
        }
      }
    }
  });

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
