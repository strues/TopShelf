(function() {

'use strict';

function MainCtrl() {

        // Capture the 'this' context of the controller using vm, standing for ViewModel.
        // Use it to avoid having to call bind and unnecessary scoping issues.
        var vm = this;

        vm.someObject = 'Some value';

        vm.stuff = [];


   

    }
    
  angular.module('app')
    .controller('MainCtrl', MainCtrl);
})();