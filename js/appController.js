'use strict';

var app  = angular.module('app', ['ngRoute']);

var base = "http://localhost:8000";

var user = JSON.parse(localStorage.getItem('user'));

app.config(function($routeProvider,$compileProvider){
    //$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
    $routeProvider
    .when('/singup', {templateUrl: 'views/singup.html', controller: 'singupController'})
    .when('/messages', {templateUrl: 'views/messages.html', controller: 'messageController'})
    .when('/login', {templateUrl: 'views/login.html', controller: 'loginController'})
    .otherwise({redirectTo: '/login' })
});

// app.controller('appController',function($scope,$http) {
//     $scope.getNewToken = function() {
//           $http({method: 'GET', url: base+'/get-new-token'})
//                 .then(function successCallback(data, status, headers, config) {
//                     localStorage.setItem('user',JSON.stringify(data.data.user));
//                     $scope.renewUserToken();
//                 },
//                 function errorCallback(data, status, headers, config) {
//                     alert('Aconteceu alguma coisa com seu token');
//                 });
//     }
//
//     $scope.renewUserToken = function () {
//         user = localStorage.getItem('user');
//     }
// });
