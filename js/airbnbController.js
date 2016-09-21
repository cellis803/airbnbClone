 
var app = angular.module('airbnbApp', []);
 
app.controller('airbnbCtrl', function($http, $scope, airbnbFactory) {
     
     $scope.airbnblistings;

     $scope.newListing = {};   

     $scope.rentalAmt = {
      min: 0,
      max: 1000
    } 
    
    airbnbFactory.getListings().success(function(data) {
         $scope.airbnblistings = data;
    }).error(function(error) {
         console.log(error);
    }); 


});