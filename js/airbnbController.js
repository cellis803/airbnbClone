var app = angular.module('airbnbApp');

app.controller('airbnbCtrl', function ($http, $scope, airbnbFactory, $routeParams) {

  $scope.airbnblistings;
  $scope.useremail;
  $scope.reserveSelectedListing = airbnbFactory.reserveSelectedListing;

  $scope.newListing = {};

  $scope.airbnbreviews;
  $scope.newReview = {};
  $scope.reviewSelectedListing = airbnbFactory.reviewSelectedListing;
  $scope.createReview = {};

  $scope.rentalAmt = {
    min: 0,
    max: 100000
  }

  $scope.markers = [];
  var mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng(37.090240,-95.712891),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.init = function() {
    airbnbFactory.getListings().success(function (data) {
      $scope.airbnblistings = data;
    }).error(function (error) {
      console.log(error);
    });
  };



  $scope.openInfoWindow = function (e, mapListing) {
    console.log('openInfoWindow', mapListing.latitude, mapListing.logitude);
    e.preventDefault();
     $scope.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new google.maps.LatLng(mapListing.latitude, mapListing.logitude),
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              mapTypeIds: ['roadmap', 'terrain']
           }
        }); 
    var markerlocal = new google.maps.Marker({
        map: $scope.map,
        title: mapListing.title,
        position:new google.maps.LatLng(mapListing.latitude, mapListing.logitude),
        animation:google.maps.Animation.BOUNCE
    });    
  }

$scope.loadMyMap = function () {
    var data = $scope.airbnblistings;  
    console.log("data: ", data.length, ", " , data);  
 
   var geocoder = new google.maps.Geocoder();
   $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions); 
   var infoWindow = new google.maps.InfoWindow();  
   var address;    
   var j= data.length;
   
     //loop over all addresses
    for(var i=0; i<j; i++) {     
      new function(){
         var iCopy = i;            
          address = data[iCopy].address1 + ', ' + data[iCopy].city + ', ' + data[iCopy].state  + ' ' + data[iCopy].zip;
          console.log('address', address);         
          // console.log('latlong: ',results[0].geometry.location.lat(), results[0].geometry.location.lng());
          // console.log('creating Marker:', iCopy, , data[iCopy]);                   
          var marker = new google.maps.Marker({
                                      map: $scope.map,
                                      position: new google.maps.LatLng(data[iCopy].latitude,data[iCopy].logitude),
                                      title: data[iCopy].address1 + ', ' + data[iCopy].city + ', ' + data[iCopy].state  + ' ' + data[iCopy].zip,
                                      rowid: data[iCopy].rowid                                      
                           });
                            console.log('marker:',   marker.title, marker.rowid); 
                            marker.content = '<div class="infoWindowContent">' + data[iCopy].description + '</div>';
                            google.maps.event.addListener(marker, 'click', function(){                               
                                                infoWindow.setContent('<h2>' + data[iCopy].title + '</h2>' + marker.content);                                                        
                                                infoWindow.open($scope.map, marker);
                            });
             $scope.markers.push(marker);                   
         }       
    }      
  }

  $scope.createListing = function (newListing) {
    if (newListing) {
      newListing.image = newListing.image.name;
      newListing.name = newListing.email;
      console.log('newListing:' + JSON.stringify(newListing));
      airbnbFactory.addListing(newListing).success(function (data) {
        console.log('rowid:' + data.rowid);
        newListing.rowid = data.rowid;
        $scope.airbnblistings.push(newListing);
        console.log('airbnblistings length:' + $scope.airbnblistings.length);
      }).error(function (error) {
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

  $scope.mapView = function () {
   window.location = "/#/mapView";   
  }

  $scope.editDetails = function (editData) {
    $scope.editListing = true;
    $scope.existingListing = editData;
  }

  $scope.listingEdit = function (listing) {
    console.log('listingEdit:' + JSON.stringify(listing));
    airbnbFactory.editListingData(listing).success(function () {
      $scope.existingListing = {};
      $scope.editListing = false;
    }).error(function (error) {
      console.log(error);
    });
  }

  $scope.deleteListing = function (listing) {
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
    window.location = "/#/listing/" + airbnbFactory.reserveSelectedListing.rowid + "/reserve";
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
  $scope.review = function (listing) {
    airbnbFactory.reviewSelectedListing = listing;
    console.log('$scope.reviewSelectedListing:', airbnbFactory.reviewSelectedListing);
    window.location = "/#/review";
  }

  $scope.createReview = function (reviewSelectedListing, newReview) {
    //window.location = "/#/login";
    history.back();
    console.log('listing:' + JSON.stringify(reviewSelectedListing));
    console.log('newReview object:' + JSON.stringify(newReview));
    newReview.listingId = airbnbFactory.reviewSelectedListing;
    airbnbFactory.createNewReview(newReview).success(function (data) {
      
    }).error(function (error) {
      console.log(error);
    });
    
  }

  $scope.cancel = function () {
      history.back();
  }

    $scope.review = function (listing) {
      airbnbFactory.reviewSelectedListing = listing;
      console.log('$scope.reviewSelectedListing:', airbnbFactory.reviewSelectedListing);
      window.location = "/#/listing/" + airbnbFactory.reviewSelectedListing + "/review";
    }  

});

app.controller('ListingDetailsCtrl', function($scope, $routeParams, airbnbFactory) {

    $scope.listingReviews = {};

    airbnbFactory.getListingById($routeParams.listingId).then(function (result) {
            $scope.listingDetails = result;

    }, function (error) {
      console.log(error);
    });

    airbnbFactory.getReviewsByListing($routeParams.listingId).then(function(result) {
            $scope.listingReviews = result.data;

    }, function(error) {
        console.log(error);
    });


});