angular.module("app").service('httpService', ['$http', function ($http) {


    /**
     * Returns search results
     * @param {boolean} youtube - Should youtube be searched
     * @param {boolean} soundcloud - Should SoundCloud be searched
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise} 
     */
    this.search = function (youtube, soundcloud, searchTerm) {
        var that = this;

        return new Promise(function (resolve, reject) {
            youtubeDone = false;
            soundDone = false;

            songsResults = {
                youtube: [],
                soundcloud: []
            };


            // Do soundcloud stuff
            if (soundcloud) {
                that.searchSoundcloud(searchTerm).then(
                    function (resp) {
                        // It finished
                        soundDone = true;

                        // Get songs
                        songs = resp.data;

                        for (var i = 0; i < songs.length; i++) {
                            sResult = songs[i];
                            song = {
                                title: sResult.title,
                                artist: sResult.user.username,
                                artwork: sResult.artwork_url,
                                source: "soundcloud",
                                length: sResult.duration,
                                source_id: sResult.id
                                
                            }
                            songsResults.soundcloud.push(song)
                        }


                        // Return if both are done
                        if (youtubeDone && soundDone) {
                            resolve(songsResults)
                        }
                    },
                    function (err) {
                        reject(err);
                    }
                );
            } else {
                soundDone = true;
            }

            // Do youtube stuff
            if (youtube) {
                that.searchYoutube(searchTerm).then(
                    function (resp) {
                        // It finished
                        youtubeDone = true;

                        // Get songs
                        songs = resp.data.items;

                        for (var i = 0; i < songs.length && i < 10; i++) {
                            sResult = songs[i];
                            song = {
                                title: sResult.snippet.title,
                                artist: sResult.snippet.channelTitle,
                                artwork: sResult.snippet.thumbnails.default.url,
                                source: "youtube",
                                length: null,
                                source_id: sResult.id.videoId
                                
                            }
                            songsResults.youtube.push(song)
                        }


                        // Return if both are done
                        if (youtubeDone && soundDone) {
                            resolve(songsResults)
                        }
                    },
                    function (err) {
                        reject(err);
                    }
                );
            } else {
                youtubeDone = true;
            }


        });
    }

    /**
     * Searches spotify
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise}
     */
    this.searchYoutube = function (searchTerm) {
        var apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=10&key=AIzaSyBrPwQw4Gxa1StVB7-jIHMKn0YDSBhrfQs&q=" + searchTerm;
        return $http.get(apiUrl);
    }

    /**
     * Searches spotify
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise}
     */
    this.searchSoundcloud = function (searchTerm) {
        // KEY = 9cfb13e8afddd6b2ffcf8902b1dfe087
        var apiUrl = "http://api.soundcloud.com/tracks?client_id=9cfb13e8afddd6b2ffcf8902b1dfe087&q=" + searchTerm
        return $http.get(apiUrl);
    }
}]);