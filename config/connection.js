const mysql = require("mysql");
const util = require("util");

dbConnectionInfo = {
    host: "localhost",
    user: "root",
    password: "root",
    connectionLimit: 1000, //mysql connection pool length
    database: "sample", //database name
    waitForConnection: true
};

var dbconnection = mysql.createConnection(dbConnectionInfo);
// dbconnection.connect();
// Attempt to catch disconnects
dbconnection.on(
    "connect",
    function() {
        console.log("@connected to db");
    },
    "end",
    function(err) {
        console.log("@end ", err);
        throw err;
    },
    "close",
    function(err) {
        console.log("@closed ", err);
        throw err;
    }
);

dbconnection.query = util.promisify(dbconnection.query);

module.exports = dbconnection;