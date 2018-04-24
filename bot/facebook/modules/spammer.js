'use strict';

var sqlite3 = require('sqlite3').verbose();
var db;

var TurndownService = require('turndown');
var turndownService = new TurndownService();
var markdown = turndownService.turndown('<p><strong>Film Screening | Just Another Accent&nbsp;</strong></p> '+
'<p><em>Tonight April 5 @ 7:00 PM, A6 Building, room 008</em></p> '+
'<p><em><strong><a href="http://nyuadi.force.com/Events/NYUEventRegistration?event=J8jmAFmk2GDbDDVrwaos0A_3D_3D">RSVP HERE</a></strong></em></p> '+
'<p>The documentary aims to raise awareness of stuttering and wipe off the stigma that has long been attached to it. The film also follows Farah Al Qaissieh&rsquo;s journey in supporting the stutter community through her non-profit organization of Stutter UAE and the features other people who stutter and the issues they face in everyday life.</p>'+
'<p>[Director: Khadija Kudsi &amp; Samia Ali | UAE | 2016 | 15 mins | Arabic w/ English Subtitles]</p>'+
'<p><em><strong>Screening followed by Q&amp;A with the film&rsquo;s lead star Farah Al Qaissieh</strong></em></p>'+
'<p>&nbsp;</p>')

module.exports = (bot) => {

  const doNothing = (convo) => {
    return;
  }

  const generateDatabase = (convo) => {

    function createDatabase() {
        //Creating Spammer Database
        console.log("Creating Spammer Database");
        db = new sqlite3.Database('spammerDatabase', createTable);
    }

    function createTable() {
        //Do not modify "CREATE TABLE IF NOT EXISTS userTable (info TEXT)"
        console.log("Creating User Table");
        db.run("CREATE TABLE IF NOT EXISTS userTable (info TEXT)", insertIDs);
    }

    function insertIDs() {
        //Do not modify "SELECT rowid AS id, info FROM userTable"
        console.log("Inserting userIDs");
        var userIDs = db.prepare("INSERT INTO userTable VALUES (?)");
        userIDs.run(convo.get('userID'));
        userIDs.finalize(readValues);

        //still need to check for dups
    }

    function readValues() {
        //Do not modify "SELECT rowid AS id, info FROM userTable"
        console.log("Reading values");
        db.all("SELECT rowid AS id, info FROM userTable", function(err, rows) {
            rows.forEach(function (row) {
                console.log(row.id + ": " + row.info);
            });
            closeDatabase();
        });
    }

    function closeDatabase() {
        //Close database
        console.log("Closing Database");
        db.close();
    }

    createDatabase();

    return;
  }

  const subscribeToCategory = (convo) => {

    convo.ask(doNothing, (payload, convo) => {
      const userCategory = payload.message.text;

      if (userCategory == "studentlife"){
        convo.set('userCategory', userCategory);
        console.log(userCategory);

        generateDatabase(convo);
        return;
      }

      else {
        convo.say("This category is not found in Student Portal. Click the subscribe button to try again!", { typing: true });
        convo.end();
      }

    });
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
    console.log(payload.timestamp);

    chat.say(markdown);
    console.log(markdown);

    chat.conversation((convo) => {
      convo.set('userID', userID);

      chat.say('Type the name of the category you wish to be subscribed to', { typing: true });
      subscribeToCategory(convo);

      return;
    });
  });


  bot.on('postback:MENU_UNSUBSCRIBE', (payload, chat) => {
    const userID = payload.sender.id;

    chat.conversation((convo) => {
      convo.set('userID', userID);

      chat.say('Type the name of the category you wish to be unsubscribed from', { typing: true });
      unsubscribeToCategory(convo);

      return;
    });
  });

};
