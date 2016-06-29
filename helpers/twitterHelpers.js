var config = require('config');

exports.getFileName = function(hashTag) {
    return config.storageFolderName + "/" + config.storageFilePrefix + exports.hashCode(hashTag);
}

exports.hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    var max_files_str = config.maxStorageFiles.toString();
    var hashLen = Math.min(str.length, max_files_str.length - 2);
    for (i = 0; i < hashLen; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
