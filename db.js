var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('airbnb.db');
var moment = require('moment');

module.exports = {
    initDB: function () {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    console.log("creating tables...");

                    console.log("CREATE TABLE IF NOT EXISTS user ");
                    db.run("CREATE TABLE IF NOT EXISTS user (" + 
                            "email TEXT UNIQUE NOT NULL, " +
                            "name TEXT NOT NULL, " + 
                            "PRIMARY KEY (email) " + 
                            ")");

                    console.log("CREATE TABLE IF NOT EXISTS listing ");
                    db.run("CREATE TABLE IF NOT EXISTS listing (" +
                            "listingId INTEGER NOT NULL, " + 
                            "email TEXT NOT NULL, " + 
                            "description TEXT, " + 
                            "type TEXT NOT NULL, " + 
                            "bedrooms INTEGER, " + 
                            "bathrooms INTEGER, " + 
                            "pool INTEGER NOT NULL, " + 
                            "address1 TEXT, " + 
                            "address2 TEXT, " + 
                            "city TEXT, " + 
                            "state TEXT, " + 
                            "zip TEXT, " +
                            "country TEXT, " + 
                            "phone TEXT, " + 
                            "price REAL, " + 
                            "duration TEXT, " + 
                            "PRIMARY KEY(listingId), " +
                            "FOREIGN KEY(email) REFERENCES user(email) " + 
                            ") WITHOUT ROWID");
                         
                    console.log("CREATE TABLE IF NOT EXISTS reservation ");
                    db.run("CREATE TABLE IF NOT EXISTS reservation (" + 
                            "reservationId INTEGER NOT NULL, " +
                            "email TEXT NOT NULL, " +
                            "listingId TEXT NOT NULL, " +
                            "startDate TEXT NOT NULL, " +
                            "endDATE TEXT NOT NULL, " +
                            "PRIMARY KEY (reservationId), " + 
                            "FOREIGN KEY (email) REFERENCES user(email), " +
                            "FOREIGN KEY (listingId) REFERENCES listing(listingId) " +
                            ") WITHOUT ROWID ");
                    resolve();
                });
            }).then(() => console.log("tables have been created"));
    },
  
    loadTestData: function() {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {

                    // console.log("truncating tables...");
                    // db.run("DELETE FROM bid");
                    // db.run("DELETE FROM auction");
                    // db.run("DELETE FROM user");
                                      

                    // console.log("loading test data...");
                    // db.run("INSERT INTO user VALUES ('Chris')");
                    // db.run("INSERT INTO user VALUES ('Haritha')");
                    // db.run("INSERT INTO user VALUES ('Carolyn')");
                    
                    // db.run("INSERT INTO auction VALUES (1,'Poulan Pro 18\" Chainsaw','used, piece of junk. good luck.',1,111111)");
                    // db.run("INSERT INTO auction VALUES (3,'2008 Honda Civic Si','sporty 6 speed',5000,111111)");


                    resolve();
                });
            });
    },

        getAllListings: function() {
            return new Promise(
                (resolve, reject) => {
                    db.serialize(function () {
                        db.all("SELECT * " +
                                "from listings ",

                            function (err, rows) {
                                if (err) {
                                    reject("something went wrong");                            
                                } else {
                                    resolve(rows);
                                }

                        });
                    });
                });            
        },

        createNewUser: function(userObj) {
            return new Promise(
                (resolve, reject) => {
                    db.serialize( function() {
                        var stmt = db.prepare("INSERT into user values (?, ?)");
                        stmt.run(userObj.email, userObj.name, function(error){
                            if(error) {
                                reject(error);
                            } else {
                                stmt.finalize();
                                resolve();
                            }
                        })
                    })
                }
            )
        },

        createNewListing: function(userObj) {
            return new Promise(
                (resolve, reject) => {

                    resolve();
                }); 
        },
//    GetAllAuctions: function () {
//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize(function () {
//                     db.all("SELECT auction.rowid, auction.userId, title, description, startingBid, endDateTime, u.name as sellerName, bid.bidValue as currentBid, highestBidder, " +
//                             "( select count(*) from bid b3 where b3.auctionId = auction.rowid) as numberOfBids " +
//                             "from auction " + 
//                             "inner join user u on auction.userId = u.rowid " +
//                             "left outer join ( " +

