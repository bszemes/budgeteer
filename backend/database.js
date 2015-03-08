//database module with sequelize.js


var config = require ('./config.json');
var Sequelize = require(config.sequelize);
var webserver = require ('./webserver.js');

// db connection
exports.seqDbConn = function() {
	sequelize = new Sequelize(config.dbname, config.dbuser, config.dbpwd, {
		dialect: config.dialect,
		port:    config.dbport,
		})
		
	sequelize
	.authenticate()
	.complete(function(err) {
		if (!!err) {console.log('Unable to connect to the database:', err)}
		else {console.log('Connection has been established successfully.')}
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
			tableName: 'expenses', 
			timestamps: false           
			});

	Category = sequelize.define('Category', {
		category: { type: Sequelize.STRING,  unique: 'categoryIndex'}
		}, {
			tableName: 'category', 
			timestamps: false           
				});

	Income = sequelize.define('Income', {
		description: Sequelize.STRING,
		value: Sequelize.BIGINT,
		date: Sequelize.DATE
		}, {
			tableName: 'incomes', 
			timestamps: false           
			});

	BudgetItem = sequelize.define('BudgetItem', {
		value: Sequelize.BIGINT,
		category: { type: Sequelize.STRING,  unique: 'compositeIndex'},
		startdate: { type: Sequelize.DATE,  unique: 'compositeIndex'},
		enddate: { type: Sequelize.DATE,  unique: 'compositeIndex'}
		}, {
			tableName: 'budgetitems', 
			timestamps: false           
			});

	Category.hasMany(Expense);
	Category.hasMany(BudgetItem);
	Expense.belongsTo(Category);
	BudgetItem.belongsTo(Category); 

	sequelize
		.sync({ force: false })
		.complete(function(err) {
			if (!!err) {console.log('An error occurred while creating the table:', err)}
			else {console.log('It worked!')}
			});
  
	}
  
  
  
// new expense storing  
exports.seqexpstore = function(newexp, callback) {
	
	Expense
		.create(newexp)
		.complete(function(err, newexp) {
			if (!!err) {console.log('The instance has not been saved:', err)} 
			else {console.log('We have a persisted instance now')}
			Category.findOrCreate({ where: {category: newexp.category }}).spread(function(category, created) {
				newexp.setCategory(category).complete(function(err) { 
					newexp.getCategory().complete(function(err, target) {
						callback();
						})
					})
				})
			})  
 
	}

	
	
// epxerimental new BI storing/updating	
	
	exports.seqBIStore = function(newBudgetItem, callback) {
	
	BudgetItem.findOne({where: Sequelize.and( {startdate: newBudgetItem.startdate},
												{enddate: newBudgetItem.enddate},
												{category: newBudgetItem.category})})
			.then(function(bires) { 
			console.log(bires);
				if (bires == null) {
					BudgetItem
						.create(newBudgetItem)
						.complete(function(err, newbi) {
							if (!!err) {console.log('The instance has not been saved:', err)}
							else { console.log('We have a persisted instance now')}
								Category.findOrCreate({ where: {category: newbi.category }}).spread(function(category, created) {
								newbi.setCategory(category).complete(function(err) { 
								newbi.getCategory().complete(function(err, target) {
									callback();
										})
									})
								})
							})
			
					}
					
				if (bires != null) {BudgetItem.upsert(newBudgetItem)	
					.complete(function(err, created) {
						if (!!err) {console.log('The instance has not been saved:', err)}
							else { console.log('updated')}
						callback();
						})
					}
	
})
}
	
	
	
	
/*	
//new BudgetItem item storing
exports.seqBIStore = function(newBudgetItem, callback) {

	BudgetItem
		.create(newBudgetItem)
		.complete(function(err, newbi) {
			if (!!err) {console.log('The instance has not been saved:', err)}
			else { console.log('We have a persisted instance now')}
			Category.findOrCreate({ where: {category: newbi.category }}).spread(function(category, created) {
				newbi.setCategory(category).complete(function(err) { 
					newbi.getCategory().complete(function(err, target) {
						callback();
						})
					})
				})
			})
	}
*/



// new category storing
exports.seqCatStore = function(newcat, callback) {

	Category
		.create(newcat)
		.complete(function(err, category) {
			if (!!err) {console.log('The instance has not been saved:', err)}
			else {console.log('We have a persisted instance now');
				callback();
				}
			});
	}

//new income item storing
exports.seqincstore = function(newinc, callback) {

	Income
		.create(newinc)
		.complete(function(err, income) {
			if (!!err) {console.log('The instance has not been saved:', err)}
			else {console.log('We have a persisted instance now');
				callback();
				}
   			})
	}


  
    //data retrievals

 exports.monthlyExpDataQuery = function (newExpMQ, callback) {

	Expense.findAll({where: {date: { between: [newExpMQ.startdate, newExpMQ.enddate]}}}).then(function(expres) { 
		callback(expres);
		})
	}
 
 exports.monthlyIncDataQuery = function (newIncMQ, callback) {

	Income.findAll({where: {date: { between: [newIncMQ.startdate, newIncMQ.enddate]}}}).then(function(incres) { 
		callback(incres);
		})
	}

 exports.monthlyBIDataQuery = function (newBIMQ, callback) {

	BudgetItem.findAll({where: Sequelize.and( {startdate: newBIMQ.startdate}, {enddate: newBIMQ.enddate})}).then(function(bires) { 
		callback(bires);
		})
	}  
   
 exports.categoryQuery = function (callback) {

	Category.findAll().then(function(catres) { 
		callback(catres);
		})
	} 
  
