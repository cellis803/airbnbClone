var app = angular.module('airbnbApp');

app.controller('airbnbCtrl', function ($http, $scope, airbnbFactory) {

  $scope.airbnblistings;

  $scope.useremail;

  $scope.newListing = {};

  $scope.rentalAmt = {
    min: 0,
    max: 100000
  }

  airbnbFactory.getListings().success(function (data) {
    $scope.airbnblistings = data;
  }).error(function (error) {
    console.log(error);
  });

 $scope.createListing = function(newListing) {
      if(newListing) {        
        newListing.image =  newListing.image.name;    
        newListing.name =  newListing.email;  
        console.log('newListing:' + JSON.stringify(newListing));  
        airbnbFactory.addListing(newListing).success(function(data) {                
             console.log('rowid:' + data.rowid);
             newListing.rowid = data.rowid; 
             $scope.airbnblistings.push(newListing); 
             console.log('airbnblistings length:' + $scope.airbnblistings.length);                                
         }).error(function(error) {
              console.log(error);
         });             
         $scope.newListing = {};         
      }
 }

  $scope.handleLogin = function (email) {
    console.log('email:' + email);
    $scope.useremail = email;
    window.location = "/#/login";
  }

   $scope.editDetails = function(editData) {
      $scope.editListing = true;
      $scope.existingListing = editData;
    }

    $scope.listingEdit = function(listing) {
       console.log('listingEdit:' + JSON.stringify(listing));
       $scope.existingListing = {};
       $scope.editListing = false;
      airbnbFactory.editListingData(listing).success(function () {
         $scope.existingListing = {};
         $scope.editListing = false;
      }).error(function (error) {
          console.log(error);
      });   
    }

    $scope.deleteListing = function(listing) {
      console.log('deleteListing:' + JSON.stringify(listing));
      var index = $scope.airbnblistings.indexOf(listing);
      $scope.airbnblistings.splice(index, 1);
      $scope.existingListing = {};
      $scope.editListing = false;
      airbnbFactory.deleteListingId(listing.rowid).success(function () {
          var index = $scope.airbnblistings.indexOf(listing);
          $scope.airbnblistings.splice(index, 1);
          $scope.listing = {};
          $scope.editListing = false;
      }).error(function (error) {
          console.log(error);
      });  

    }


   $scope.reserve = function (listing) {
      console.log('reserve:' + JSON.stringify(listing));     
      window.location = "/#/reserve";
   }   

});