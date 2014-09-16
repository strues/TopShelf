(function () {
'use strict';
  /**
  * Displays a list of all the applications
  * Provides delete functioonality
  * 
  * @param
  * @returns Angular:Controller
  */

  /* @ngInject */
  function RosterCtrl ($scope, $window, Restangular, RosterRepository) {
    
$scope.rosters = RosterRepository.getList();
      $scope.delete = function (data) {
        if(window.confirm('Are you sure?')) {
          RosterRepository.remove(data).then(function () {
              $scope.rosters = RosterRepository.getList();
            });
        }
      };
}

angular
  .module('app')
  .controller('RosterCtrl', RosterCtrl);
})();