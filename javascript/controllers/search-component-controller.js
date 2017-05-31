var firebase = require("firebase");
angular.module('app').controller("SearchController", ['httpService', function (httpService) {
    var vm = this;

    // Set up checkboxes
    vm.searchSoundcloud = true;
    vm.searchSpotify = true;


    vm.search = function () {
        if (!vm.searchSoundcloud && !vm.searchSpotify) {
            alert("Please select at least one service to search.");
        } else {
            httpService.search(vm.searchSpotify, vm.searchSoundcloud, vm.searchTerm).then(
                function(songs) {
                    console.log(songs);
                },
                function(err) {
                    console.log(err);
                }
            )
        }
    }
}]);