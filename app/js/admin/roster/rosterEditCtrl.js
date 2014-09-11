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
  .controller('RosterEditCtrl', RosterEditCtrl);

  /* @ngInject *//*jshint validthis: true */
  function RosterEditCtrl ($scope, $stateParams, $location, RosterRepository) {
    $scope.roster = RosterRepository.get($stateParams.id).then(function (data) {
      $scope.roster = data;
    });
    $scope.save = function () {
      $scope.roster.put().then(function () {
        $location.path('/rosters/' + $stateParams.id);
      });
    };
}

})();