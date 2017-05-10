angular.module("app").service('httpService', ['$http', function () {

    this.testService = function (type, search) {
        console.log(type, search);
        return "success"
    }

}]);