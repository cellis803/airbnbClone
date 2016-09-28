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
                        "latitude TEXT, " +
                        "logitude TEXT, " +
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
                        "email TEXT NOT NULL, " +
                        "listingId TEXT NOT NULL, " +
                        "arrivalDate TEXT, " +
                        "reviewTitle TEXT NOT NULL, " +
                        "rating INTEGER NOT NULL, " +
                        "review TEXT, " +
                        "FOREIGN KEY (email) REFERENCES user(email), " +
                        "FOREIGN KEY (listingId) REFERENCES listing(rowid) " +
                        ")   ");
                    resolve();
                });
            }).then(() => console.log("tables have been created"));
    },

    loadTestData: function () {
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
 
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Remote Lighthouse','Remote lighthouse','House',2,1,0,'122 Front Street','','Bath','ME','04530','USA','888-123-4567','500','Weekly','north-sea-1674007__340.jpg',0,1000,'43.913807','-69.814410')");
                    db.run("INSERT INTO listing VALUES ('cellis803@gmail.com','Pirates Cove','Pirates Cove','Duplex',3,2,1,'1403 South Ocean Boulevard','','Myrtle Beach','SC','29572','USA','888-221-4567','750','Bi-Weekly','lands-end.jpg',1,2000,'33.674007', '-78.899835')");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Dream View','View of Lake Superior','Condo',1,1,0,'82340 state highway 13','','Bayfield','WI','54814','USA','888-223-4567','250','Weekly','superior.jpg',1,1500, '46.817119', '-90.810749')");
                    db.run("INSERT INTO listing VALUES ('akashpandya@gmail.com','Cricket Field View','Cricket Hangout','Apartment',1,1,1,'1415 W. Willow Grove Ave','','Philadelphia','PA','19118','USA','888-221-4444','250','Weekly','cricket.jpg',1,450, '40.087251', '-75.184051')");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Purple Victorian','Quaint Victorian Home','Apartment',1,1,0,'717 Washington Street','','Cape May','NJ','08204','USA','888-222-3333','375','Weekly','purplevictorian.jpg',1,750, '38.935530', '-74.919645')");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Purple Tiny House','Portable Tiny Home','Home',1,1,0,'1316 Madison Ave','','Front Royal','VA','22630','USA','888-444-3333','200','Monthly','purpletinyhouse.jpg',1,350, '38.934826', '-78.205425')");
                    db.run("INSERT INTO listing VALUES ('cellis803@gmail.com','Ship Tree House','Anchors away in a treehouse','House',1,1,0,'160 Douglas Park Rd','','Crescent City','CA','95531','USA','888-221-4444','250','Weekly','shiptreehouse.jpg',1,450, '41.793290', '-124.056765')");
                    db.run("INSERT INTO listing VALUES ('akashpandya@gmail.com','Tree House','Remote Tree House with swinging bridge','House',1,1,1,'5418 Monticello Ave','','Dallas','TX','19116','USA','888-777-9999','200','Bi-Weekly','swingingbridgetreehouse.jpg',0,400, '32.826183', '-96.776574')");

                    db.run("INSERT INTO reservation VALUES (1,'carolynjm4@verizon.net',1,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (2,'cellis803@gmail.com',2,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (3,'carolynjm4@verizon.net',3,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (4,'akashpandya@gmail.com',4,'1474476888675','')");

                    db.run("INSERT INTO review VALUES ('carolynjm4@verizon.net',1,'1474476888675','Far from civilization but a charmer',5,'Loved it. Modern conveniences inside and access to lovely ocean views')");
                    db.run("INSERT INTO review VALUES ('cellis803@gmail.com',2,'1474476888675','Cool adventure with kids',5,'Great location and kids and adults had a blast. No one walked the plank!')");
                    db.run("INSERT INTO review VALUES ('carolynjm4@verizon.net',2,'1474476888675','Not cool',5,'My kinds got on my nerves the whole week, and our car broke down.')");
                    db.run("INSERT INTO review VALUES ('carolynjm4@verizon.net',3,'1474476888675','Disappointing',3,'No power and torrential rain but will try another time')");
                    db.run("INSERT INTO review VALUES ('akashpandya@gmail.com',4,'1474476888675','Stay away',2,'Rooms too small and very noisy. Excellent location.')");
                    resolve();
                });
            });
    },

    getAllListings: function (listingId) {

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

    createNewUser: function (userObj) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT into user values (?, ?)");
                    stmt.run(userObj.email, userObj.name, function (error) {
                        if (error) {
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

    createNewListing: function (listingObj) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
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

                        function (error) {
                            if (error) {
                                reject(error);
                            } else {
                                stmt.finalize();
                                resolve(this.lastID);
                            }
                        });
                });
            });
    },

    deleteListing: function (listingId) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("DELETE from listing where listing.rowid = ?");
                    stmt.run(listingId, function (error) {
                        if (error) {
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

    updateListing: function (listingObj) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {

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

                        function (error) {
                            if (error) {
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

    createNewReview: function (reviewObj) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT into review values (?, ?, ?, ?, ?, ?)");
                    stmt.run(reviewObj.email,
                        reviewObj.listingId,
                        reviewObj.arrivalDate,
                        reviewObj.reviewTitle,
                        reviewObj.rating,
                        reviewObj.review,


                        function (error) {
                            if (error) {
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
    },


    getReviews: function(listingId) {
        var reviewSQL = "SELECT review.*, review.rowid, u.name from review " +
            "INNER JOIN user u on review.email = u.email " +
            "WHERE review.listingId = " + listingId;

        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    db.all(reviewSQL,

                        function (err, rows) {
                            if (err) {
                                reject("something went wrong");
                            } else {
                                console.log(rows.length);
                                resolve(rows);
                            }

                        });
                });
            });
    }
}