var firebase = require("firebase");
angular.module('app').controller("SearchController", ['$rootScope', 'httpService', '$firebaseArray', function ($rootScope, httpService, $firebaseArray) {
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
        return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    vm.addSong = function (result) {
        var length = millisToMinutesAndSeconds(result.length);
        var newCount = vm.playlist.songCount + 1;
        firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child(vm.playlist.$id).child("songCount").set(newCount);
        firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child(vm.playlist.$id).child("songs").push({
            title: result.title,
            length: length,
            artist: result.artist,
            artwork: result.artwork,
            source: result.source,
            source_id: result.source_id
        });
    }


    $rootScope.isPaused = true;


    vm.loadSong = function (index) {
        // Stop other playing songs
        yplayer.pauseVideo();
        swidget.pause();


        var songRef = firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child(vm.playlist.$id).child("songs");
        var array = $firebaseArray(songRef);
        console.log(array);
        array.$loaded().then(function () {
            song = array[index]

            $rootScope.currentSong = song;
            $rootScope.currentIndex = index;

            if (song.source == "youtube") {
                yplayer.loadVideoById(song.source_id);
            } else {
                var scUrl = "https://api.soundcloud.com/tracks/" + song.source_id
                console.log(scUrl);
                swidget.load(scUrl, {
                    callback: function () {
                        swidget.play();
                    }
                });
            }

            $rootScope.isPaused = false;
        });
    }


    vm.toggleSong = function () {
        if (!$rootScope.isPaused) {
            swidget.pause();
            yplayer.pauseVideo();

            $rootScope.isPaused = true;
        } else {
            if ($rootScope.currentSong.source == "youtube") {
                yplayer.playVideo();
            } else {
                swidget.play();
            }
            $rootScope.isPaused = false;
        }

    }


    vm.getArtwork = function (song) {
        if (song) {
            artwork = song.artwork;
            if (!artwork) {
                return "images/C-Drop-Shawdow_1.png";
            } else {
                return artwork;
            }

        } else {
            return "images/C-Drop-Shawdow_1.png";
        }
    }

    vm.nextSong = function () {
        var nextIndex = $rootScope.currentIndex + 1;
        if (nextIndex >= $rootScope.currentPlaylist.songs.length) {
            nextIndex = 0;
        }

        vm.loadSong(nextIndex);
    }

    vm.previousSong = function () {
        var prevIndex = $rootScope.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = $rootScope.currentPlaylist.songs.length - 1;
        }

        vm.loadSong(prevIndex);
    }

}]);