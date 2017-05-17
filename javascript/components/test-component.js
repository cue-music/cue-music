angular.module('app').component('testComponent', {
        templateUrl: './templates/testComponent.html',
        controllerAs: 'vm',
        bindings: {
            name: "="
        },
        controller: "TestController"
    });

