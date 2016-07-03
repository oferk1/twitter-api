var fs = require('fs');
var tHelp = require('../helpers/twitterHelpers');

function getEmptyFileObject(fileData, fileName, key) {
    fileData = {};
    fileData[fileName] = {};
    fileData[fileName][key] = {};
    return fileData;
}
exports.persist = function (key, value) {
    var fileName = tHelp.getFileName(key);
    fs.readFile(fileName, handleFile);

    function handleFile(err, data) {
        var ts = new Date().getTime();
        var noDataFound = err || data.length == 0;
        var fileData;
        if (noDataFound) {
            fileData = getEmptyFileObject(fileData, fileName, key);
        }
        else {
            fileData = JSON.parse(data);
        }
        if (!fileData[fileName][key]){
            fileData[fileName][key] = {};
        }

        var dataIdx = fileData[fileName][key];
        dataIdx = dataIdx || {};
        dataIdx[ts] = value;
        var fileDataStr = JSON.stringify(fileData);
        fs.writeFile(fileName, fileDataStr, function (err) {
            if (err) return console.log(err);
        });
    }
}

exports.read = function (key, cb) {
    var fileName = tHelp.getFileName(key);
    fs.readFile(fileName, handleFile);

    function handleFile(err, data) {
        var fileData;
        if (err) {
            fileData = getEmptyFileObject(fileData, fileName, key);
        }
        else {
            fileData = JSON.parse(data);
        }
        var searchRes = fileData[fileName][key] || {};
        cb(searchRes);
    }
}


exports.delete = function (key) {
    var fileName = tHelp.getFileName(key);
    fs.readFile(fileName, handleFile);

    function handleFile(err, data) {
        var ts = new Date().getTime();
        var noDataFound = err || data.length == 0;
        var fileData;
        if (noDataFound) {
            fileData = getEmptyFileObject(fileData, fileName, key);
        }
        else {
            fileData = JSON.parse(data);
        }
        if (!fileData[fileName][key]){
            fileData[fileName][key] = {};
        }

        var dataIdx = fileData[fileName][key];
        dataIdx = dataIdx || {};
        delete dataIdx[ts];
        var fileDataStr = JSON.stringify(fileData);
        fs.writeFile(fileName, fileDataStr, function (err) {
            if (err) return console.log(err);
        });
    }
}