"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
let connection;
class DBHelper {
    constructor(config) {
        if (!connection) {
            connection = mysql.createConnection(config);
            connection.connect((err) => {
                if (err)
                    throw err;
                console.log('...数据库已连接');
            });
        }
    }
    query(sql, param) {
        return new Promise((resolve, reject) => {
            connection.query(sql, param, (err, results) => {
                if (err)
                    reject(err);
                resolve(results);
            });
        });
    }
}
exports.default = DBHelper;
