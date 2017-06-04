var firebase = require("firebase");
angular.module('app').controller("UserprofileController", ["$scope", "$rootScope","$firebaseArray", function ($scope, $rootScope, $firebaseArray) {
    var vm = this
    vm.createNew = false;
    vm.addPlaylist = function() {
        firebase.database().ref().child("users").child($rootScope.user.uid).child("playlists").push({
            title: vm.playlistName,
            songs: 0,
            songCount: 0,
            time: firebase.database.ServerValue.TIMESTAMP
        });
        vm.playlistName = "";
        vm.createNew = false;
    }

    vm.openPlaylist = function(playlist) {
        $rootScope.userProfile = false;
        var plRef = firebase.database().ref().child("users").child($rootScope.user.uid).child("playlists").child(playlist.$id).child("songs");
        $rootScope.currentPlaylist = $firebaseArray(plRef); 
        $rootScope.currentPlaylistId = playlist.$id;
    }
}]);