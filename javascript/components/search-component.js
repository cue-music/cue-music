angular.module('app').component('searchComponent', {
        templateUrl: './templates/searchComponent.html',
        controllerAs: 'vm',
        bindings: {
            name: "="
        },
        controller: "SearchController"
    });