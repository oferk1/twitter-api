var pHandler = require('persistenceHandler');

exports.get = function (hashTag, cb) {
    pHandler.read(hashTag, cb)
}