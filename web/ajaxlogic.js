//Contains the ajax logic for server calls

//get a list of items for the current month

var currentMonthlyDataLoad = function(itemType, callback) {

var newExpMQ = { startdate: Date.prototype.toUTCString(Date.prototype.setFullYear(d.getFullYear(), d.getMonth(), 1)),
						enddate: Date.prototype.toUTCString(Date.prototype.setFullYear(d.getFullYear(), d.getMonth()+1, 1)) 
					}
	console.log(newExpMQ);
	var xmlhttp = new XMLHttpRequest();
	var url
	if ( itemType == "exp") {var url = "http://127.0.0.1/api/monthlyitemquery?item=expense"}
	else if ( itemType== "inc") {var url = "http://127.0.0.1/api/monthlyitemquery?item=income"}
	else if ( itemType == "bi") {var url = "http://127.0.0.1/api/monthlyitemquery?item=budgetitem"}

xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("budebug2").innerHTML = xmlhttp.responseText;
		callback(xmlhttp.responseText);
    }
}
xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/json");
xmlhttp.send(JSON.stringify(newExpMQ));
	}

//getting a list of categories
var getCategoryList = function(callback) {
	var xmlhttp = new XMLHttpRequest();
	var url = 'http://127.0.0.1/api/getcategories'
	
	xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(xmlhttp.responseText);
			}
		}
		
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	}

	
//function for submitting expense	
function newExpenseSubmit() {
	  var newExpense = { description: document.getElementById("expdesc").value,
						 value: document.getElementById("expam").value,
						 category: document.getElementById("expcat").value,
						 date: document.getElementById("expdate").value
						};

var xmlhttp = new XMLHttpRequest();
var url = "http://127.0.0.1/api/createexpense";
xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		currentMonthlyExpLoad();
        document.getElementById("expdebug2").innerHTML = xmlhttp.responseText;
    }
}
xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/json");
document.getElementById("expdebug1").innerHTML = JSON.stringify(newExpense)
xmlhttp.send(JSON.stringify(newExpense));
	}
	
//function for submitting income	
function newIncomeSubmit() {
	  var newIncome = { description: document.getElementById("incdesc").value,
						value: document.getElementById("incam").value,
						date: document.getElementById("incdate").value
						};

var xmlhttp = new XMLHttpRequest();
var url = "http://127.0.0.1/api/createincome";
xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		currentMonthlyIncLoad();
        document.getElementById("incdebug2").innerHTML = xmlhttp.responseText;
	    }
}
xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/json");
document.getElementById("incdebug1").innerHTML = JSON.stringify(newIncome)
xmlhttp.send(JSON.stringify(newIncome));
	}	
	


/*function newItemMQSubmit() {
		

	  var newExpMQ = { startdate: Date.prototype.toUTCString(Date.prototype.setFullYear(document.getElementById("mqitemyear").value, document.getElementById("mqitemmonth").value, 1)),
						enddate: Date.prototype.toUTCString(Date.prototype.setFullYear(document.getElementById("mqitemyear").value, Number(document.getElementById("mqitemmonth").value)+1, 0)) 
					}
					
	var xmlhttp = new XMLHttpRequest();
	var url
	if ( document.getElementById("itemtype").value == "exp") {var url = "http://127.0.0.1/api/monthlyitemquery?item=expense"}
	else if ( document.getElementById("itemtype").value == "inc") {var url = "http://127.0.0.1/api/monthlyitemquery?item=income"}
	else if ( document.getElementById("itemtype").value == "bi") {var url = "http://127.0.0.1/api/monthlyitemquery?item=budgetitem"}

xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText);
		document.getElementById("demo10").innerHTML = xmlhttp.responseText;
    }
}
xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/json");
document.getElementById("demo9").innerHTML = (JSON.stringify(newExpMQ));
xmlhttp.send(JSON.stringify(newExpMQ));
	}	*/