var firebase = require("firebase");
angular.module('app').controller("SearchController", ['httpService', function (httpService) {
    var vm = this;
    vm.results = false;
    // Set up checkboxes
    vm.searchSoundcloud = true;
    vm.searchYoutube = true;
    vm.search = function () {
        if (!vm.searchSoundcloud && !vm.searchYoutube) {
            alert("Please select at least one service to search.");
        } else {
            
            httpService.search(vm.searchYoutube, vm.searchSoundcloud, vm.searchTerm).then(
                function (songs) {
                    vm.results = true;
                    console.log(songs);
                    vm.soundcloudResults = songs.soundcloud;
                    vm.youtubeResults = songs.youtube;

                },
                function (err) {
                    console.log(err);
                }
            )
        }
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    vm.addSong = function (result) {
        var length = millisToMinutesAndSeconds(result.length);
        var newCount = vm.playlist.songCount + 1;
        firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child(vm.playlist.$id).child("songCount").set(newCount);
        firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child(vm.playlist.$id).child("songs").push({
            title: result.title,
            length: length,
            artist: result.artist
        });
    }
}]);