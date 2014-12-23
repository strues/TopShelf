(function () {
  'use strict';

  function AdminSidebarCtrl() {
    var vm = this;

    vm.oneAtATime = true;

    vm.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }

  angular
    .module('topshelf.admin')
    .controller('AdminSidebarCtrl', AdminSidebarCtrl);
})();
