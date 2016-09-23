// running this file will truncate tables and reload initial test data

var airbnbDB = require('../db.js');

console.log('Initializing DB with test data...');

var p = airbnbDB.initDB();
p.then(
    val => {
            airbnbDB.loadTestData().then(
                () => {console.log("...done");} 
            );

}).catch(
    err => {
        console.log(err);
});