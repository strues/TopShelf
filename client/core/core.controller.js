(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name core.controller:CoreCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.core')
    .controller('CoreCtrl', CoreCtrl);

  function CoreCtrl() {
    var vm = this;
    vm.ctrlName = 'CoreCtrl';
  }

})();
