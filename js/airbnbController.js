var app = angular.module('airbnbApp');

app.controller('airbnbCtrl', function ($http, $scope, airbnbFactory) {

  $scope.airbnblistings;
  $scope.useremail;
  $scope.reserveSelectedListing = airbnbFactory.reserveSelectedListing;

  $scope.newListing = {};

  $scope.createReview = {};

  $scope.airbnbreviews;

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
    // console.log('email:' + email);
    $scope.useremail = email;
    window.location = "/#/login";
  }

   $scope.editDetails = function(editData) {
      $scope.editListing = true;
      $scope.existingListing = editData;
    }

    $scope.listingEdit = function(listing) {
      console.log('listingEdit:' + JSON.stringify(listing));     
      airbnbFactory.editListingData(listing).success(function () {
         $scope.existingListing = {};
         $scope.editListing = false;
      }).error(function (error) {
          console.log(error);
      });   
    }

    $scope.deleteListing = function(listing) {
      console.log('deleteListing:' + JSON.stringify(listing));      
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
      airbnbFactory.reserveSelectedListing = listing;
      console.log('$scope.reserveSelectedListing:', airbnbFactory.reserveSelectedListing);   
      window.location = "/#/reserve";
   }   

 $scope.createReview = function(newReview) {
      if(newReview) {        
        console.log('newReview:' + JSON.stringify(newReview));  
        airbnbFactory.createNewReview(newReview).success(function(data) {                
             console.log('review rowid:' + data.rowid);
             newReview.rowid = data.rowid; 
             $scope.airbnbreviews.push(newReview); 
             //console.log('airbnbreviews length:' + $scope.airbnbreviews.length);                                
         }).error(function(error) {
              console.log(error);
         });             
         $scope.newReview = {};         
      }
 }
   $scope.makeReservation = function (reserveSelectedListing, reservationInfo) { 
      console.log('reserveSelectedListing:' + JSON.stringify(reserveSelectedListing));  
      console.log('reservationInfo:' + JSON.stringify(reservationInfo));   
      window.location = "/#/reservationConfirm";
     /* airbnbFactory.makeReservation(reserveSelectedListing, reservationInfo).success(function () {
        window.location = "/#/reservationConfirm";
      }).error(function (error) {
          console.log(error);
      });  */   
   }   

});