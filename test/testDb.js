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
            db.loadTestData().then(
                () => {
                    console.log("added test data");
                }
            );
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
        it('getAllListings function should return a promise', function() {
            db.getAllListings().should.be.fulfilled;
        });

        it('createNewUser function should return a promise', function() {
            db.createNewUser().should.be.fulfilled;
        });   

        it('createNewListing function should return a promise', function() {
            db.createNewListing().should.be.fulfilled;
        });                  
    });


   
});