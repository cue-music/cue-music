var firebase = require("firebase");
angular.module('app').controller("SigninController", [function () {
    var vm = this
    vm.showSignup = false;
    vm.signin = function () {
        console.log("signin");
        firebase.auth().signInWithEmailAndPassword(vm.signinEmail, vm.signinPwd).then(function (userData) {
            var form = document.getElementById("email-form");
            form.reset();
            console.log(userData);
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
                console.log("User " + userData.uid + " created successfully!");
                user = firebase.auth().currentUser;
                userIdNum = userData.uid;
                var form = document.getElementById("email-form-2");
                form.reset();
            }).catch(function (error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }
    }
}]);