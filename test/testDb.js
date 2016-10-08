//mocha tests for DB layer
var db = require('../db');

var chai = require('chai');
var expect = require("chai").expect;
chai.should(); 

var assert = chai.assert;

before(function() {
  db.initDB().then(
        success => {

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
                },
                (fail) => {
                    console.log(fail);
                    done();
                });
        });

        it('getAllListings function should return a single listing', function(done) {
            var listingId = '2';
            db.getAllListings(listingId).then(
                (listings) => {
                    assert.equal(listings.length, 1, 'there should be 1 listing');
                    done();
                },
                (fail) => {
                    console.log(fail);
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

        it('login function should return valid user', function(done) {
            
            var emailAddr = "cellis803@gmail.com";

            db.login(emailAddr).then(
                (result) => {
                    expect(result.email).should.exist;
                    done();
                }
            );

        });          

        it('createNewListing function should return new rowid', function(done) {

            var listingObj = { address1: 'test',                                                                                                                                                                                             
                    city: 'Baltimore',                                                                                                                                                                                            
                    state: 'MD',                                                                                                                                                                                                  
                    zip: '21047',                                                                                                                                                                                                 
                    country: 'USA',                                                                                                                                                                                               
                    type: 'House',                                                                                                                                                                                                
                    price: '500',                                                                                                                                                                                                 
                    duration: 'Weekly',                                                                                                                                                                                           
                    title: 'Cucumber Test Listing',                                                                                                                                                                               
                    description: 'you will not be disappointed',                                                                                                                                                                  
                    bedrooms: '3',                                                                                                                                                                                                
                    bathrooms: '2',                                                                                                                                                                                               
                    area: '1000',                                                                                                                                                                                                 
                    pool: '1',                                                                                                                                                                                                    
                    petsAllowed: '1',                                                                                                                                                                                             
                    email: 'cellis803@gmail.com',                                                                                                                                                                                 
                    phone: '4109655500',                                                                                                                                                                                          
                    image: 'temp.png',                                                                                                                                                                                            
                    name: 'cellis803@gmail.com'
                }    

            db.createNewListing(listingObj).then(
                (result) => {
                    assert.isNotNull(result, 'new row id was returned');
                    done();
                }
            );
        });

        it('deleteListing function should return changes', function(done) {
            db.deleteListing(1).then(
                (result) => {
                    assert.equal(result, 1);
                    done();
                }
            );
        });     

        it('updateListing function should return changes', function(done) {
            
            var listingObj = { rowid: 2,
                    address1: 'test',                                                                                                                                                                                             
                    city: 'Baltimore',                                                                                                                                                                                            
                    state: 'MD',                                                                                                                                                                                                  
                    zip: '21047',                                                                                                                                                                                                 
                    country: 'USA',                                                                                                                                                                                               
                    type: 'House',                                                                                                                                                                                                
                    price: '500',                                                                                                                                                                                                 
                    duration: 'Weekly',                                                                                                                                                                                           
                    title: 'mocha updated title',                                                                                                                                                                               
                    description: 'you will not be disappointed',                                                                                                                                                                  
                    bedrooms: '3',                                                                                                                                                                                                
                    bathrooms: '2',                                                                                                                                                                                               
                    area: '1000',                                                                                                                                                                                                 
                    pool: '1',                                                                                                                                                                                                    
                    petsAllowed: '1',                                                                                                                                                                                             
                    email: 'cellis803@gmail.com',                                                                                                                                                                                 
                    phone: '4109655500',                                                                                                                                                                                          
                    image: 'temp.png',                                                                                                                                                                                            
                    name: 'cellis803@gmail.com'
            };       

            db.updateListing(listingObj).then(
               
                (result) => {
                    assert.equal(result, 1);
                    done();
                }
            );
        });

        it('createNewReview function should return new rowid', function(done) {

            var reviewObj = { email: 'cellis803@gmail.com',                                                                                                                                                                                             
                    listingId: '1',                                                                                                                                                                                            
                    arrivalDate: '09-2016',                                                                                                                                                                                                  
                    reviewTitle: 'this is my test review',                                                                                                                                                                                                 
                    rating: '5',
                    review: 'this is my review.'
            };  
            
            db.createNewReview(reviewObj).then(
                (result) => {
                    console.log(result);
                    assert.isNotNull(result, 'new row id was returned');
                    done();
                }
            );
        });  

        it('getReviews function should return reviews for a given listing', function(done) {
            var byListingId = '2';
            db.getReviews(byListingId).then(
                (reviews) => {
                    assert.isAtLeast(reviews.length, 2, 'there are at least 2 reviews');
                    done();
                },
                (fail) => {
                    console.log(fail);
                    done();
                });
        });              

    });
});