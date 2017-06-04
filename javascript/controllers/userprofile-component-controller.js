var firebase = require("firebase");
angular.module('app').controller("UserprofileController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var vm = this
    vm.addPlaylist = function() {
        console.log($rootScope.user);
        firebase.database().ref().child("users").child($rootScope.user.uid).child("playlists").push({
            title: "A Playlist",
            songs: 0,
            songCount: 0,
            time: firebase.database.ServerValue.TIMESTAMP
        });
    }

    vm.openPlaylist = function(playlist) {
        $rootScope.userProfile = false;
        $rootScope.currentPlaylist = playlist; 
    }
}]);