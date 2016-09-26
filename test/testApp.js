var request = require('supertest');
var rewire = require('rewire');

var mockDbJs = {
            initDB: function() {
                return new Promise(
                    (resolve, reject) => {
                        resolve();
                    });
            },

            createNewUser: function(userObj) {
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });
            },

            createNewListing: function(listingObj) {
                return new Promise(
                    (resolve, reject) => {
                        resolve(1);
                    });                
            },

            getAllListings: function() {
                return new Promise(
                    (resolve, reject) => {
                        resolve([{"rowid" : 1}]);
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
            .expect({rowid: 1}, done);
    }); 

    it('POST /listing should create a new listing', function testSlash(done) {
        request(server)
            .post('/listing')
            .expect({rowid: 1}, done);
    }); 

    it('PUT /listing should update a listing', function testSlash(done) {
        request(server)
            .put('/listing')
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
            .expect('Content-Type', 'application/json; charset=utf-8', done);
    });   

    it('GET /listings should return all listings', function testSlash(done) {
        request(server)
            .get('/listings')
            .expect('Content-Type', 'application/json; charset=utf-8', done);
    });  

    it('POST /review should create a new review', function testSlash(done) {
        request(server)
            .post('/review')
            .expect({rowid: 1}, done);
    });               

});