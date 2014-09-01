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

  /* @ngInject */
  function AppAdminEditCtrl ($stateParams, $location, ApplicationRepository) {
    var vm = this;
    
     vm.application = ApplicationRepository.get($stateParams.id)
       .then(function (data) {
          vm.application = data;
        });

  vm.update = function () {
    vm.application.put().then(function () {
      $location.path('/applications/' + $stateParams.id);
    });
  };
  
  }

})();