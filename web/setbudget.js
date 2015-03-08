//get categories and Budgets for the month, then display:

var categoryDivString = '';

var displayBudgetList = function() {
	var budgetDivString = '';
	var displayCategoryList = function (resultstring) {
		var categoryList = JSON.parse(resultstring);
		
		categoryDivString = '<div class="categorydiv" id="categoridivhead">Category Name</div>';
		budgetDivString = '<div class="budgetdiv" id="budgethead">Budget Amount</div>'
		for (i=0; i<categoryList.length; i++) {categoryDivString += '<div class="categorydiv" id="category' +categoryList[i].id + '">' + categoryList[i].category + '</div>'; 
												budgetDivString += '<div class="budgetdiv" contentEditable="true" id="budget' + categoryList[i].id + '"></div>'
												}
		
		console.log(categoryDivString);
		document.getElementById("categorycolumn").innerHTML = categoryDivString;
		document.getElementById("budgetamountcolumn").innerHTML = budgetDivString;
		currentMonthlyBILoad();
		}

	getCategoryList(displayCategoryList);

	var displayBudgetValuesByCategory = function(resultstring) {
		var budgetList = JSON.parse(resultstring);
		var currentelement = '';
		var currentelementvalue = '';
		for (f=0; f<budgetList.length; f++) {
			currentelement = "budget" + budgetList[f].CategoryId;
			document.getElementById(currentelement).innerHTML = budgetList[f].value;
			}
		}	
		
	var currentMonthlyBILoad = function () { 
	generalDataLoadFromGivenTF("bi", currentMonthStart, currentMonthEnd, displayBudgetValuesByCategory);
	}

}


displayBudgetList();

//get a list of BudgetItems, then display income table



var submitBudgetItems = function() {
	
	var i=1;
	
	var startdate = Date.prototype.toISOString(Date.prototype.setFullYear(d.getFullYear(), d.getMonth(), 1));
	var enddate = Date.prototype.toISOString(Date.prototype.setFullYear(d.getFullYear(), d.getMonth()+1, 1));
	
	while (document.getElementById("budget"+i) != null) {
		var tstStr = document.getElementById("budget"+i).innerHTML
		if ( tstStr.length > 0 ) {
			var rowId = "budget"+i;
			console.log(rowId);
			var budgetItem = {
						value: document.getElementById("budget"+i).innerHTML,
						category: document.getElementById("category"+i).innerHTML,
						startdate: startdate,
						enddate: enddate}
			newBudgetItemSubmit(budgetItem, rowId);
			
			console.log(i);
	
			}
		i++;
		}
}

var feedbackToDisplay = function (rowId, status) {
	if (status == 1) {
		 document.getElementById(rowId).style.background="green";
		 setTimeout(function(){document.getElementById(rowId).style.background="white";}, 300)
	}
}



