var app = angular.module('airbnbApp');

app.filter('airbnbFilter', function() {

    return function(listings, rentalAmt) {

      var filteredListing = [];
      var min = rentalAmt.min;
      var max = rentalAmt.max;

      angular.forEach(listings, function(listing) {

        var price = parseInt(listing.price);

        if(price >= min && price <= max) {
          filteredListing.push(listing);
        }

      });

      return filteredListing;
    }

  });