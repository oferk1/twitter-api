var express = require('express');
var router = express.Router();
var topInfluentialsEP = require('topInfluentialsEP.js')
var listQueriesEP = require('listQueriesEP.js')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list/:hashTag', function(req, res, next) {
    listQueriesEP.get(req.params.hashTag,function (searchRes) {
        res.status(200).send({'searches':searchRes});
    });

    
});

router.get('/influential/:hashTag', function(req, res, next) {
    topInfluentialsEP.get(req.params.hashTag,function (names) {
        res.status(200).send({'names':names});
    });
    
    
});

module.exports = router;
