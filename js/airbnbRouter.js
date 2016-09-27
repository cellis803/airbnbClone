var app = angular.module('airbnbApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'login.html',
        controller: 'airbnbCtrl'
    }).
    when('/login', {
        templateUrl: 'listing.html',
        controller: 'airbnbCtrl'
    }).
    when('/mapView', {
        templateUrl: 'mapView.html',
        controller: 'airbnbCtrl'
    }).
    when('/listing/:listingId', {
         templateUrl: 'viewlisting.html',
        controller: 'ListingDetailsCtrl'       
    }).
    when('/listing/:listingId/review', {
         templateUrl: 'review.html',
        controller: 'airbnbCtrl'       
    }).
    when('/listing/:listingId/reserve', {
         templateUrl: 'reserve.html',
        controller: 'airbnbCtrl'       
    }).        
    when('/reserve', {
        templateUrl: 'reserve.html',
        controller: 'airbnbCtrl'
    }).
    when('/reservationConfirm', {
        templateUrl: 'reservationConfirm.html',
        controller: 'airbnbCtrl'
    }).
    when('/review', {
        templateUrl: 'review.html',
        controller: 'airbnbCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
});