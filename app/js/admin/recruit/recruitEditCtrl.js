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
  .controller('RecruitEditCtrl', RecruitEditCtrl);

  /* @ngInject *//*jshint validthis: true */
  function RecruitEditCtrl ($scope, $stateParams, $location, RecruitmentRepository) {
    $scope.recruit = RecruitmentRepository.get($stateParams.id).then(function (data) {
      $scope.recruit = data;
    });
    $scope.save = function () {
      $scope.recruit.put().then(function () {
        $location.path('/recruits/' + $stateParams.id);
      });
    };
}

})();