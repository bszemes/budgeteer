//database module with sequelize.js
var Sequelize = require('sequelize');
var webserver = require ('./webserver.js');


// db connection
exports.seqDbConn = function() {
  sequelize = new Sequelize('playground2', 'postgres', 'alpakka', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    })
		
	sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
  };

//create model and sync it

exports.seqResetDb = function() {
 Expense = sequelize.define('Expense', {
    description: Sequelize.STRING,
	value: Sequelize.BIGINT,
	category: Sequelize.STRING,
	date: Sequelize.DATE
}, {
  tableName: 'expenses', // this will define the table's name
  timestamps: false           // this will deactivate the timestamp columns
});

 Category = sequelize.define('Category', {
    category: { type: Sequelize.STRING,  unique: 'categoryIndex'}
}, {
  tableName: 'category', // this will define the table's name
  timestamps: false           // this will deactivate the timestamp columns
});

 Income = sequelize.define('Income', {
    description: Sequelize.STRING,
	value: Sequelize.BIGINT,
	date: Sequelize.DATE
}, {
  tableName: 'incomes', // this will define the table's name
  timestamps: false           // this will deactivate the timestamp columns
});

BudgetItem = sequelize.define('BudgetItem', {
    value: Sequelize.BIGINT,
	category: { type: Sequelize.STRING,  unique: 'compositeIndex'},
	startdate: { type: Sequelize.DATE,  unique: 'compositeIndex'},
	enddate: { type: Sequelize.DATE,  unique: 'compositeIndex'}
}, 
{
  tableName: 'budgetitems', // this will define the table's name
  timestamps: false           // this will deactivate the timestamp columns
});

Category.hasMany(Expense);
Category.hasMany(BudgetItem);
Expense.belongsTo(Category);
BudgetItem.belongsTo(Category); 


sequelize
  .sync({ force: false })
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err)
     } else {
       console.log('It worked!')
     }
  });
  
}
  
  
  
// new expense storing  
exports.seqexpstore = function(newexp) {

Expense
  .create(newexp)
  .complete(function(err, newexp) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
    }
	Category.findOrCreate({ where: {category: newexp.category }}).spread(function(category, created) {
	        newexp.setCategory(category).complete(function(err) { 
      newexp.getCategory().complete(function(err, target) {
        console.log(target)
				})
    })
 })
  })  

}

// new category storing
exports.seqCatStore = function(newcat) {

Category
  .create(newcat)
  .complete(function(err, category) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
	  }
  });

}

//new income item storing
exports.seqincstore = function(newinc) {

Income
  .create(newinc)
  .complete(function(err, income) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
	  }
   
  })

}

//new BudgetItem item storing
exports.seqBIStore = function(newBudgetItem) {

BudgetItem.create(newBudgetItem).complete(function(err, newbi) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
	  }
	  Category.findOrCreate({ where: {category: newBudgetItem.category }}).spread(function(category, created) {
	        newbi.setCategory(category).complete(function(err) { 
      newbi.getCategory().complete(function(err, target) {
        console.log(target)
				})
    })
 })
  })
  } ;
  
    //new Monthly Query for Expense data retrieval 

 exports.monthlyExpDataQuery = function (newExpMQ, callback) {


  Expense.findAll({where: {date: { between: [newExpMQ.startdate, newExpMQ.enddate]}}}).then(function(expres) { 
  	  console.log(expres);
	  callback(expres);
  })
  }
  
//new Monthly Query for Income data retrieval 

 exports.monthlyIncDataQuery = function (newIncMQ, callback) {


  Income.findAll({where: {date: { between: [newIncMQ.startdate, newIncMQ.enddate]}}}).then(function(incres) { 
  	  console.log(incres);
	  callback(incres);
  })
  }


//new Monthly Query for Budget data retrieval 

 exports.monthlyBIDataQuery = function (newBIMQ, callback) {

  BudgetItem.findAll({where: Sequelize.and( {startdate: newBIMQ.startdate}, {enddate: newBIMQ.enddate})}).then(function(bires) { 
  	  console.log(bires);
	  callback(bires);
  })
  }  

  //new Monthly Query data retrieval 
/*
  exports.seqMQuery = function(newMQ) {

var allResults = []
var adate = new Date();
var bdate = new Date();
adate.setTime(newMQ.startdate);
adate = adate.toUTCString();
bdate.setTime(newMQ.enddate); 
bdate = bdate.toUTCString();

console.log(adate, bdate);


 var counter = 0; return function () {return counter += 1; if (counter == 3) {
	webserver.returnRes(allResults);
 }}();

BudgetItem.findAll({where: { startdate: adate}}).then(function(budgetres) {
	  console.log(budgetres);
	  allResults[0] = budgetres; counter();
	    })
		
Income.findAll({where: { date: { between: [adate, bdate]}}}).then(function(incres) {
	  allResults[1] = incres; counter();
	    })	
		
Expense.findAll({where: {date: { between: [adate, bdate]}}}).then(function(expres) {
	  allResults[2] = expres; counter();
	    })		
		
  } ;
 */


