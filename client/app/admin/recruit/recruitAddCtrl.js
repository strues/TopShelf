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
  .controller('RecruitAddCtrl', RecruitAddCtrl);

  /* @ngInject */
  function RecruitAddCtrl ($scope, $stateParams, $location, RecruitmentRepository) {
    
    $scope.save = function () {
        RecruitmentRepository.create($scope.recruit).then(function () {
          $location.path('/admin/recruits');
        });
      };
  
  }

})();