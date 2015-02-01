//Contains the ajax logic for server calls

//General function to load items from a time period	

var baseUrl = window.location.hostname
	
var generalDataLoadFromGivenTF = function(itemType, startdate, enddate, callback) {

	var newQwTF = { startdate: startdate,
					enddate: enddate }
	var xmlhttp = new XMLHttpRequest();
	var url
	if ( itemType == "exp") {url = "http://" + baseUrl + "/api/monthlyitemquery?item=expense"}
	else if ( itemType== "inc") {url = "http://" + baseUrl + "/api/monthlyitemquery?item=income"}
	else if ( itemType == "bi") {url = "http://" + baseUrl + "/api/monthlyitemquery?item=budgetitem"}

	xmlhttp.onreadystatechange = function () { 
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(xmlhttp.responseText);
			}
		}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(newQwTF));
	}	
	
	
	
//getting a list of categories
var getCategoryList = function(callback) {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://" + baseUrl + '/api/getcategories';
	
	xmlhttp.onreadystatechange = function () { 
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
	var url = "http://" + baseUrl + "/api/createexpense";
	xmlhttp.onreadystatechange = function () { 
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			currentMonthlyExpLoad();
			}
		}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(newExpense));
	}
	
//function for submitting income	
function newIncomeSubmit() {
	var newIncome = { description: document.getElementById("incdesc").value,
						value: document.getElementById("incam").value,
						date: document.getElementById("incdate").value
						};

	var xmlhttp = new XMLHttpRequest();
	var url = "http://" + baseUrl + "/api/createincome";
	xmlhttp.onreadystatechange = function () { 
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
	
//function for submitting budget	
function newBudgetItemSubmit(budgetItem) {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://" + baseUrl +"/api/createbudgetitem";
	xmlhttp.onreadystatechange = function () { 
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			}
		}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(budgetItem));
	return;
	}	
