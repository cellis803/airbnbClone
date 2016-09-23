//mocha tests for DB layer


var db = require('../db');

var chai = require('chai');
var expect = require("chai").expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised); 
chai.should(); 

var assert = chai.assert;

before(function() {
  db.initDB().then(
        success => {
            // db.loadTestData().then(
            //     () => {
            //         console.log("added test data");
            //     }
            // );
        }).catch(err => {
                console.log(err);
                response.status(500);
                response.send(err);                
        });
  
});

describe('airbnb Clone DB tests', function () {

    describe('test nothing', function () {
        it('should pass', function() {
            assert.isTrue(true);
        });
    });

    describe('testing basic funtions', function() {
        it('getAllListings function should return some listings', function(done) {
            db.getAllListings().then(
                (listings) => {
                    assert.isAtLeast(listings.length, 3, 'there are at least 3 listings');
                    done();
                });
        });

        it('createNewUser function should return new user ID', function(done) {
            
            var UserObj = function(email, name) {
                this.email = email;
                this.name = name;
            };

            var user = new UserObj(Math.random().toString(36).substring(7), "Chris Ellis");
           
            db.createNewUser(user).then(
                (result) => {
                    var json = JSON.stringify(eval("(" + result + ")"));
                    expect(json.rowid).should.exist;
                    done();
                }
            );

        });   

        it('createNewListing function should return a promise', function() {
            db.createNewListing().should.be.fulfilled;
        });                  
    });
   
});