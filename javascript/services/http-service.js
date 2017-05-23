angular.module("app").service('httpService', ['$http', function ($http) {

    /**
     * Just a function to test that the service is working
     */
    this.testService = function (type, search) {
        $http.get("http://httpbin.org/").then(
            function (data) {
                console.log(data)
            },
            function (err) {
                console.log(err)
            }
        )
        console.log(type, search);
        return "success"
    }

    /**
     * Returns search results
     * @param {boolean} spotify - Should spotify be searched
     * @param {boolean} soundcloud - Should SoundCloud be searched
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise} 
     */
    this.search = function (spotify, soundcloud, searchTerm) {
        var that = this;

        return new Promise(function (resolve, reject) {
            spotifyDone = false;
            soundDone = false;

            songsResults = {
                spotify: [],
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
                        if (spotifyDone && soundDone) {
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

            // Do spotify stuff
            if (spotify) {
                that.searchSpotify(searchTerm).then(
                    function (resp) {
                        // It finished
                        spotifyDone = true;

                        // Get songs
                        songs = resp.data.tracks.items;

                        for (var i = 0; i < songs.length && i < 10; i++) {
                            sResult = songs[i];
                            song = {
                                title: sResult.name,
                                artist: sResult.artists[0].name,
                                artwork: sResult.album.images[0].url,
                                source: "spotify",
                                length: sResult.duration_ms,
                                source_id: sResult.id
                                
                            }
                            songsResults.spotify.push(song)
                        }


                        // Return if both are done
                        if (spotifyDone && soundDone) {
                            resolve(songsResults)
                        }
                    },
                    function (err) {
                        reject(err);
                    }
                );
            } else {
                spotifyDone = true;
            }


        });
    }

    /**
     * Searches spotify
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise}
     */
    this.searchSpotify = function (searchTerm) {
        var apiUrl = "https://api.spotify.com/v1/search?type=track&q=" + searchTerm;
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