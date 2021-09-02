var Connection = require('tedious').Connection;


var config = {
    server: '127.0.0.1', //MSSQL Server IP address
    authentication: {
      type: 'default',
      options: {
        userName: 'user_defined_id', //MSSQL User ID
        password: 'user_defined_pw' //MSSQL User PW
      }
    }
    ,options: {
      debug: {
        packet: true,
        data: true,
        payload: true,
        token: false,
        log: true
      },
      database: 'database_name' //MSSQL Server Database name
      //,encrypt: true // for Azure users
    }
    
  };

var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('[DB-'+config.server+'] Connected to ' + config.options.database);
    }
});

module.exports = connection;