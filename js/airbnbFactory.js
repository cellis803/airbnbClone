 
var app = angular.module('airbnbApp');

app.factory('airbnbFactory', function($http) {

   return {
      reserveSelectedListing: [],
      airbnblistings: [],     

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
      },

      editListingData: function(editlistingObj) {
        return $http.put('/listing', editlistingObj);
      },  

     deleteListingId: function(listingId) {
        return $http.delete('/listing/' + listingId);
      },  

      makeReservation: function(reserveSelectedListing, reservationInfo) {
        return $http.post('/makeReservation', reserveSelectedListing, reservationInfo);
      },

     createNewReview: function(reviewObj) {
        return $http.post('/review', reviewObj);
      }
   };
});

 