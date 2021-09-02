//Run the Server
var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var port = process.env.port || 3001

app.listen(port, () => {
    console.log("SERVER Port("+port+") is running.");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes')();
 
app.use('/api', router);

