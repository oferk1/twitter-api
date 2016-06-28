var fs = require('fs');
var tHelp = require('twitterHelpers');

exports.persist = function (key, value) {
    var fileName = tHelp.getFileName(key);
    fs.readFile(fileName, handleFile);
    
    function handleFile(err, data) {
        var ts = new Date().getTime();
        var noDataFound = err || data.length == 0;
        var newFileObj = noDataFound ? {} : JSON.parse(data)
        newFileObj[key] = newFileObj[key] || {};
        newFileObj[key][ts] = value;
        var fileDataStr = JSON.stringify(newFileObj);
        fs.writeFile(fileName, fileDataStr, function (err) {
            if (err) return console.log(err);
        });
    }
}

exports.read = function (key,cb) {
    var fileName = tHelp.getFileName(key);
    fs.readFile(fileName, handleFile);
    
    function handleFile(err, data) {
        var fileData = err ? {} : JSON.parse(data);
        var searchRes = fileData[key] || {};
        cb(searchRes);
    }
}