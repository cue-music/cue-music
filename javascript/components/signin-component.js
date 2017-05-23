angular.module('app').component('signinComponent', {
        templateUrl: './templates/signinComponent.html',
        controllerAs: 'vm',
        bindings: {
            name: "="
        },
        controller: "SigninController"
    });