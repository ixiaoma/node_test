var mysql = require("mysql");
module.exports = mysql.createPool({
    host:"localhost",
    password:"root",
    user:"root",
    port:"3306",
    database:"db",
    connectionLimit:10
})