angular.module('app').component('searchComponent', {
        templateUrl: './templates/searchComponent.html',
        controllerAs: 'vm',
        controller: "SearchController",
        bindings: {
            playlist: "=",
            name: "=",
            user: "="
        }
    });