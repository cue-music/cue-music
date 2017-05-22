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
        if (spotify && soundcloud) {
            return new Promise(function (resolve, reject) {

            });
        } else if (spotify) {
            return this.searchSpotify(searchTerm)
        } else {
            return this.searchSoundcloud(searchTerm)
        }
    }

    /**
     * Searches spotify
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise}
     */
    this.searchSpotify = function (searchTerm) {
        return new Promise(function (resolve, reject) {
            // TODO: search spotify
        });
    }

    /**
     * Searches spotify
     * @param {string} searchTerm - the term to search on the services
     * @return {Promise}
     */
    this.searchSoundcloud = function (searchTerm) {
        // KEY = 9cfb13e8afddd6b2ffcf8902b1dfe087
        var apiUrl = "http://api.soundcloud.com/tracks?client_id=9cfb13e8afddd6b2ffcf8902b1dfe087&q=" + searchTerm
        return new Promise(function (resolve, reject) {
            // TODO: search sound cloud
        });
    }
}]);