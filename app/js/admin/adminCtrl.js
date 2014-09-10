(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.controller:AdminCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function AdminCtrl() {
    var vm = this;
    vm.ctrlName = 'AdminCtrl';
  }

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

})();
