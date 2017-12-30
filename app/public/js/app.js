
var app = angular.module('tinyURLApp',['ngRoute','ngResource','chart.js']);//固定，得到app

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl:"./public/views/home.html",
            controller:"homeController"
    })
        .when("/urls/:shortUrl",{
            templateUrl:"./public/views/url.html",
            controller:"urlController"
        });

});