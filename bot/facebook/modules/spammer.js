'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = 'http://0.0.0.0:5000/';

module.exports = (bot) => {

  const doNothing = (convo) => {
    return;
  }

  ///////////////////////////////////////
  //////////  SUBSCRIPTIONS /////////////
  ///////////////////////////////////////

  const addSubscriptionsToFlask = (convo) => {

    var userid = convo.get('userID');
    var categoryNames = convo.get('categoryNames');
    var params = {"userid":userid,"categoryNames":categoryNames};
    console.log(JSON.stringify(params));

    var getSubscriptionsURL = url + 'addUserSubscription';
    var xmlHTTPSubscription = new XMLHttpRequest();

    xmlHTTPSubscription.open('POST', getSubscriptionsURL, true);
    xmlHTTPSubscription.send(JSON.stringify(params));

    xmlHTTPSubscription.onreadystatechange = processRequest;
    function processRequest(e) {
      if (xmlHTTPSubscription.readyState == 4 && xmlHTTPSubscription.status == 200) {
          console.log(xmlHTTPSubscription.responseText);
          convo.say("Perfect! Your subscriptions have been saved!", { typing:true });
      }
    }

    return;
  }

  const subscriptionCategories = (convo) => {

    var categoriesMessage = 'Academics' + '\n' + 'Intercultural Affairs' + '\n' + 'Events and Activities' + '\n' + 'Student Activities' + '\n' +
    'Dining' + '\n' + 'Community Outreach' + '\n' +'Fitness Center' + '\n' + 'Research' + '\n' + 'Campus Life' + '\n' + 'Athletics' + '\n' +
    'Registrar' + '\n' + 'Community Life' + '\n' + 'Career Development' + '\n' + 'Academic Affairs' + '\n' + 'Spiritual Life' + '\n' +
    'Library' + '\n' + 'Finance' + '\n' + 'Residential Education' + '\n' + 'Global Education' + '\n' + 'Facilities' + '\n' + 'Health and Wellness' + '\n' +
    'Housing' + '\n' + 'Public Safety' + '\n' + 'Transportation' + '\n' + 'First-Year Office';

    convo.say('Our current categories are: ', { typing:true })
    .then(() => {
      convo.say(categoriesMessage);
    });

    convo.say('Type all the names of the categories you wish to be subscribed to separated by commas. (ex. Academics, Facilities, Health and Wellness).', { typing: true })

    convo.ask(doNothing, (payload, convo) => {
      const categoryNames = payload.message.text;
      const updatedCategoryNames = categoryNames.toLowerCase().replace(/\s/g, '');
      convo.set('categoryNames', updatedCategoryNames);

      addSubscriptionsToFlask(convo);
      convo.end();
    });
  };

  bot.on('postback:MENU_SUBSCRIPTION', (payload, chat) => {
    const userID = payload.sender.id;
    chat.conversation((convo) => {
      convo.set('userID', userID);
      subscriptionCategories(convo);
      return;
    });
  });

  ///////////////////////////////////////
  ////////   UNSUBSCRIPTIONS   //////////
  ///////////////////////////////////////

  const removeSubscriptionsFromFlask = (convo) => {

    var userid = convo.get('userID');
    var categoryNames = convo.get('categoryNames');
    var params = {"userid": userid, "categoryNames": categoryNames};
    console.log(JSON.stringify(params));

    var getUnsubscriptionsURL = url + 'unsubscribe';
    var xmlHTTPUnsubscription = new XMLHttpRequest();

    xmlHTTPUnsubscription.open('POST', getUnsubscriptionsURL, true);
    xmlHTTPUnsubscription.send(JSON.stringify(params));

    xmlHTTPUnsubscription.onreadystatechange = processRequest;
    function processRequest(e) {
      if (xmlHTTPUnsubscription.readyState == 4 && xmlHTTPUnsubscription.status == 200) {
          console.log(xmlHTTPUnsubscription.responseText);
          convo.say("Perfect! You have been unsubscribed!", { typing:true });
      }
    }

    return;
  }

  const unsubscriptionCategories = (convo) => {

    var categoriesMessage = 'Academics' + '\n' + 'Intercultural Affairs' + '\n' + 'Events and Activities' + '\n' + 'Student Activities' + '\n' +
    'Dining' + '\n' + 'Community Outreach' + '\n' +'Fitness Center' + '\n' + 'Research' + '\n' + 'Campus Life' + '\n' + 'Athletics' + '\n' +
    'Registrar' + '\n' + 'Community Life' + '\n' + 'Career Development' + '\n' + 'Academic Affairs' + '\n' + 'Spiritual Life' + '\n' +
    'Library' + '\n' + 'Finance' + '\n' + 'Residential Education' + '\n' + 'Global Education' + '\n' + 'Facilities' + '\n' + 'Health and Wellness' + '\n' +
    'Housing' + '\n' + 'Public Safety' + '\n' + 'Transportation' + '\n' + 'First-Year Office';

    convo.say('Our current categories are: ', { typing:true })
    .then(() => {
      convo.say(categoriesMessage);
    });

    convo.say('Type all the names of the categories you wish to be unsubscribed from separated by commas. (ex. Academics, Facilities, Health and Wellness).', { typing: true })

    convo.ask(doNothing, (payload, convo) => {
      const categoryNames = payload.message.text;
      const updatedCategoryNames = categoryNames.toLowerCase().replace(/\s/g, '');
      convo.set('categoryNames', updatedCategoryNames);

      removeSubscriptionsFromFlask(convo);
      convo.end();
    });
  };

  bot.on('postback:MENU_UNSUBSCRIPTION', (payload, chat) => {
    const userID = payload.sender.id;
    chat.conversation((convo) => {
      convo.set('userID', userID);
      unsubscriptionCategories(convo);
      return;
    });
  });

};
