var tHandler = require('twitterHandler');
var tHelp= require('twitterHelpers');
var fs = require('fs');

exports.get = function(hashTag,cb) {
 tHandler.client.get('search/tweets', {
  q: hashTag,
  result_type: 'popular',
  count: 5
 }, function (error, tweets, response) {
  console.log(tweets);
  var fileName = tHelp.getFileName(hashTag);
  fs.readFile(fileName, handleFile);


  function handleFile(err, data) {
   var newData;
   if (!err) {
    newData = JSON.parse(data)
   }
   else {
    newData = {};
   }
   newData[hashTag] = newData[hashTag] || {};
   var userNames = "";
   for (statusIdx in tweets.statuses) {
    userNames += tweets.statuses[statusIdx].user.name + ", ";
   }
   var ts = new Date().getTime();
   var trimmedNames = userNames.substring(0, userNames.length - 2);
   newData[hashTag][ts] = trimmedNames;
   var newFileData = JSON.stringify(newData);
   cb(trimmedNames);
   fs.writeFile(fileName, newFileData, function (err) {
    if (err) return console.log(err);
   });
  }


 });
}