angular.module('app').component('userprofileComponent', {
        templateUrl: './templates/userprofileComponent.html',
        controllerAs: 'vm',
        bindings: {
            name: "=",
            playlists: "="
        },
        controller: "UserprofileController"
    });