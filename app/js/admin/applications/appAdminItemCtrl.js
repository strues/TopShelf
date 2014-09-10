(function () {
'use strict';
  /**
  * Displays a detailed view of the selected application
  *
  * @param
  * @returns Angular:Controller
  */

  angular
  .module('app')
  .controller('AppAdminItemCtrl', AppAdminItemCtrl);

  /* @ngInject *//*jshint validthis: true */
  function AppAdminItemCtrl ($scope, $stateParams, ApplicationRepository) {
 
   $scope.application = ApplicationRepository.get($stateParams.id)
      .then(function (data) {
        $scope.application = data;
      });
  }

})();