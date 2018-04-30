'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = 'http://127.0.0.1:5000/';

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
    var params = {"userid": userid, "categoryNames": categoryNames};

    var xmlHTTP = new XMLHttpRequest();
    console.log(userid, categoryNames);

    // xmlHTTP.open('POST', url+'addUser/'+userid, true);
    // xmlHTTP.send(userid);

    xmlHTTP.open('POST', url, true);
    xmlHTTP.send(JSON.stringify(params));

    xmlHTTP.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
          console.log(xmlHTTP.responseText);
          convo.say("Perfect! Your subscriptions have been saved!", { typing:true });
      }
    }

    return;
  }

  const subscriptionCategories = (convo) => {

    var categoriesMessage = 'Academics' + '\n' + 'Intercultural Affairs' + '\n' + 'Events and Activities' + '\n' + 'Student Activities' + '\n' +
    'Dining' + '\n' + 'Community Outreach' + '\n' +'Fitness Center' + '\n' + 'Research' + '\n' + 'Campus Life' + + '\n' + 'Athletics' + '\n' +
    'Registrar' + '\n' + 'Community Life' + '\n' + 'Career Development' + '\n' + 'Academic Affairs' + '\n' + 'Spiritual Life' + '\n' +
    'Library' + '\n' + 'Finance' + '\n' + 'Residential Education' + '\n' + 'Global Education' + '\n' + 'Facilities' + '\n' + 'Health and Wellness' + '\n' +
    'Housing' + '\n' + 'Public Safety' + '\n' + 'Transportation' + '\n' + 'First-Year Office';

    convo.say('Our current categories are: ', { typing:true })
    .then(() => {
      convo.say(categoriesMessage);
    });

    convo.say('Type all the names of the categories you wish to be subscribed to separated by commas. (ex. Academics, Facilities, Health and Wellness).', { typing: true })

    // convo.ask(doNothing, (payload, convo) => {
    const categoryNames = 'athetlics, studentlife';
      // const categoryNames = payload.message.text;
      const updatedCategoryNames = categoryNames.toLowerCase().replace(/\s/g, '');
      convo.set('categoryNames', updatedCategoryNames);

      addSubscriptionsToFlask(convo);
      convo.end();
    // });
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

    var xmlHTTP = new XMLHttpRequest();
    console.log(userid, categoryNames);

    xmlHTTP.open('POST', url, true);
    xmlHTTP.send(JSON.stringify(params));

    xmlHTTP.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
          console.log(xmlHTTP.responseText);
          convo.say("Perfect! We have removed you from those subscriptions!", { typing:true });
      }
    }

    return;
  }

  const unsubscriptionCategories = (convo) => {

    var categoriesMessage = 'Academics' + '\n' + 'Intercultural Affairs' + '\n' + 'Events and Activities' + '\n' + 'Student Activities' + '\n' +
    'Dining' + '\n' + 'Community Outreach' + '\n' +'Fitness Center' + '\n' + 'Research' + '\n' + 'Campus Life' + + '\n' + 'Athletics' + '\n' +
    'Registrar' + '\n' + 'Community Life' + '\n' + 'Career Development' + '\n' + 'Academic Affairs' + '\n' + 'Spiritual Life' + '\n' +
    'Library' + '\n' + 'Finance' + '\n' + 'Residential Education' + '\n' + 'Global Education' + '\n' + 'Facilities' + '\n' + 'Health and Wellness' + '\n' +
    'Housing' + '\n' + 'Public Safety' + '\n' + 'Transportation' + '\n' + 'First-Year Office';

    convo.say('Our current categories are: ', { typing:true })
    .then(() => {
      convo.say(categoriesMessage);
    });

    convo.say('Type all the names of the categories you wish to be unsubscribed from separated by commas. (ex. Academics, Facilities, Health and Wellness).', { typing: true })

    // convo.ask(doNothing, (payload, convo) => {
    const categoryNames = 'athetlics, studentlife';
      // const categoryNames = payload.message.text;
      const updatedCategoryNames = categoryNames.toLowerCase().replace(/\s/g, '');
      convo.set('categoryNames', updatedCategoryNames);

      removeSubscriptionsFromFlask(convo);
      convo.end();
    // });
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
