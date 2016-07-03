var express = require('express');
var router = express.Router();
var topInfluentialsEP = require('../models/topInfluentialsEP.js')
var listQueriesEP = require('../models/listQueriesEP')

router.get('/list/:hashTag', function (req, res, next) {
    listQueriesEP.get(req.params.hashTag, function (searchRes) {
        res.status(200).send({'results': searchRes});
    });
});

router.get('/influential/:hashTag', function (req, res, next) {
    topInfluentialsEP.get(req.params.hashTag, function (names) {
        res.status(200).send({'results': names});
    });
});

module.exports = router;
