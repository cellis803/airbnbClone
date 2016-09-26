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