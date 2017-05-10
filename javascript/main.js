// External Libaries
var angular = require('angular');

var app = angular.module('app', [])

// Angular Components
require('./components/test-component.js');
require('./services/http-service.js')

// Setup angular module
app.controller("MainCtrl", ['$scope', 'httpService', function ($scope, httpService) {
    $scope.name = "Alex";
    httpService.testService("a", "b");
}]);


