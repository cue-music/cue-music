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


// Set up soundcloud
SC.initialize({
  client_id: '9cfb13e8afddd6b2ffcf8902b1dfe087&q=',
  redirect_uri: window.location.href
});


SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});

// // stream track id 293
// SC.stream('/tracks/293').then(function(player){
//   player.play();
// });

// Setup Module
var app = angular.module('app', ["firebase"]);

//Angular Controllers
require('./controllers/test-component-controller.js');
require('./controllers/signin-component-controller.js');
require('./controllers/player-component-controller.js');
require('./controllers/search-component-controller.js');

// Angular Components
require('./components/test-component.js');
require('./components/signin-component.js');
require('./components/player-component.js');
require('./components/search-component.js');

// Angular Services
require('./services/http-service.js')

// Setup Main Ctrl
app.controller("MainCtrl", ['$scope', 'httpService', function ($scope, httpService) {
}]);
