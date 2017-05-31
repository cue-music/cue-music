angular.module('app').component('searchResultsComponent', {
        templateUrl: './templates/searchResultsComponent.html',
        controllerAs: 'vm',
        bindings: {
            results: "="
        },
        controller: "SearchResultsController"
    });


