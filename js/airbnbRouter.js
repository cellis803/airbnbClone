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
    otherwise({
        redirectTo: '/'
    });
});