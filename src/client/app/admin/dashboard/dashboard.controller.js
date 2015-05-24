(function () {
  'use strict';
  angular
    .module('app.admin')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = [];
  /* @ngInject */
  function DashboardCtrl() {
    var vm = this;
    vm.users = {};

  }

}());
