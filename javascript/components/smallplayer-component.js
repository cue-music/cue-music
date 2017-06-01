angular.module('app').component('smallplayerComponent', {
        templateUrl: './templates/smallplayerComponent.html',
        controllerAs: 'vm',
        bindings: {
            name: "="
        },
        controller: "SmallplayerController"
    });