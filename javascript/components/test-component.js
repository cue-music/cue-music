angular.module('app').component('testComponent', {
        template: '<div class="test-component"><h1>Test Component! Hello {{$ctrl.name}}!</h1></div>',
        bindings: {
            name: "="
        },
        controller: function() {
        }
    });
