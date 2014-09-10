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
  .controller('AppAdminEditCtrl', AppAdminEditCtrl);

  /* @ngInject */ /*jshint validthis: true */
  function AppAdminEditCtrl ($scope, $stateParams, $location, ApplicationRepository) {
   
     $scope.application = ApplicationRepository.get($stateParams.id)
       .then(function (data) {
          $scope.application = data;
        });

  $scope.update = function () {
    $scope.application.put().then(function () {
      $location.path('/applications/' + $stateParams.id);
    });
  };
  
  }

})();