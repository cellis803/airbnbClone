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
                    
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Remote Lighthouse','Remote lighthouse','house',2,1,0,'1 Lighthouse Way','','Bath','ME','04530','USA','8881234567','500','one week','img1.png',1000,0)");
                    db.run("INSERT INTO listing VALUES ('cellis803@gmail.com','Pirates Cove','Pirates Cove','townhouse',3,2,1,'506 Captain Hook Drive','','Myrtle Beach','SC','29572','USA','8882214567','750','two weeks','img2.png',2000,1)");
                    db.run("INSERT INTO listing VALUES ('carolynjm4@verizon.net','Dream View','View of Lake Superior','condo',1,1,0,'500 Lakeview','','Wayupthere','WI','09998','USA','8882234567','250','one week','img3.png',1500,1)");
                    db.run("INSERT INTO listing VALUES ('akashPandya@gmail.com','Small Room for rent','Cricket Hangout','room',1,1,1,'222 Bowler Lane','','London','','90909','GBR','0108882234555','100','one week','img4.jpg',0,0)");

                    db.run("INSERT INTO reservation VALUES (1,'carolynjm4@verizon.net',1,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (2,'cellis803@gmail.com',2,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (3,'carolynjm4@verizon.net',3,'1474476888675','')");
                    db.run("INSERT INTO reservation VALUES (4,'akashPandya@gmail.com',4,'1474476888675','')");

                    resolve();
                });
            });
    },

        getAllListings: function(listingId) {

            var listingSQL = "SELECT listing.rowid, listing.*, u.name from listing " +
                             "INNER JOIN user u on listing.email = u.email ";
            if (listingId) {
                listingSQL = listingSQL + "where listingId = " + listingId;
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
            )
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
                                    console.log("Inserted rowid=" + this.lastID);
                                    resolve(this.lastID);
                                }
                            });
                    })
                }
            )
        }
}
