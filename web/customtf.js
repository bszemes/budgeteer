var totalExpenses;
var totalIncome;
var balance =0;

//display custom incomes

var displayCustomIncomes = function (incomeJSON) {
	totalIncome = 0;
	incomeArray = JSON.parse(incomeJSON);
	
	var incomeTable = '<table id="incometable">' + '<tr><th>Income amount</th><th>Income description</th><th>Date of Income </th></tr>'
		for (i=0; i<incomeArray.length; i++) {
			incomeTable += '<tr> <td class="number">' + incomeArray[i].value + '</td><td>' + incomeArray[i].description + '</td><td>' + incomeArray[i].date.substr(0, 10) + '</td></tr>'; 
			totalIncome += Number(incomeArray[i].value);}
			incomeTable += '<tr class="finalrow"><td colspan="2">Total Income</td><td class="number">' + totalIncome + '</td></tr></table>';

	document.getElementById("incomes").innerHTML = incomeTable;
	updateCustBalance();
	};

//display custom expense list

var displayCustomExpenses = function (expenseJSON) {
	totalExpenses = 0;
	var expenseArray = JSON.parse(expenseJSON);
	expenseArray.sort(compare);
	//create the detailed expenses table
	var detailedExpenseTable= '<table id="detailedexpensetable">' + '<tr><th>Expense Category</th>' 
																	+ '<th>Expense description</th>' 
																	+ '<th>Expense Date</th>' 
																	+ '<th>Expense Amount</th></tr>'
		for (i=0; i<expenseArray.length; i++) {
			detailedExpenseTable += '<tr> <td>' + expenseArray[i].category + '</td>'
										+ '<td>' + expenseArray[i].description + '</td>'
										+ '<td>'+ expenseArray[i].date.substr(0, 10) +'</td>'
						+ '<td class="number">' + expenseArray[i].value + '</td></tr>';
			totalExpenses += Number(expenseArray[i].value);							
			}
	detailedExpenseTable += '<tr class="finalrow"><td colspan="3">Total Expenses</td><td class="number">' + totalExpenses + '</td></table>';
	document.getElementById("expenses").innerHTML = detailedExpenseTable;
	updateCustBalance();
}

var updateCustBalance = function() {

	var balance = totalIncome+totalExpenses;

	var balanceTable = '<table id="balancetable"><tr><th>Time period</th><th>Income total</th><th>Expenses total</th><th>Balance<th></tr>'
						+ '<tr><td>' + document.getElementById("fromdate").value + ' - ' + document.getElementById("todate").value
						+ '</td><td>' + totalIncome
						+ '</td><td>' + totalExpenses
						+ '</td><td>' + balance
						+ '</tr>'


	document.getElementById("balance").innerHTML = balanceTable;
	}


//get a list of incomes, then display income table
var customTFIncLoad = function () { 
	generalDataLoadFromGivenTF("inc", document.getElementById("fromdate").value, document.getElementById("todate").value, displayCustomIncomes);
	}

//get the list of expenses, then display expense table
var customTFExpLoad = function() {
	generalDataLoadFromGivenTF("exp", document.getElementById("fromdate").value, document.getElementById("todate").value, displayCustomExpenses);
	}

document.getElementById("controlform").addEventListener("submit", function(e){
e.preventDefault();
customTFIncLoad();
customTFExpLoad();
})