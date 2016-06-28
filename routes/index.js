var express = require('express');
var router = express.Router();

var twitter = require('twitter');
var config = {
  consumer_key: 'XXXXXXXXXXXXXXXXXXXX',
  consumer_secret: 'XXXXXXXXXXXXXXXXXXXX',
  access_token_key: 'XXXXXXXXXXXXXXXXXXXX',
  access_token_secret: 'XXXXXXXXXXXXXXXXXXXX'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
