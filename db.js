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
                            "email TEXT NOT NULL, " + 
                            "title TEXT NOT NULL, " +
                            "description TEXT, " + 
                            "type TEXT NOT NULL, " + 
                            "bedrooms INTEGER, " + 
                            "bathrooms INTEGER, " + 
                            "pool INTEGER, " + 
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
                            "FOREIGN KEY(email) REFERENCES user(email) " + 
                            ") ");
                         
                    console.log("CREATE TABLE IF NOT EXISTS reservation ");
                    db.run("CREATE TABLE IF NOT EXISTS reservation (" + 
                            "reservationId INTEGER NOT NULL, " +
                            "email TEXT NOT NULL, " +
                            "listingId TEXT NOT NULL, " +
                            "startDate TEXT NOT NULL, " +
                            "endDATE TEXT NOT NULL, " +
                            "PRIMARY KEY (reservationId), " + 
                            "FOREIGN KEY (email) REFERENCES user(email), " +
                            "FOREIGN KEY (listingId) REFERENCES listing(rowid) " +
                            ") WITHOUT ROWID ");

                    console.log("CREATE TABLE IF NOT EXISTS review ");
                    db.run("CREATE TABLE IF NOT EXISTS review (" + 
                            // "reviewId INTEGER NOT NULL, " +
                            "email TEXT NOT NULL, " +
                            // "listingId TEXT NOT NULL, " +
                            "listingId TEXT, " +
                            "arrivalDate TEXT, " +
                            "reviewTitle TEXT NOT NULL, " +
                            "rating INTEGER NOT NULL, " +
                            "review TEXT, " +
                            // "PRIMARY KEY (reviewId), " + 
                            // "PRIMARY KEY (email), " + 
                            "FOREIGN KEY (email) REFERENCES user(email), " +
                            "FOREIGN KEY (listingId) REFERENCES listing(rowid) " +
                            ")   ");
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
                    db.run("DELETE FROM review");
                      

                    console.log("loading test data...");
                    db.run("INSERT INTO user VALUES ('carolynjm4@verizon.net','Carolyn')");
                    db.run("INSERT INTO user VALUES ('cellis803@gmail.com','Chris')");
                    db.run("INSERT INTO user VALUES ('akashpandya@gmail.com','Akash')");
                    
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Remote Lighthouse','Remote lighthouse','House',2,1,0,'122 Front Street','','Bath','ME','04530','USA','8881234567','500','Weekly','north-sea-1674007__340.jpg',0,1000)");
                    db.run("INSERT INTO listing VALUES ('cellis803@gmail.com','Pirates Cove','Pirates Cove','Duplex',3,2,1,'1403 South Ocean Boulevard','','Myrtle Beach','SC','29572','USA','8882214567','750','Bi-Weekly','img2.png',1,2000)");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Dream View','View of Lake Superior','Condo',1,1,0,'82340 state highway 13','','Bayfield','WI','54814','USA','8882234567','250','Weekly','superior.jpg',1,1500)");
                    db.run("INSERT INTO listing VALUES ('akashpandya@gmail.com','Small Room for rent','Cricket Hangout','Apartment',1,1,1,'1 Cricket Field Cottages Wilton Road','','Salisbury ','','SP2 9NS','GBR','0108882234555','100','Weekly','cottagewbridge.jpg',0,200)");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Purple Victorian','Quaint Victorian Home','Apartment',1,1,0,'717 Washington Street','','Cape May','NJ','08204','USA','8881112223333','375','Weekly','purplevictorian.jpg',1,750)");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Purple Tiny House','Portable Tiny Home','Home',1,1,0,'1316 Madison Ave','','Front Royal','VA','22630','USA','8881114443333','200','Monthly','purpletinyhouse.jpg',1,350)");
                    db.run("INSERT INTO listing VALUES ('cellis803@gmail.com','Ship Tree House','Anchors away in a treehouse','House',1,1,0,'160 Douglas Park Rd','','Crescent City','CA','95531','USA','8882214444','250','Weekly','shiptreehouse.jpg',1,450)");
                    db.run("INSERT INTO listing VALUES ('akashpandya@gmail.com','Tree House','Remote Tree House with swinging bridge','House',1,1,1,'13675 Philmont Ave','','Philadelphia','PA','19116','USA','8881117779999','200','Bi-Weekly','swingingbridgetreehouse.jpg',0,400)");

                    db.run("INSERT INTO reservation VALUES (1,'carolynjm4@verizon.net',1,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (2,'cellis803@gmail.com',2,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (3,'carolynjm4@verizon.net',3,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (4,'akashpandya@gmail.com',4,'1474476888675','')");
                    
                    // db.run("INSERT INTO review VALUES (1,'carolynjm4@verizon.net',1,'1474476888675','Far from civilization but a charmer',5,'Loved it. Modern conveniences inside and access to lovely ocean views')");
                    // db.run("INSERT INTO review VALUES (2,'cellis803@gmail.com',2,'1474476888675','Cool adventure with kids',5,'Great location and kids and adults had a blast. No one walked the plank!')");
                    // db.run("INSERT INTO review VALUES (3,'carolynjm4@verizon.net',3,'1474476888675','Disappointing',3,'No power and torrential rain but will try another time')");
                    // db.run("INSERT INTO review VALUES (4,'akashpandya@gmail.com',4,'1474476888675','Stay away',2,'Rooms too small and very noisy. Excellent location.')");
                    
                    db.run("INSERT INTO review VALUES ('carolynjm4@verizon.net',1,'1474476888675','Far from civilization but a charmer',5,'Loved it. Modern conveniences inside and access to lovely ocean views')");
                    db.run("INSERT INTO review VALUES ('cellis803@gmail.com',2,'1474476888675','Cool adventure with kids',5,'Great location and kids and adults had a blast. No one walked the plank!')");
                    db.run("INSERT INTO review VALUES ('carolynjm4@verizon.net',3,'1474476888675','Disappointing',3,'No power and torrential rain but will try another time')");
                    db.run("INSERT INTO review VALUES ('akashpandya@gmail.com',4,'1474476888675','Stay away',2,'Rooms too small and very noisy. Excellent location.')");
                    resolve();
                });
            });
    },

        getAllListings: function(listingId) {

            var listingSQL = "SELECT listing.*, listing.rowid, u.name from listing " +
                             "INNER JOIN user u on listing.email = u.email ";
            if (listingId) {
                listingSQL = listingSQL + "where listing.rowid = " + listingId;
            }

            return new Promise(
                (resolve, reject) => {
                    db.serialize(function () {
                        db.all(listingSQL,

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
                                resolve(this.lastID);
                            }
                        })
                    })
                }
            );
        },

        createNewListing: function(listingObj) {
            return new Promise(
                (resolve, reject) => {
                    db.serialize( function() {
                        var stmt = db.prepare("INSERT into listing values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                        stmt.run(listingObj.email,
                                 listingObj.title, 
                                 listingObj.description, 
                                 listingObj.type,
                                 listingObj.bedrooms,
                                 listingObj.bathrooms,
                                 listingObj.pool,
                                 listingObj.address1,
                                 listingObj.address2,
                                 listingObj.city,
                                 listingObj.state,
                                 listingObj.zip,
                                 listingObj.country,
                                 listingObj.phone,
                                 listingObj.price,
                                 listingObj.duration,
                                 listingObj.image,
                                 listingObj.petsAllowed,
                                 listingObj.area,

                            function(error){
                                if(error) {
                                    reject(error);
                                } else {
                                    stmt.finalize();
                                    resolve(this.lastID);
                                }
                            });
                    });
                });
        },

        deleteListing: function(listingId) {
            return new Promise(
                (resolve, reject) => {
                    db.serialize( function() {
                        var stmt = db.prepare("DELETE from listing where listing.rowid = ?");
                        stmt.run(listingId, function(error){
                            if(error) {
                                reject(error);
                            } else {
                                stmt.finalize();
                                resolve(this.changes);
                            }
                        });
                    });
                }
            );
        },

        updateListing: function(listingObj) {
            return new Promise(
                (resolve, reject) => {
                    db.serialize( function() {

                        var stmt = db.prepare("UPDATE listing SET " +
                                                "email=?, " +
                                                "title=?, " +
                                                "description=?, " +
                                                "type=?, " +
                                                "bedrooms=?, " +
                                                "bathrooms=?, " +
                                                "pool=?, " +
                                                "address1=?, " +
                                                "address2=?, " +
                                                "city=?, " +
                                                "state=?, " +
                                                "zip=?, " +
                                                "country=?, " +
                                                "phone=?, " +
                                                "price=?, " +
                                                "duration=?, " +
                                                "image=?, " +
                                                "petsAllowed=?, " +
                                                "area=? " +
                                                "WHERE rowid = " + listingObj.rowid);
                        stmt.run(listingObj.email,
                                 listingObj.title, 
                                 listingObj.description, 
                                 listingObj.type,
                                 listingObj.bedrooms,
                                 listingObj.bathrooms,
                                 listingObj.pool,
                                 listingObj.address1,
                                 listingObj.address2,
                                 listingObj.city,
                                 listingObj.state,
                                 listingObj.zip,
                                 listingObj.country,
                                 listingObj.phone,
                                 listingObj.price,
                                 listingObj.duration,
                                 listingObj.image,
                                 listingObj.petsAllowed,
                                 listingObj.area,

                            function(error){
                                if(error) {
                                    reject(error);
                                    console.log(error);
                                } else {
                                    stmt.finalize();
                                    resolve(this.changes);
                                }
                            });
                    });
                });
        },        

        createNewReview: function(reviewObj) {
            return new Promise(
                (resolve, reject) => {
                    db.serialize( function() {
                        var stmt = db.prepare("INSERT into review values (?, ?, ?, ?, ?, ?)");
                        stmt.run(reviewObj.email,
                                 reviewObj.listingId, 
                                 reviewObj.arrivalDate, 
                                 reviewObj.reviewTitle,
                                 reviewObj.rating,
                                 reviewObj.review,
        

                            function(error){
                                if(error) {
                                    reject(error);
                                    console.log("problem in db" + reviewObj);
                                } else {
                                    stmt.finalize();
                                    console.log("Inserted rowid=" + this.lastID);
                                    resolve(this.lastID);
                                }
                            });
                    });
                });
        }
}
