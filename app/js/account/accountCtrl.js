(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name account.controller:AccountCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function AccountCtrl() {
    var vm = this;
    vm.ctrlName = 'AccountCtrl';
  }

  angular
    .module('app')
    .controller('AccountCtrl', AccountCtrl);

})();
