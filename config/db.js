var mysql = require('mysql');

// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param {string} sql this is sql
 * @param {string} parmerters parmetrer
 * @param {object} callback call
 */
function query (sql, parmerters, callback) {
    var connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '123456789',
            database: 'userdb',
        }
    );

    connection.connect(); // 打开数据库连接

    connection.query(sql, parmerters, callback);

    connection.end(); // 关闭数据库连接
}
module.exports = query;
