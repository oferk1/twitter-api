var tHelp= require('twitterHelpers');
var fs = require('fs');

exports.get = function(hashTag,cb) {
 var hashTag = '#'+hashTag;
 var fileName = tHelp.getFileName(hashTag);
 fs.readFile(fileName, handleFile);
 function handleFile(err, data) {
  var fileData;
  if (!err) {
   fileData = JSON.parse(data)
  }
  else {
   fileData = {};
  }
  var searchRes = fileData[hashTag] || {};
  cb(searchRes);
 }
 
 }