(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('SidebarCtrl', SidebarCtrl);

  SidebarCtrl.$inject = [];

  function SidebarCtrl() {

    /*jshint validthis: true */
    var vm = this;

    vm.showSidebar = true;
    vm.toggle = function() {
      vm.showSidebar = !vm.showSidebar;
    };
  }

})();
