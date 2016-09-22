
var app = angular.module('airbnbApp', []);

app.controller('airbnbCtrl', function ($http, $scope, airbnbFactory) {

  $scope.airbnblistings;

  $scope.useremail;

  $scope.newListing = {};

  $scope.rentalAmt = {
    min: 0,
    max: 1000
  }

  airbnbFactory.getListings().success(function (data) {
    $scope.airbnblistings = data;
  }).error(function (error) {
    console.log(error);
  });

  $scope.createListing = function (newListing) {
    if (newListing) {
      newListing.image = "temp.png";
      airbnbFactory.addListing(newListing).success(function (data) {
        console.log('rowid:' + data.rowid);
        newListing.rowid = data.rowid;
      }).error(function (error) {
        console.log(error);
      });
      $scope.airbnblistings.push(newListing);
      $scope.newListing = {};
    }
  }

  $scope.handleLogin = function (email) {
    console.log('email:' + email);
    $scope.useremail = email;
  }
});