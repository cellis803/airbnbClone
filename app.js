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
app.use('/', express.static('html'));
app.use('/js/', express.static('js'));
app.use('/styles/', express.static('styles'));

app.post('/login', function(request, response) {
  
    airbnbDB.getUserId(request.body.username).then(
        user => {
            response.send(user);
        }).catch(err => {
                console.log(err);
                response.status(500);
                response.send(err);                
        });
});

app.post('/user', function (request, response) {
    console.log("add a user");
    airbnbDB.createNewUser(request.body).then(
        (rowid) => {
            response.json({"rowid":rowid});
            response.send();
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

            response.json({"rowid":rowid});
            response.send();
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
            console.log(listings.length);
            response.send(listings);


        }).catch(
        err => {
            console.log(err);
            response.status(500);
            response.send();
        });
});

app.post('/review', function (request, response) {
    console.log("add review");

    airbnbDB.createNewReview(request.body).then(
        (rowid) => {
            response.json({"rowid":rowid});
            response.send();
        }).catch(err => {
            console.log(err);
            console.log('in app');
            response.status(500);
            response.send(err);
        });
});

var server = app.listen(8080, function () {
    console.log('Starting airbnb clone server...');
    console.log('Example app listening on port 8080...');

    var p = airbnbDB.initDB();
    p.then(
        val => {

            if (process.argv[2] === "-loadTestData") {
                airbnbDB.loadTestData().then(
                   () => {app.emit('running', null);} 
                );
            } else {
                app.emit('running', null);
            }
   
        }).catch(
        err => {
            console.log(err);
        });
});

module.exports = app;