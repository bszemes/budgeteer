//Contains the js for page load (table construction, data retrieval for tables, etc.)

var incomeArray = [];
var totalIncome
var balance =0;
var totalExpenses
var expenseByCategoryArray = [];
var totalBudgets;	
var budgetArray = [];

var findBudgetItembyCategory = function(budgetArray, cat) {
	for (var g=0; g<budgetArray.length; g++) {
		if (budgetArray[g].category == cat) {return budgetArray[g]}
		}
	return null
	}


if (Number(d.getMonth()) < 9) {var monthformatted = "0" + (d.getMonth()+1).toString() } else monthformatted = (d.getMonth()+1).toString();
if (Number (d.getDate()) < 9) {var dateformatted = "0" + d.getDate().toString() } else dateformatted = (d.getDate().toString() );
var today = "" + (d.getFullYear()).toString() + "-" + monthformatted + "-" + dateformatted;
document.getElementById("expdate").value = today;
document.getElementById("incdate").value = today;

var generateIncomeTable = function (incomeJSON) {
	totalIncome = 0;
	incomeArray = JSON.parse(incomeJSON);
	
	var incomeTable = '<table id="incometable" sortable>' + '<tr><th>Amount</th><th>Description</th><th>Date</th></tr>'
		for (var i=0; i<incomeArray.length; i++) {
			incomeTable += '<tr> <td class="number">' + incomeArray[i].value + '</td><td>' + incomeArray[i].description + '</td><td>' + incomeArray[i].date.substr(0, 10) + '</td></tr>'; 
			totalIncome += Number(incomeArray[i].value);}
			incomeTable += '<tr class="finalrow"><td colspan="2">Total Income</td><td class="number">' + totalIncome + '</td></tr></table>';

	document.getElementById("Income").innerHTML = incomeTable;
	updateBalance();
	};

var generateExpenseTables = function (expenseJSON) {
	totalExpenses = 0;
	totalBudgets = 0;
	var expenseArray = JSON.parse(expenseJSON);
	expenseArray.sort(compare);
	//create the detailed expenses table
	var detailedExpenseTable= '<table id="detailedexpensetable">' + '<tr><th>Category</th>' 
																	+ '<th>Date</th>' 
																	+ '<th>Description</th>' 
																	+ '<th>Amount</th></tr>'
		for (var i=0; i<expenseArray.length; i++) {
			detailedExpenseTable += '<tr> <td>' + expenseArray[i].category + '</td>'
												+ '<td>'+ expenseArray[i].date.substr(0, 10) +'</td>'
												+ '<td>' + expenseArray[i].description + '</td>'
						+ '<td class="number">' + expenseArray[i].value + '</td></tr>';
			totalExpenses += Number(expenseArray[i].value);							
			}
	detailedExpenseTable += '<tr class="finalrow"><td colspan="3">Total Expenses</td><td class="number">' + totalExpenses + '</td></table>';
	//create the expenses by category table - first sum the values in the same category, then create a table to display
		for (var i=0, n=0; i<expenseArray.length; i++, n++) {
			expenseByCategoryArray[n] = expenseArray[i];
			expenseByCategoryArray[n].value = Number(expenseByCategoryArray[n].value);
			if (expenseArray[i+1] == undefined)  break;
			while (expenseArray[i].category == expenseArray[i+1].category) {
				i++;
				expenseByCategoryArray[n].value += Number(expenseArray[i].value);
				if (expenseArray[i+1] == undefined)  break;
				}
			}
		
	var expenseTable = '<table id="expensetable">' + '<tr><th>Expense Category</th><th>Budget</th><th>Incurred Expenses </th></tr>'
		for (var i=0; i<expenseByCategoryArray.length; i++) {
			currentBudget = (findBudgetItembyCategory(budgetArray, expenseByCategoryArray[i].category) != null) ? findBudgetItembyCategory(budgetArray, expenseByCategoryArray[i].category).value : "0";
			expenseTable += '<tr> <td>' + expenseByCategoryArray[i].category + '</td><td>' + currentBudget + '</td><td class="number">' + expenseByCategoryArray[i].value + '</td></tr>';
			totalBudgets += Number(currentBudget);
			}
		expenseTable += '<tr class="finalrow"><td>Totals</td><td class = "number">' +totalBudgets + '</td><td class="number">' + totalExpenses + '</td></tr></table>';

	document.getElementById("Expenses").innerHTML = expenseTable;
	document.getElementById("detailedexpense").innerHTML = detailedExpenseTable;
	updateBalance();
	updateCategoryDatalist();
}

var currentMonthlyBILoad = function()	{
	generalDataLoadFromGivenTF("bi", currentMonthStart, currentMonthEnd, populateBudgetArray);
	}

var populateBudgetArray = function(budgetJSON) {
	budgetArray=JSON.parse(budgetJSON);
	}


	
var populateCategoryDatalist = function(categoryJSON) {
	var categoryList =''
	var categoryArray = JSON.parse(categoryJSON);
	for (i=0; i<categoryArray.length; i++) {categoryList += '<option value=' + categoryArray[i].category + '>'}
	document.getElementById("categories").innerHTML = categoryList;
	}
	
//get a list of incomes, then display income table
var currentMonthlyIncLoad = function () { 
	generalDataLoadFromGivenTF("inc", currentMonthStart, currentMonthEnd, generateIncomeTable);
	}

//get the list of expenses, then display expense table
var currentMonthlyExpLoad = function() {
	generalDataLoadFromGivenTF("exp", currentMonthStart, currentMonthEnd, generateExpenseTables);
	}
	
//update balance values in the table
var updateBalance = function() {

	var balance = totalIncome+totalExpenses;

	var balanceTable = '<table id="balancetable"><tr><th>Month</th><th>Income total</th><th>Budgeted Expenses</th><th>Expenses total</th><th>Balance<th></tr>'
						+ '<tr><td>' + currentMonth
						+ '</td><td>' + totalIncome
						+ '</td><td>' + totalBudgets
						+ '</td><td>' + totalExpenses
						+ '</td><td>' + balance
						+ '</tr>'

	document.getElementById("Balance").innerHTML = balanceTable;
	}

//get a list of categories, then update the datalist
var updateCategoryDatalist = function() {
	getCategoryList(populateCategoryDatalist);
	}	
	
window.addEventListener("load", currentMonthlyBILoad);	
window.addEventListener("load", currentMonthlyIncLoad);
window.addEventListener("load", currentMonthlyExpLoad);
window.addEventListener("load", updateCategoryDatalist);

document.getElementById("expenseform").addEventListener("submit", function(e){
	e.preventDefault();
	newExpenseSubmit();
	})

document.getElementById("incomeform").addEventListener("submit", function(e){
	e.preventDefault();
	newIncomeSubmit();
	})


