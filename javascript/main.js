// External Libaries
var angular = require('angular');
var firebase = require("firebase");
var angularfire = require('angularfire');


// Set up firebase
var config = {
    apiKey: "AIzaSyBrPwQw4Gxa1StVB7-jIHMKn0YDSBhrfQs",
    authDomain: "cue-music.firebaseapp.com",
    databaseURL: "https://cue-music.firebaseio.com",
    projectId: "cue-music",
    storageBucket: "cue-music.appspot.com",
    messagingSenderId: "31703604556"
  };

firebase.initializeApp(config);

// Setup Module
var app = angular.module('app', ["firebase"])

//Angular Controllers
require('./controllers/test-component-controller.js')

// Angular Components
require('./components/test-component.js');

// Angular Services
require('./services/http-service.js')

// Setup Main Ctrl
app.controller("MainCtrl", ['$scope', 'httpService', function ($scope, httpService) {
    $scope.name = "Alex";
    httpService.search(true, true, "love").then(
        function(data) {
            console.log(data)
        },
        function(err) {
            console.log(err)
        }
    );
    console.log("main ctrl loaded")
}]);
