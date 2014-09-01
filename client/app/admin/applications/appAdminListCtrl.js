(function () {
'use strict';
  /**
  * Displays a list of all the applications
  * Provides delete functioonality
  * 
  * @param
  * @returns Angular:Controller
  */

  angular
  .module('app')
  .controller('AppAdminListCtrl', AppAdminListCtrl);

  /* @ngInject */
  function AppAdminListCtrl (ApplicationRepository) {
    var vm = this;
    

   vm.applications = ApplicationRepository.getList();
  vm.delete = function (data) {
    if(window.confirm('Are you sure?')) {
      ApplicationRepository.remove(data).then(function () {
          vm.applications = ApplicationRepository.getList();
        });
    };
  };
  }

})();