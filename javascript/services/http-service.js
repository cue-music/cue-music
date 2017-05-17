angular.module("app").service('httpService', ['$http', function ($http) {

    /**
     * Just a function to test that the service is working
     */
    this.testService = function (type, search) {
        $http.get("http://httpbin.org/").then(
            function(data) {
                console.log(data)
            },
            function(err) {
                console.log(err)
            }
        )
        console.log(type, search);
        return "success"
    }

}]);