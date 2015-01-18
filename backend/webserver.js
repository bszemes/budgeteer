var http = require('http') 
var url = require('url')
var fs = require('fs')
var database = require('./database.js') 


exports.startWebserver = function (port1, host) {


 

var file = 'c://Users//b//Desktop//personal//js//budgetsoftware//budgeteer//web//index.html'

var data = {}
var postHTML = 
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<p>' +
  'Reponse: data received' 
  '</p>'+
  '</body></html>';

  server = http.createServer( function (req, res) {
	
	if (req.method != 'POST') {
	fs.createReadStream(file).pipe(res)
	}
	else if (req.method == 'POST' && url.parse(req.url).pathname == '/api/createexpense') {
	 var body ="";
	req.on('data', function (chunk) {
    body += chunk;
  });
	
	req.on('end', function () {
	  console.log(JSON.parse(body));
	  database.seqexpstore(JSON.parse(body));
	  res.writeHead(200);
	   res.end(postHTML);
	    }) 
	}
	
	else if 
	(req.method == 'POST' && url.parse(req.url).pathname == '/api/createincome') {
	 var body ="";
	req.on('data', function (chunk) {
    body += chunk;
  });
	
	req.on('end', function () {
	  console.log(JSON.parse(body));
	  database.seqincstore(JSON.parse(body));
	  res.writeHead(200);
	   res.end(postHTML);
	    }) 
	}
	
	else if 
	(req.method == 'POST' && url.parse(req.url).pathname == '/api/createcategory') {
	 var body ="";
	req.on('data', function (chunk) {
    body += chunk;
  });
	
	req.on('end', function () {
	  console.log(JSON.parse(body));
	  database.seqCatStore(JSON.parse(body));
	  res.writeHead(200);
	   res.end(postHTML);
	    }) 
	
	}
	
	else if 
	(req.method == 'POST' && url.parse(req.url).pathname == '/api/addbudget') {
	 var body ="";
	req.on('data', function (chunk) {
    body += chunk;
  });
	
	req.on('end', function () {
	  console.log(JSON.parse(body));
	  database.seqBIStore(JSON.parse(body));
	  res.writeHead(200);
	   res.end(postHTML);
	    }) 
	
	}
	
	
	else if
	(req.method == 'POST' && url.parse(req.url).pathname == '/api/monthlyitemquery') {
	 var body ="";
	req.on('data', function (chunk) {
    body += chunk;
	});
	
	req.on('end', function () {
	  	if (url.parse(req.url).search == '?item=expense') {
		  
			database.monthlyExpDataQuery(JSON.parse(body), function(results) {
			console.log(results);
	     	res.writeHead(200);
			console.log(results);
			res.end(JSON.stringify(results));
				});
			}
		
		else if (url.parse(req.url).search == '?item=income') {
			database.monthlyIncDataQuery(JSON.parse(body), function(results) {
			console.log(results);
	     	res.writeHead(200);
			console.log(results);
			res.end(JSON.stringify(results));
				});
			}
					
		else if (url.parse(req.url).search == '?item=budgetitem') {
			database.monthlyBIDataQuery(JSON.parse(body), function(results) {
			console.log(results);
	     	res.writeHead(200);
			console.log(results);
			res.end(JSON.stringify(results));
				});
			}
		})
	  
	     

	}
	})
	
server.listen(port1,host);

console.log ("Connected to " + port1 + "   " + host);


}
/*
exports.returnRes = function(results) {

	  server.response.writeHead(200);
	  console.log(results);
	   server.response.end(JSON.stringify(results));
	   
}
*/