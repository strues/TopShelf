(function() {

'use strict';

function MainCtrl(cfpLoadingBar) {

        // Capture the 'this' context of the controller using vm, standing for ViewModel.
        // Use it to avoid having to call bind and unnecessary scoping issues.
        var vm = this;

        vm.someObject = 'Some value';

        vm.stuff = [];

        vm.start = function() {
      cfpLoadingBar.start();
    };

    vm.complete = function () {
      cfpLoadingBar.complete();
    }


   

    }
    
  angular.module('app')
    .controller('MainCtrl', MainCtrl);
})();