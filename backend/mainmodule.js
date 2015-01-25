//main module skeleton

var database = require('./database.js');
var webserver = require ('./webserver.js');
var config = require ('./config.json');


database.seqDbConn();
database.seqResetDb();
var myWebServer = webserver.startWebserver(config.port1, config.host);

