var firebase = require("firebase");
//var Spotify = require("angular-spotify");
angular.module('app').controller("SigninController", ["$scope", "$rootScope", "Spotify", "$firebaseArray", "$routeParams", function ($scope, $rootScope, Spotify, $firebaseArray, $routeParams) {
    var vm = this
    vm.showSignup = false;
    vm.signin = function () {
        console.log("signin");
        firebase.auth().signInWithEmailAndPassword(vm.signinEmail, vm.signinPwd).then(function (userData) {
            var form = document.getElementById("email-form");
            form.reset();
            $rootScope.user = userData;
            $rootScope.loggedIn = true;
            $rootScope.userProfile = true;
            var playlistRef = firebase.database().ref().child("users").child(userData.uid).child("playlists");
            $rootScope.userPlaylists = $firebaseArray(playlistRef);

            vm.checkShared();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            vm.signInErrorMessage = errorMessage;
            $scope.$apply();
            console.log(errorMessage);
        });
    }

    vm.signup = function () {
        if (vm.signupPwd.length >= 6 && vm.signupPwd == vm.signupPwd2) {
            firebase.auth().createUserWithEmailAndPassword(vm.signupEmail, vm.signupPwd).then(function (userData) {
                //console.log("User " + userData.uid + " created successfully!");
                user = firebase.auth().currentUser;
                userIdNum = userData.uid;
                // var form = document.getElementById("email-form-2");
                // form.reset();
                firebase.database().ref().child("users").child(userData.uid).set({
                    email: userData.email,
                    playlists: 0
                });
               firebase.auth().signOut().then(function () {
                    console.log("log out");
                    $rootScope.loggedIn = false;
                    $scope.$digest();
                }).catch(function (error) {
                    // An error happened.
                    console.log(error);
                });
                vm.showSignup = false;
                alert("Please sign to your new account.");
            }).catch(function (error) {
                var errorMessage = error.message;
                vm.errorMessage = errorMessage;
                $scope.$apply();
                console.log(errorMessage);
            });
        }
    }

    vm.checkShared = function () {
        var paramString = location.search.substring(1);
        var paramArray = paramString.split("&");

        paramObject = {};
        for (var i = 0; i < paramArray.length; i++) {
            var qArr = paramArray[i].split("=");
            key = qArr[0];
            val = qArr[1];
            paramObject[key] = val;
        }

        if (paramObject["user"] && paramObject["playlist"]) {
            $rootScope.userProfile = false;
            $rootScope.isShared = true;
            $rootScope.sharedInfo = paramObject;
        }

    }
}]);
