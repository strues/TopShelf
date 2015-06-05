(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.admin.AdminDashboardCtrl
   * @description
   * Controller
   */
  angular
    .module('app.admin')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = [];
  /* @ngInject */
  function UserCtrl() {
    var vm = this;
    vm.whatever = 'thiscrtl';
  }
})();
