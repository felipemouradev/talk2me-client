'use strict';

var app  = angular.module('app', ['ngRoute']);

var base = "http://31.220.106.26";

var user = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;

app.config(function($routeProvider,$compileProvider){
    //$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
    $routeProvider
    .when('/singup', {templateUrl: 'views/singup.html', controller: 'singupController'})
    .when('/messages', {templateUrl: 'views/messages.html', controller: 'messageController'})
    .when('/login', {templateUrl: 'views/login.html', controller: 'loginController'})
    .otherwise({redirectTo: '/login' })
});
