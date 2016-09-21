 
var app = angular.module('airbnbApp');

app.factory('airbnbFactory', function($http) {

   return {
      createNewUser: function(userObj) {
        return $http.post('/user', userObj);
      },

      addListing: function(listingObj) {
        return $http.post('/listing', listingObj);
      },

      getListings: function() {
          return $http.get('/listings');
      },

      getListingById: function(listingId) {
        return $http.get('/listings/' + listingId);
      }
   };
});

 