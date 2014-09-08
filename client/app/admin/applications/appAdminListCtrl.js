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
  function AppAdminListCtrl ($scope, ApplicationRepository) {
  
   $scope.applications = ApplicationRepository.getList();
      $scope.delete = function (data) {
        if(window.confirm('Are you sure?')) {
          ApplicationRepository.remove(data).then(function () {
              $scope.applications = ApplicationRepository.getList();
            });
        }
      };
  }

angular
  .module('app')
  .controller('AppAdminListCtrl', AppAdminListCtrl);
})();