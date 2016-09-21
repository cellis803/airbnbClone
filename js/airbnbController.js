 
var app = angular.module('airbnbApp', []);
 
app.controller('airbnbCtrl', function($http, $scope, airbnbFactory) {
    $scope.airbnblistings;

    airbnbFactory.getListings().success(function(data) {
         $scope.airbnblistings = data;
    }).error(function(error) {
         console.log(error);
    }); 


});