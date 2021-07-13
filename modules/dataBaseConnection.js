module.exports = client => {
var mysql = require('mysql')
var config = require('../json/config.json')
var connection = mysql.createConnection(config.mysql)
module.exports = {
    mysql,
    config,
    connection 
}
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
}