//                             "SELECT b1.*, u.name as highestBidder " +
//                             "FROM bid b1 " +
//                             "INNER JOIN user u on b1.userId = u.rowid " + 
//                             "LEFT OUTER JOIN bid b2 " +
//                             "ON (b1.auctionId = b2.auctionId " +
//                             "    AND b1.bidValue < b2.bidValue) " +
//                             "WHERE b2.bidValue IS NULL " +
//                             ")  as bid on bid.auctionId = auction.rowid ",

//                         function (err, rows) {
//                             if (err) {
//                                 reject("Auction table does not exist");                            
//                             } else {
//                                 resolve(rows);
//                             }

//                     });
//                 });
//             });
//     },

//    GetAnAuction: function (auctionId) {
//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize(function () {
//                     db.all("SELECT auction.rowid, auction.userId, title, description, startingBid, endDateTime, u.name as sellerName, bid.bidValue as currentBid, highestBidder, " +
//                             "( select count(*) from bid b3 where b3.auctionId = auction.rowid) as numberOfBids " +
//                             "from auction " + 
//                             "inner join user u on auction.userId = u.rowid " +
//                             "left outer join ( " +

//                             "SELECT b1.*, u.name as highestBidder " +
//                             "FROM bid b1 " +
//                             "INNER JOIN user u on b1.userId = u.rowid " +                            
//                             "LEFT OUTER JOIN bid b2 " +
//                             "ON (b1.auctionId = b2.auctionId " +
//                             "    AND b1.bidValue < b2.bidValue) " +
//                             "WHERE b2.bidValue IS NULL " +
//                             ")  as bid on bid.auctionId = auction.rowid WHERE auction.rowid = " + auctionId,

//                         function (err, rows) {
//                             if (err) {
//                                 reject("Auction table does not exist");                            
//                             } else {
//                                 resolve(rows[0]);
//                             }

//                     });
//                 });
//             });
//     },    

//     AddUser: function(name){
//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize( function(){
//                     var stmt = db.prepare("INSERT into user values (?)");
//                     stmt.run(name, function(error){
//                         if(error)
//                         {
//                             reject(error);
//                         }
//                         else
//                         {
//                             stmt.finalize();
//                             resolve();
//                         }
//                     })
//                 })
//             }
//         )
//     },

//     GetUserId: function (name) {
//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize(function () {
//                     db.all("SELECT u.rowid, u.name from user u where u.name = '" + name + "'", function (err, rows) {
//                             if (rows.length === 1) {
//                                 resolve(rows[0]);
//                             } else {
//                                 reject("User does not exist");
//                             }
                            
//                         });
//                 });  
//         });
//     },

//     AddAuction: function(userid, title, description, startingbid, duration) {
 
//         var endDate = moment().add(duration, 'days').valueOf();

//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize( function () {
//                     var stmt = db.prepare("INSERT into auction values (?,?,?,?,?)");
//                     stmt.run(userid, title, description, startingbid, endDate, function(error){
//                         if(error)
//                         {
//                             reject(error);
//                         }
//                         else
//                         {
//                             stmt.finalize();
//                             resolve();
//                         }
//                     })
//                 })
//             }
//         )
//     },

//     AddBid: function(userId, auctionId, bidValue) {
//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize( function () {
//                     var stmt = db.prepare("INSERT into bid values (?,?,?,?)");
//                     stmt.run(userId, auctionId, bidValue, new Date(), function(error){
//                         if(error)
//                         {
//                             reject(error);
//                         }
//                         else
//                         {
//                             stmt.finalize();
//                             resolve();
//                         }
//                     })
//                 })
//             }
//         )
//     },

//     tearDown: function() {
//         return new Promise(
//             (resolve, reject) => {
//                 db.serialize(function () {
//                     console.log("dropping tables...");

//                     console.log("DROP TABLE bid");
//                     db.run("DROP TABLE bid");
//                     console.log("DROP TABLE auction");
//                     db.run("DROP TABLE auction"); 
//                     console.log("DROP TABLE user");
//                     db.run("DROP TABLE user");

//                     console.log("tables have been dropped :)");
//                     resolve();
//                 }) 
//         });
//     }
}
