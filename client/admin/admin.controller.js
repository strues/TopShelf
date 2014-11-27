(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.controller:AdminCtrl
   *
   * @description
   *
   */


  function AdminCtrl() {
    var vm = this;

    vm.thing = [];

  }

  angular
    .module('topshelf.admin')
    .controller('AdminCtrl', AdminCtrl);
})();
