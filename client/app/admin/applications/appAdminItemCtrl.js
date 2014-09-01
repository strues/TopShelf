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

  /* @ngInject */
  function AppAdminItemCtrl ($stateParams, ApplicationRepository) {
    var vm = this;
    

   vm.application = ApplicationRepository.get($stateParams.id)
      .then(function (data) {
      vm.application = data;
      });
  }

})();