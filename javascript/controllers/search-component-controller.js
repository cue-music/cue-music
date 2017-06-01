var firebase = require("firebase");
angular.module('app').controller("SearchController", ['httpService', function (httpService) {
    var vm = this;

    // Set up checkboxes
    vm.searchSoundcloud = true;
    vm.searchYoutube = true;


    vm.search = function () {
        if (!vm.searchSoundcloud && !vm.searchYoutube) {
            alert("Please select at least one service to search.");
        } else {
            httpService.search(vm.searchYoutube, vm.searchSoundcloud, vm.searchTerm).then(
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