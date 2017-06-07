// External Libaries
var angular = require('angular');
var firebase = require("firebase");
var angularfire = require('angularfire');
var spotify = require('angular-spotify');
var ngRoute = require('angular-route');


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
var app = angular.module('app', ["firebase", "spotify", "ngRoute"]);

app.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('f85ef2aa60924edbae2c811df6e5625c');
  SpotifyProvider.setRedirectUri('http://localhost:8080/callback.html');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
});


//Angular Controllers
require('./controllers/test-component-controller.js');
require('./controllers/signin-component-controller.js');
require('./controllers/player-component-controller.js');
require('./controllers/search-component-controller.js');
require('./controllers/userprofile-component-controller.js');
require('./controllers/smallplayer-component-controller.js');

// Angular Components
require('./components/test-component.js');
require('./components/signin-component.js');
require('./components/player-component.js');
require('./components/search-component.js');
require('./components/userprofile-component.js');
require('./components/smallplayer-component.js');

// Angular Services
require('./services/http-service.js')

// Setup Main Ctrl
app.controller("MainCtrl", ['$scope', '$rootScope', 'httpService', function ($scope, $rootScope, httpService) {
  $scope.name = "Alex";
  $rootScope.loggedIn = false;
  $rootScope.userProfile = false;
  $rootScope.currentPlaylist = false;

  console.log("main ctrl loaded");
  $scope.logOut = function () {
    // Stop other playing songs
    yplayer.pauseVideo();
    swidget.pause();


    firebase.auth().signOut().then(function () {
      console.log("log out");
      $rootScope.loggedIn = false;
      $scope.$digest();
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

}]);
