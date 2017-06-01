var firebase = require("firebase");
//var Spotify = require("angular-spotify");
angular.module('app').controller("SigninController", ["$scope", "$rootScope", "Spotify", "$firebaseArray", function ($scope, $rootScope, Spotify, $firebaseArray) {
    var vm = this
    vm.showSignup = false;
    vm.signin = function () {
        console.log("signin");
        firebase.auth().signInWithEmailAndPassword(vm.signinEmail, vm.signinPwd).then(function (userData) {
            var form = document.getElementById("email-form");
            form.reset();
            $rootScope.user = userData;
            //console.log(userData);
            vm.login();
            $rootScope.loggedIn = true;
            $rootScope.userProfile = true;
            var playlistRef = firebase.database().ref().child("users").child(userData.uid).child("playlists");
		    $rootScope.userPlaylists = $firebaseArray(playlistRef);
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    vm.signup = function () {
        if (vm.signupPwd.length >= 6 && vm.signupPwd == vm.signupPwd2) {
            firebase.auth().createUserWithEmailAndPassword(vm.signupEmail, vm.signupPwd).then(function (userData) {
                //console.log("User " + userData.uid + " created successfully!");
                user = firebase.auth().currentUser;
                userIdNum = userData.uid;
                var form = document.getElementById("email-form-2");
                form.reset();
                firebase.database().ref().child("users").child(userData.uid).set({
			      email: userData.email,
                  playlists: 0
			    });
                $rootScope.user = userData;
                vm.login();
                $rootScope.loggedIn = true;
                $rootScope.userProfile = true;
            }).catch(function (error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }
    }

    //login user with spotify
    vm.login = function () {
        Spotify.login(true).then(function (data) {
            Spotify.getCurrentUser().then(function (user) {
                //vm.username = user.id;
                //console.log("vm.username");
                //console.log(user);
            });
        });
    }

}]);