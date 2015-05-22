(function () {
  'use strict';
  angular
    .module('app.admin')
    .controller('DashboardCtrl', DashboardCtrl);
  /* @ngInject */
  function DashboardCtrl() {
    var vm = this;
    vm.users = {};

  }

}());
