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
                            "image TEXT, " +
                            "petsAllowed INTEGER, " +
                            "area INTEGER, " +
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

                    console.log("truncating tables...");
                    db.run("DELETE FROM reservation");
                    db.run("DELETE FROM listing");
                    db.run("DELETE FROM user");
                                      

                    console.log("loading test data...");
                    db.run("INSERT INTO user VALUES ('carolynjm4@verizon.net','Carolyn')");
                    db.run("INSERT INTO user VALUES ('cellis803@gmail.com','Chris')");
                    db.run("INSERT INTO user VALUES ('akashPandya@gmail.com','Akash')");
                    
                    db.run("INSERT INTO listing VALUES (1,'carolynjm4@verizon.net','Remote lighthouse','house',2,1,0,'1 Lighthouse Way','','Bath','ME','04530','USA','8881234567','500','one week','img1.png',1000,0)");
                    db.run("INSERT INTO listing VALUES (2,'cellis803@gmail.com','Pirates Cove','townhouse',3,2,1,'506 Captain Hook Drive','','Myrtle Beach','SC','29572','USA','8882214567','750','two weeks','img2.png',2000,1)");
                    db.run("INSERT INTO listing VALUES (3,'carolynjm4@verizon.net','View of Lake Superior','condo',1,1,0,'500 Lakeview','','Wayupthere','WI','09998','USA','8882234567','250','one week','img3.png',1500,1)");
                    db.run("INSERT INTO listing VALUES (4,'akashPandya@gmail.com','Cricket Hangout','room',1,1,1,'222 Bowler Lane','','London','','90909','GBR','0108882234555','100','one week','img4.png',0,0)");

                    db.run("INSERT INTO reservation VALUES (1,'carolynjm4@verizon.net',1,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (2,'cellis803@gmail.com',2,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (3,'carolynjm4@verizon.net',3,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (4,'akashPandya@gmail.com',4,'1474476888675','')");

                    resolve();
                });
            });
    },

        getAllListings: function() {
            return new Promise(
                (resolve, reject) => {
                    db.serialize(function () {
                        db.all("SELECT * " +
                                "from listing ",

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
