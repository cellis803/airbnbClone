 
var app = angular.module('airbnbApp');
 
 app.factory('airbnbFactory', function($http) {

     function getListings() {
      return $http.get('static/data/airbnb.json');
    }

    return {
      getListings: getListings
    } 

  });

 