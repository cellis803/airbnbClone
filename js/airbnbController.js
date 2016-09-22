 
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

    $scope.createListing = function(newListing) {
      if(newListing) {
        newListing.image = "temp.png";
        $scope.airbnblistings.push(newListing);
        airbnbFactory.addListing(newListing).success(function(data) {
             console.log(data);
         }).error(function(error) {
              console.log(error);
         }); 
        $scope.newListing = {};
      }
    }


});