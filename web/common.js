//general js files containing reused functions

//Get a date
var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var currentMonth = month[d.getMonth()]; 
var currentMonthStart = Date.prototype.toISOString(Date.prototype.setFullYear(d.getFullYear(), d.getMonth(), 1));
var currentMonthEnd = Date.prototype.toISOString(Date.prototype.setFullYear(d.getFullYear(), d.getMonth()+1, 1));

function compare(a,b) {
  if (a.category < b.category)
     return -1;
  if (a.category > b.category)
    return 1;
  return 0;
}