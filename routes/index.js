var express = require('express');
var router = express.Router();

var twitter = require('twitter');
var config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,

}; 
// make a client
var twitterClient = new twitter(config);
// pass in the search string, an options object, and a callback
var options =  { count: 100};
twitterClient.get('search/tweets', {q: '#haiku',result_type:'popular'}, function(error, tweets, response) {
    console.log(tweets);
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
