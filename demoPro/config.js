//for database connection
var mysql = require('mysql');

config.connection = mysql.createConnection({
  host     : 'demo',
  user     : 'user',
  password : 'user1',
  database : 'data'
});

module.exports = config;
