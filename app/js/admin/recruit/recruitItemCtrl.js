(function () {
'use strict';
  /**
  * Displays a detailed view of the selected application
  *
  * @param
  * @returns Angular:Controller
  */



  /* @ngInject */
  function RecruitItemCtrl ($scope, $stateParams, RecruitmentRepository) {
    $scope.recruit = RecruitmentRepository.get($stateParams.id).then(function (data) {
      $scope.recruit = data;
    });
  }
  
angular
  .module('app')
  .controller('RecruitItemCtrl', RecruitItemCtrl);
})();