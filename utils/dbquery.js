var query = require('../config/db');
module.exports = function (sql, parmeter) {
    return new Promise(function (reslove, rejected) {
        query(sql, parmeter, function (err, data) {
            if (err) {
                rejected(err);
            } else {
                reslove(data);
            }
        });
    });
};