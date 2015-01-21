
//create a table from an Income JSON
var testJson = '[{"id":1,"description":"bev�t","value":"25468","date":"2013-03-22T00:00:00.000Z"}]';
var incomeArray = JSON.parse(testJson);

var incomeTable = '<table id="incometable">' + '<tr><th>Income amount</th><th>Income description</th><th>Date of Income </th></tr>'
for (i=0; i<incomeArray.length; i++) {
 incomeTable += '<tr> <td class="number">' + incomeArray[i].value + '</td><td>' + incomeArray[i].description + '</td><td>' + incomeArray[i].date.substr(0, 10) + '</td></tr>'; }
incomeTable += '</table>';

document.getElementById("Income").innerHTML = incomeTable;

var testJson = '[{"id":1,"description":"dfgdfg","value":"-4564","category":"stuffert","date":"2013-03-15T00:00:00.000Z","CategoryId":3},{"id":2,"description":"newspend","value":"-2456","category":"blollokz","date":"2013-03-15T00:00:00.000Z","CategoryId":8},{"id":1,"description":"dfgdfg","value":"-4564","category":"stuffert","date":"2013-03-15T00:00:00.000Z","CategoryId":3}]'
var expenseArray = JSON.parse(testJson);


function compare(a,b) {
  if (a.category < b.category)
     return -1;
  if (a.category > b.category)
    return 1;
  return 0;
}

expenseArray.sort(compare);

var detailedExpenseTable= '<table id="detailedexpensetable">' + '<tr><th>Expense Category</th>' 
																+ '<th>Expense description</th>' 
																+ '<th>Expense Date</th>' 
																+ '<th>Expense Amount</th></tr>'
for (i=0; i<expenseArray.length; i++) {
 detailedExpenseTable += '<tr> <td>' + expenseArray[i].category + '</td>'
								+ '<td>' + expenseArray[i].description + '</td>'
								+ '<td>'+ expenseArray[i].date.substr(0, 10) +'</td>'
								+ '<td class="number">' + expenseArray[i].value + '</td></tr>';
									}

 
 detailedExpenseTable += '</table>';



var expenseByCategoryArray = [];

i=0;

for (i=0, n=0; i<expenseArray.length; i++, n++) {

	expenseByCategoryArray[n] = expenseArray[i];
	expenseByCategoryArray[n].value = Number(expenseByCategoryArray[n].value);
	 
	 while (expenseArray[i].category == expenseArray[i+1].category) {
	 i++;
	 expenseByCategoryArray[n].value += Number(expenseArray[i].value);
	  if (expenseArray[i+1] == undefined)  break;
		}
	}

var expenseTable = '<table id="expensetable">' + '<tr><th>Expense Category</th><th>Budget</th><th>Incurred Expenses </th></tr>'
for (i=0; i<expenseByCategoryArray.length; i++) {
 expenseTable += '<tr> <td>' + expenseByCategoryArray[i].category + '</td><td>' /*+ expenseByCategoryArray[i].description*/ + '</td><td class="number">' + expenseByCategoryArray[i].value + '</td></tr>'; }
expenseTable += '</table>';

document.getElementById("Expenses").innerHTML = expenseTable;
	


document.getElementById("detailedexpense").innerHTML = detailedExpenseTable;