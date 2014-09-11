(function () {
'use strict';
  /**
  * Edits the application
  *
  * @param
  * @returns Angular:Controller
  */

  angular
  .module('app')
  .controller('RosterAddCtrl', RosterAddCtrl);

  /* @ngInject *//*jshint validthis: true */
  function RosterAddCtrl ($scope, $stateParams, $location, RosterRepository) {
    
    $scope.save = function () {
        RosterRepository.create($scope.roster).then(function () {
          $location.path('/admin/rosters');
        });
      };
  
  }

})();