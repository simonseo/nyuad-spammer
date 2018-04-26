'use strict';

var sqlite3 = require('sqlite3').verbose();
var db;

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

  const addUserToTable = (convo) => {
    console.log("Open Database");
    let db = new sqlite3.Database('./database/spammerDatabase.db');

    //if first time insert into user table
    console.log("Inserting into User Table");
    var user = db.prepare("INSERT OR IGNORE INTO users VALUES (?, ?)");
    user.run(convo.get('userID'), '0');
    user.finalize();

    console.log("Reading values");
    db.all("SELECT userid, timestamp FROM users", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.userid + ": " + row.timestamp);
        });
    });

    console.log("Inserting into User Subscription Table");
    var subscription = db.prepare("INSERT INTO userSubscription VALUES (?, ?)");
    subscription.run(convo.get('userID'), "studentlife");
    subscription.finalize();

    console.log("Reading values");
    db.all("SELECT userid, categoryString FROM userSubscription", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.userid + ": " + row.categoryString);
        });
    });

    console.log("Close database");
    db.close();

    return;
  }

  const subscribeToCategory = (convo) => {

    addUserToTable(convo);
    return;

    // convo.ask(doNothing, (payload, convo) => {
    //   const userCategory = payload.message.text;

      // if (userCategory == "studentlife"){
      //   convo.set('userCategory', userCategory);
      //   console.log(userCategory);

        // addToTable(convo);
        // return;
      // }
      //
      // else {
      //   convo.say("This category is not found in Student Portal. Click the subscribe button to try again!", { typing: true });
      //   convo.end();
      // }

    // });
  };

  const unsubscribeToCategory = (convo) => {

    convo.ask(doNothing, (payload, convo) => {
      const userCategory = payload.message.text;

      if (userCategory == "studentlife"){
        convo.set('userCategory', userCategory);
        console.log(userCategory);
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

      chat.say('Type the name of the category you wish to be subscribed to', { typing: true });
      subscribeToCategory(convo);

      return;
    });
  });


  bot.on('postback:MENU_UNSUBSCRIBE', (payload, chat) => {
    const userID = payload.sender.id;

    // chat.say(markdown);
    // console.log(markdown);


    chat.conversation((convo) => {
      convo.set('userID', userID);

      chat.say('Type the name of the category you wish to be unsubscribed from', { typing: true });
      unsubscribeToCategory(convo);

      return;
    });
  });

};
