(function() {

'use strict';

function MainCtrl($scope, Restangular) {

        // Capture the 'this' context of the controller using vm, standing for ViewModel.
        // Use it to avoid having to call bind and unnecessary scoping issues.
    $scope.recruits = Restangular.all('recruits').getList().$object;



   

    }
    
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
})();