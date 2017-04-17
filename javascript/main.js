// External Libaries
var angular = require('angular');

// Setup angular module
angular.module('app', [])
    .controller("MainCtrl", function($scope) {
        $scope.name = "Alex";
    });


// Angular Components
require('./components/test-component.js');
