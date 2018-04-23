'use strict';

var TurndownService = require('turndown');
var turndownService = new TurndownService();
var markdown = turndownService.turndown('<p><strong>Film Screening | Just Another Accent&nbsp;</strong></p> '+
'<p><em>Tonight April 5 @ 7:00 PM, A6 Building, room 008</em></p> '+
'<p><em><strong><a href="http://nyuadi.force.com/Events/NYUEventRegistration?event=J8jmAFmk2GDbDDVrwaos0A_3D_3D">RSVP HERE</a></strong></em></p> '+

'<p>The documentary aims to raise awareness of stuttering and wipe off the stigma that has long been attached to it. The film also follows Farah Al Qaissieh&rsquo;s journey in supporting the stutter community through her non-profit organization of Stutter UAE and the features other people who stutter and the issues they face in everyday life.</p>'+

'<p>[Director: Khadija Kudsi &amp; Samia Ali | UAE | 2016 | 15 mins | Arabic w/ English Subtitles]</p>'+

'<p><em><strong>Screening followed by Q&amp;A with the film&rsquo;s lead star Farah Al Qaissieh</strong></em></p>'+

'<p>&nbsp;</p>')

const config = require('config');


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

    console.log(markdown);

    chat.say(markdown);

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
