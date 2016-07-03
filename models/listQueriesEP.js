var pHandler = require('../models/persistenceHandler');

exports.get = function (hashTag, cb) {
    pHandler.read(hashTag, cb)
}