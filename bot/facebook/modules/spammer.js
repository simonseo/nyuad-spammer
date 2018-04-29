'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = 'http://127.0.0.1:5000';

// var TurndownService = require('turndown');
// var turndownService = new TurndownService();
// var markdown = turndownService.turndown('<p><strong>Film Screening | Just Another Accent&nbsp;</strong></p> '+
// '<p><em>Tonight April 5 @ 7:00 PM, A6 Building, room 008</em></p> '+
// '<p><em><strong><a href="http://nyuadi.force.com/Events/NYUEventRegistration?event=J8jmAFmk2GDbDDVrwaos0A_3D_3D">RSVP HERE</a></strong></em></p> '+
// '<p>The documentary aims to raise awareness of stuttering and wipe off the stigma that has long been attached to it. The film also follows Farah Al Qaissieh&rsquo;s journey in supporting the stutter community through her non-profit organization of Stutter UAE and the features other people who stutter and the issues they face in everyday life.</p>'+
// '<p>[Director: Khadija Kudsi &amp; Samia Ali | UAE | 2016 | 15 mins | Arabic w/ English Subtitles]</p>'+
// '<p><em><strong>Screening followed by Q&amp;A with the film&rsquo;s lead star Farah Al Qaissieh</strong></em></p>'+
// '<p>&nbsp;</p>')

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

    // var categoriesXML = new XMLHttpRequest();
    // categoriesXML.open('GET', theUrl, true);
    // categoriesXML.send();
    // categoriesXML.onreadystatechange = processCategoriesRequest;
    //
    // function processCategoriesRequest(e) {
    //     if (categoriesXML.readyState == 4 && categoriesXML.status == 200) {
    //         var response = JSON.parse(categoriesXML.responseText);
    //         convo.say(response.category_name, { typing:true });
    //         convo.log(response.category_name);
    //     }
    // }

    convo.say("Student portal, Athetlics, Resed, Education", { typing:true });
    convo.say('Type all the names of the categories you wish to be subscribed to separated by commas. (ex. student life, athletics). This information will be updated everytime you chose to subscribe.', { typing: true });

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
      chat.say('Our current categories are: ', { typing:true }).then(() => subscriptionCategories(convo));
      return;
    });
  });

  ///////////////////////////////////////
  /////////////  UPDATES  ///////////////
  ///////////////////////////////////////

  const showUpdatesFromFlask = (convo) => {

    //get request for updates on a category
  }

  const updateCategories = (convo) => {

    // var categoriesXML = new XMLHttpRequest();
    // categoriesXML.open('GET', theUrl, true);
    // categoriesXML.send();
    // categoriesXML.onreadystatechange = processCategoriesRequest;
    //
    // function processCategoriesRequest(e) {
    //     if (categoriesXML.readyState == 4 && categoriesXML.status == 200) {
    //         var response = JSON.parse(categoriesXML.responseText);
    //         convo.say(response.category_name, { typing:true });
    //         convo.log(response.category_name);
    //     }
    // }

    convo.say("Student portal, Athetlics, Resed, Education", { typing:true });
    convo.say('Type the name of the category you wish to see an update from', { typing: true });

    convo.ask(doNothing, (payload, convo) => {
      const categoryNames = payload.message.text;
      const updatedCategoryNames = categoryNames.toLowerCase().replace(/\s/g, '');
      convo.set('categoryNames', updatedCategoryNames);

      showUpdatesFromFlask(convo);
      convo.end();
    });
  };

  bot.on('postback:MENU_UPDATES', (payload, chat) => {
    const userID = payload.sender.id;
    chat.conversation((convo) => {
      convo.set('userID', userID);
      chat.say('Our current categories are: ', { typing:true }).then(() => updateCategories(convo));
      return;
    });
  });

  ///////////////////////////////////////
  /////////////   ABOUT   ///////////////
  ///////////////////////////////////////

  bot.on('postback:MENU_ABOUT', (payload, chat) => {
    chat.getUserProfile()
    .then((user) => {
      chat.say(`Hey, ${user.first_name}! I know that acessing Student Portal can sometimes be a little bit annoying. With me, that will quickly go away!`, { typing:true })
      .then(() => {
        chat.say('Simply click the button from the menu to subscribe or unsubscribe from notifications from categories in Student Portal.', { typing:true });
      });
    });
  });

};
