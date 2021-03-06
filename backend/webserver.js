var http = require('http') 
var url = require('url')
var fs = require('fs')
var database = require('./database.js')
var static = require('node-static');


exports.startWebserver = function (port1) {
 
	var file = new static.Server('.//..//web//', { cache: 0 });
	var data = {}
	var postHTML = 
	'<html><head><title>returning</title></head>' +
	'<body><p>' +
	'Reponse: data received' 
	'</p></body></html>';

	server = http.createServer( function (req, res) {
	
		if (req.method != 'POST' && /api/.test(url.parse(req.url).pathname) == false) {
			req.addListener('end', function () {file.serve(req, res);}).resume();
			}
	
		else if (req.method == 'GET' && url.parse(req.url).pathname == '/api/getcategories') {
			var body ="";
			req.on('data', function (chunk) {body += chunk;});
	
			req.on('end', function() {
				database.categoryQuery( function(results) { 
					res.writeHead(200);
					res.end(JSON.stringify(results));
					})
				})
			}	
	
		else if (req.method == 'POST' && url.parse(req.url).pathname == '/api/createexpense') {
			var body ="";
			req.on('data', function (chunk) {body += chunk;});
	
			req.on('end', function () {
				database.seqexpstore(JSON.parse(body), function () {
					res.writeHead(200);
					res.end(postHTML);
					})
				})
			}
	
		else if (req.method == 'POST' && url.parse(req.url).pathname == '/api/createincome') {
			var body ="";
			req.on('data', function (chunk) {body += chunk});
	
			req.on('end', function () {
				database.seqincstore(JSON.parse(body), function () {
					res.writeHead(200);
					res.end(postHTML);
					}) 
				})
			}
	
		else if (req.method == 'POST' && url.parse(req.url).pathname == '/api/createcategory') {
			var body ="";
			req.on('data', function (chunk) {body += chunk;});
	
			req.on('end', function () {
				database.seqCatStore(JSON.parse(body), function () {
					res.writeHead(200);
					res.end(postHTML);
					}) 
				})
			}
	
		else if (req.method == 'POST' && url.parse(req.url).pathname == '/api/createbudgetitem') {
			var body ="";
			req.on('data', function (chunk) {body += chunk;});
	
			req.on('end', function () {
				database.seqBIStore(JSON.parse(body), function () {
					res.writeHead(200);
					res.end(postHTML);
					}) 
				})
			}
	
	
		else if	(req.method == 'POST' && url.parse(req.url).pathname == '/api/monthlyitemquery') {
			var body ="";
			req.on('data', function (chunk) {body += chunk;});
	
			req.on('end', function () {
				if (url.parse(req.url).search == '?item=expense') {
					database.monthlyExpDataQuery(JSON.parse(body), function(results) {
						res.writeHead(200);
						res.end(JSON.stringify(results));
						});
					}
		
				else if (url.parse(req.url).search == '?item=income') {
					database.monthlyIncDataQuery(JSON.parse(body), function(results) {
						res.writeHead(200);
						res.end(JSON.stringify(results));
						});
					}	
					
				else if (url.parse(req.url).search == '?item=budgetitem') {
					database.monthlyBIDataQuery(JSON.parse(body), function(results) {
						res.writeHead(200);
						res.end(JSON.stringify(results));
						});
					}
				})
	  		}
		})
	server.listen(port1);
	console.log ("Connected to " + port1);
	}
	