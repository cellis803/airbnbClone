var express = require('express');
var airbnbDB = require('./db.js');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', express.static('html'));
app.use('/js/', express.static('js'));

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

// app.post('/user', function (request, response) {
//     console.log("add a user");
//     var name = request.body.name;
//     ebayDB.AddUser(name).then(
//         () => {
//             response.send("user added");
//         }).catch(err => {
//             console.log(err);
//             response.status(500);
//             response.send(err);
//         });
// });

// app.post('/bid', function (request, response) {
//     console.log("bidding on an item");
//     var userId = request.body.userId;
//     var auctionId = request.body.auctionId;
//     var bidValue = request.body.bidValue;

//     console.log(userId +  ", " + auctionId + ", " + bidValue);
//     ebayDB.AddBid(userId, auctionId, bidValue).then(
//         () => {
//             ebayDB.GetAnAuction(auctionId).then(
//             auction => {
//                 response.send(auction);

//             })
//         }).catch(err => {
//             console.log(err);
//             response.status(500);
//             response.send(err);
//         });
// });

// app.post('/auction', function (request, response) {
//     console.log("add auction item");
//     var userId = request.body.userId;
//     var title = request.body.title;
//     var description = request.body.description;
//     var startingBid = request.body.startingBid;
//     var duration = request.body.duration;
//     ebayDB.AddAuction(userId, title, description, startingBid, duration).then(
//         () => {
//             ebayDB.GetAllAuctions().then(
//             auctions => {
//                 response.send(auctions);

//             })
//         }).catch(err => {
//             console.log(err);
//             response.status(500);
//             response.send(err);
//         });
// });

// app.get('/auctions/:auctionId', function (request, response) {
//     console.log("get specific auction item");
//     var auctionId = request.params.auctionId;
//     ebayDB.GetAnAuction(auctionId).then(
//         auctions => {
//             response.send(auctions);

//         }).catch(
//         err => {
//             //handle all errors
//             console.log(err);
//             response.status(500);
//             response.send();
//         });
// });

// app.get('/auctions/', function (request, response) {
//     console.log("getting the auction feed");
//     ebayDB.GetAllAuctions().then(
//         auctions => {
//             response.send(auctions);

//         }).catch(
//         err => {
//             //handle all errors
//             console.log(err);
//             response.status(500);
//             response.send();
//         });
// });

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
            //handle all errors
            console.log(err);
        });
});
module.exports = server;