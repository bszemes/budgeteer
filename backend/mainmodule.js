//main module skeleton

var database = require('./database.js');
var webserver = require ('./webserver.js');

var port1 = 80
var host = '127.0.0.1'


database.seqDbConn();
database.seqResetDb();
var myWebServer = webserver.startWebserver(port1, host);

