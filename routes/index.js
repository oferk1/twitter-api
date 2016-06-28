var express = require('express');
var router = express.Router();
var fs = require('fs');
var twitter = require('twitter');
var dirName = 'storage';
var config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,

}; 
// make a client
var twitterClient = new twitter(config);
// pass in the search string, an options object, and a callback

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list/:hashTag', function(req, res, next) {
    var hashTag = '#'+req.params.hashTag;
    var fileName = getFileName(hashTag);
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
        res.status(200).send({'searches':searchRes});
    }
});

function getFileName(hashTag) {
    return dirName + '/db_' + hashCode(hashTag);
}
router.get('/influential/:hashTag', function(req, res, next) {
    var hashTag = '#'+req.params.hashTag;
    twitterClient.get('search/tweets', {q: hashTag,result_type:'popular',count:5}, function(error, tweets, response) {
        console.log(tweets);
        var fileName = getFileName(hashTag);
        fs.readFile(fileName, handleFile);

// Write the callback function
        function handleFile(err, data) {
            var newData;
            if (!err) {
                newData = JSON.parse(data)
            }
            else{
                newData = {};
            }
            newData[hashTag] = newData[hashTag] || {};
            var userNames = "";
            for(statusIdx in tweets.statuses){
                userNames += tweets.statuses[statusIdx].user.name+", ";
            }
            var ts = new Date().getTime();
            var trimmedNames = userNames.substring(0,userNames.length - 2);
            newData[hashTag][ts] = trimmedNames;
            var newFileData = JSON.stringify(newData);
            fs.writeFile(fileName,newFileData , function (err) {
                if (err) return console.log(err);
                res.status(200).send({'names':trimmedNames});
            });
        }

    });
    //res.render('index', { title: 'Most Influential Tweeters' });
});

hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    var max_files_str = "100";
    for (i = 0; i < Math.min(str.length, max_files_str.length - 1); i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


module.exports = router;
