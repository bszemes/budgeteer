Budgeteer
by: Balazs Szemes

This should become in the fullness of time a personal expense tracking webapp. It is a learning project, so many things may not be ideally executed.
The main planned functionality is to be able store expense items, budgets, income items, and provide a comparison of these. 
The basic architecture is a nodejs-sequelize backend, with postgres, frontend is html+css+js.

WORK IN PROGRESS, minimal functionality now working, but just for showcasing.

Current plans:

---BASIC SCOPE----------------------
--done  - add income item 
--done  - add expense item
 - add budget item
--done - show items for current month
--done	- list expenses for a time period 
--done	- list incomes for a time period 
- list budgets for a time period 
--done - show monthly balance
--done - count balance
--done - add category
--done - add passable html
--done - add css
--done - add category - expense - budget linking
--done - integrate backend with frontend
- show items from a custom time period 

---PHASE2
- modify existing values
- add multiple expenses in one step
--done(on frontend)- validations
- error handling
--done (return message only fires if store to db returns successfully) - return functions in case of success (data store)
--done - move system variables to config file (DB access, file location for webserver, etc.)
- some documentation (installation instructions)

---PHASE3
- statistics
 - income in a year
 - expense in a year
- tests for backend
 
 
--FUTURE IDEAS
graphs
user management