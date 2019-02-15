var crypto = require('crypto');
module.exports = function (content) {
    var md5 = crypto.createHash('md5');
    md5.update(content); // 加密
    return md5.digest('hex');
};
