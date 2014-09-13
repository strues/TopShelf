(function () {
'use strict';
  /**
  * Displays a detailed view of the selected application
  *
  * @param
  * @returns Angular:Controller
  */



  /* @ngInject */
  function RosterItemCtrl ($scope, $stateParams, RosterRepository) {
    $scope.roster = RosterRepository.get($stateParams.id).then(function (data) {
      $scope.roster = data;
    });
  }
  
angular
  .module('app')
  .controller('RosterItemCtrl', RosterItemCtrl);
})();