(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.controller:AdminCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.admin')
    .controller('AdminCtrl', AdminCtrl);

  function AdminCtrl(Authentication) {
    var vm = this;
    vm.ctrlName = 'AdminCtrl';

    Authentication.data = vm.something;
  }

})();
