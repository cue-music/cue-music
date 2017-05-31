var firebase = require("firebase");
angular.module('app').controller("SearchController", ["httpService", function (httpService) {
    var vm = this

    vm.spotify = true
    vm.sound = true

    vm.search = function(spot, sound, term) {
        httpService.search(spot, sound, term).then(
            function(data){ 
                console.log(data);
            },
            function(err) {
                console.log(err)
            }
        )
    }    


}]);