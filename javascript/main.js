// External Libaries
var angular = require('angular');

// Setup Module
var app = angular.module('app', [])

//Angular Controllers
require('./controllers/test-component-controller.js')

// Angular Components
require('./components/test-component.js');

// Angular Services
require('./services/http-service.js')

// Setup Main Ctrl
app.controller("MainCtrl", ['$scope', 'httpService', function ($scope, httpService) {
    $scope.name = "Alex";
    httpService.testService("a", "b");
}]);


