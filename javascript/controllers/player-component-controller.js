var firebase = require("firebase");
angular.module('app').controller("PlayerController", ["$rootScope", function ($rootScope) {
    var vm = this

    $rootScope.isPaused = true;


    vm.loadSong = function (index) {
        // Stop other playing songs
        yplayer.pauseVideo();
        swidget.pause();

        song = $rootScope.currentPlaylist.songs[index]

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


    vm.getArtwork = function () {
        try {
            return $rootScope.currentSong.artwork;
        } catch (e) {
            return "images/C-Drop-Shawdow_1.png"
        }
    }

    vm.nextSong = function() {
        var nextIndex = $rootScope.currentIndex + 1;
        if (nextIndex >= $rootScope.currentPlaylist.songs.length) {
            nextIndex = 0;
        }

        vm.loadSong(nextIndex);
    }

    vm.previousSong = function() {
        var prevIndex = $rootScope.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = $rootScope.currentPlaylist.songs.length - 1;
        }

        vm.loadSong(prevIndex);
    }

}]);