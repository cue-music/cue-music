var firebase = require("firebase");
angular.module('app').controller("SearchController", ['$rootScope', 'httpService', '$firebaseArray', '$firebaseObject', function ($rootScope, httpService, $firebaseArray, $firebaseObject) {
    var vm = this;

    vm.results = false;

    if ($rootScope.isShared) {
        $rootScope.isShared = false;
        
        sharedUser = $rootScope.sharedInfo["user"];
        sharedPlaylist = $rootScope.sharedInfo["playlist"];

        $rootScope.currentPlaylistId = sharedPlaylist;

        playlistRef = firebase.database().ref().child("users").child(sharedUser).child("playlists").child(sharedPlaylist).child("songs");
        playlist = $firebaseObject(playlistRef);
        $rootScope.currentPlaylist = playlist;

        emailRef = firebase.database().ref().child("users").child(sharedUser).child('email');
        email = $firebaseObject(emailRef);
        email.$loaded().then(function () {
            $rootScope.currentPlaylistUser = {
                uid: sharedUser,
                email: email.$value
            };

            vm.name = email.$value;
            console.log(email.$value);

        })
    }

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

    vm.deleteSong = function (song) {
        console.log(song.$id);
        var countRef = firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child($rootScope.currentPlaylistId);
        var countObj = $firebaseObject(countRef);
        countObj.$loaded().then(function () {
            var newCount = countObj.songCount - 1;
            firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child($rootScope.currentPlaylistId).child("songCount").set(newCount);
        });
        firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child($rootScope.currentPlaylistId).child("songs").child(song.$id).remove();
    }

    vm.addSong = function (result) {
        var length = millisToMinutesAndSeconds(result.length);
        var countRef = firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child($rootScope.currentPlaylistId);
        var countObj = $firebaseObject(countRef);
        countObj.$loaded().then(function () {
            var newCount = countObj.songCount + 1;

            firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child($rootScope.currentPlaylistId).child("songCount").set(newCount);
        });

        firebase.database().ref().child("users").child(vm.user.uid).child("playlists").child($rootScope.currentPlaylistId).child("songs").push({
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
        console.log("loading")
        // Stop other playing songs
        yplayer.pauseVideo();
        swidget.pause();


        var songRef = firebase.database().ref().child("users").child($rootScope.currentPlaylistUser.uid).child("playlists").child($rootScope.currentPlaylistId).child("songs");
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
        if (nextIndex >= $rootScope.currentPlaylist.length) {
            nextIndex = 0;
        }

        vm.loadSong(nextIndex);
    }

    vm.previousSong = function () {
        var prevIndex = $rootScope.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = $rootScope.currentPlaylist.length - 1;
        }

        vm.loadSong(prevIndex);
    }



    vm.showShare = false;
    vm.share = function () {
        if (vm.user && vm.playlist) {
            shareUrl = location.origin + "/?user=" + vm.user.uid + "&playlist=" + $rootScope.currentPlaylistId;
            return shareUrl;
        } else {
            return "Something went wrong!";
        }
    }

}]);