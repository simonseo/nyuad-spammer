'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = 'http://127.0.0.1:5000/';

module.exports = (userid) => {
  // notice that getUserSubs returns a function that can be passed as a callback function for scheduling

  return function(){
    var postsURL = url + 'getUserSubs/' + userid; // actually get new posts for each users
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
            bot.say(userid, markdown);
        }
      }
    }
  }
};
