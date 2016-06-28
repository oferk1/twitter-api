var tHandler = require('twitterHandler');
var pHandler = require('persistenceHandler');

exports.get = function (hashTag, cb) {
    tHandler.client.get('search/tweets', {
        q: hashTag,
        result_type: 'popular',
        count: 5
    }, function (error, tweets) {
        var userNames = "";
        for (statusIdx in tweets.statuses) {
            var status = tweets.statuses[statusIdx];
            userNames += status.user.name + ", ";
        }
        var trimmedNames = userNames.substring(0, userNames.length - 2);
        cb(trimmedNames);
        pHandler.persist(hashTag,trimmedNames);
    });
}