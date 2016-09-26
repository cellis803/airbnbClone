var request = require('supertest');
var rewire = require('rewire');
var chai = require('chai');
var assert = chai.assert;

var mockDbJs = {
            
            testUserObj: {
                "email" : "test@ssa.gov",
                "name" : "testName"
            },

            testListingObj: { address1: 'test',                                                                                                                                                                                             
                city: 'Baltimore',                                                                                                                                                                                            
                state: 'MD',                                                                                                                                                                                                  
                zip: '21047',                                                                                                                                                                                                 
                country: 'USA',                                                                                                                                                                                               
                type: 'House',                                                                                                                                                                                                
                price: '500',                                                                                                                                                                                                 
                duration: 'Weekly',                                                                                                                                                                                           
                title: 'Mocha Test Listing',                                                                                                                                                                               
                description: 'you will not be disappointed',                                                                                                                                                                  
                bedrooms: '3',                                                                                                                                                                                                
                bathrooms: '2',                                                                                                                                                                                               
                area: '1000',                                                                                                                                                                                                 
                pool: '1',                                                                                                                                                                                                    
                petsAllowed: '1',                                                                                                                                                                                             
                email: 'test@ssa.gov',                                                                                                                                                                                 
                phone: '4109655500',                                                                                                                                                                                          
                image: 'temp.png',                                                                                                                                                                                            
                name: 'test@ssa.gov'

            },

            testReviewObj : { 
                    email: 'cellis803@gmail.com',                                                                                                                                                                                             
                    listingId: '1',                                                                                                                                                                                            
                    arrivalDate: '09-2016',                                                                                                                                                                                                  
                    reviewTitle: 'this is my test review',                                                                                                                                                                                                 
                    rating: '5',
                    review: 'this is my review.'
            },             
            
            initDB: function() {
                return new Promise(
                    (resolve, reject) => {
                        resolve();
                    });
            },

            createNewUser: function(userObj) {
                assert.deepEqual(userObj, this.testUserObj);
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });
            },

            createNewListing: function(listingObj) {
                assert.deepEqual(listingObj, this.testListingObj);
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });                
            },

            getAllListings: function() {
                return new Promise(
                    (resolve, reject) => {
                        resolve(new Array(this.testListingObj));
                    });      
            },

            deleteListing: function(listingId) {
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });  
            },

            updateListing: function(listingObj) {
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });             
            },        

            createNewReview: function(reviewObj) {
                assert.deepEqual(reviewObj, this.testReviewObj)
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });                  
            }            
};  


describe('airbnb Clone RESTful API tests', function () {
    var server;
    beforeEach(function () {
        //server = require('../app.js');
        server = rewire("../app.js");
        server.__set__("airbnbDB", mockDbJs);  
    });

    afterEach(function () {
        server.close();
    });


    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('responds 404 for invalid path', function testPath(done) {
        request(server)
        .get('/foo/bar')
        .expect(404, done);
    });

    it('POST /user should create a new user', function testSlash(done) {
        request(server)
            .post('/user')
            .send(mockDbJs.testUserObj)
            .expect({rowid: 1}, done);
    }); 

    it('POST /listing should create a new listing', function testSlash(done) {
        request(server)
            .post('/listing')
            .send(mockDbJs.testListingObj)
            .expect({rowid: 1}, done);
    }); 

    it('PUT /listing should update a listing', function testSlash(done) {
        request(server)
            .put('/listing')
            .send(mockDbJs.testListingObj)
            .expect({rowid: 1}, done);
    }); 

    it('DELETE /listing/1 should delete a listing', function testSlash(done) {
        request(server)
            .delete('/listing/1')
            .expect({"deleted rows": 1}, done);
    }); 

    it('GET /listings/1 should return a listing', function testSlash(done) {
        request(server)
            .get('/listings/1')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, result) {
                assert.deepEqual(result.body, mockDbJs.testListingObj);
                done();
            });
    });   

    it('GET /listings should return all listings', function testSlash(done) {
        request(server)
            .get('/listings')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, result) {
                assert.deepEqual(result.body[0], mockDbJs.testListingObj);
                done();
            });
    });  

    it('POST /review should create a new review', function testSlash(done) {
        request(server)
            .post('/review')
            .send(mockDbJs.testReviewObj)
            .expect({rowid: 1}, done);
    });               

});