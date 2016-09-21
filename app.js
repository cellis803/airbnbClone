var express = require('express');
var airbnbDB = require('./db.js');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/static', express.static(__dirname +'/'));
 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/listing.html');
 });  

// app.post('/login', function(request, response) {
  
//     ebayDB.GetUserId(request.body.username).then(
//         user => {
//             response.send(user);
//         }).catch(err => {
//                 console.log(err);
//                 response.status(500);
//                 response.send(err);                
//         });
// });

app.post('/user', function (request, response) {
    console.log("add a user");
    airbnbDB.createNewUser(request.body).then(
        (rowid) => {
            response.send(rowid);
        }).catch(err => {
            console.log(err);
            response.status(500);
            response.send(err);
        });
});

app.post('/listing', function (request, response) {
    console.log("add listing");

    airbnbDB.createNewListing(request.body).then(
        (rowid) => {
            response.send(rowid);
        }).catch(err => {
            console.log(err);
            response.status(500);
            response.send(err);
        });
});

app.get('/listings/:listingId', function (request, response) {
    console.log("get specific listing");
    var listingId = request.params.listingId;
    airbnbDB.getAllListings(listingId).then(
        listings => {
            response.send(listings[0]);

        }).catch(
        err => {
            console.log(err);
            response.status(500);
            response.send();
        });
});

app.get('/listings', function (request, response) {
    console.log("getting all listings");
    airbnbDB.getAllListings().then(
        listings => {
            response.send(listings);

        }).catch(
        err => {
            console.log(err);
            response.status(500);
            response.send();
        });
});

var server = app.listen(8080, function () {
    console.log('Starting airbnb clone server...');
    console.log('Example app listening on port 8080...');

    var p = airbnbDB.initDB();
    p.then(
        val => {

            if (process.argv[2] === "-loadTestData") {
                airbnbDB.loadTestData();
            }
   
        }).catch(
        err => {
            console.log(err);
        });
});
module.exports = server;