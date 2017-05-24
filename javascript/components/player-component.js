angular.module('app').component('playerComponent', {
        templateUrl: './templates/playerComponent.html',
        controllerAs: 'vm',
        bindings: {
            name: "="
        },
        controller: "PlayerController"
    });