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
  function RecruitListCtrl ($scope, $window, RecruitmentRepository) {
    
     $scope.recruits = RecruitmentRepository.getList();
      $scope.delete = function (data) {
        if(window.confirm('Are you sure?')) {
          RecruitmentRepository.remove(data).then(function () {
              $scope.recruits = RecruitmentRepository.getList();
            });
        }
    };

  }

angular
  .module('app')
  .controller('RecruitListCtrl', RecruitListCtrl);
})();