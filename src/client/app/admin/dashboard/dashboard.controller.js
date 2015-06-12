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
    .controller('AdminDashboardCtrl', AdminDashboardCtrl);

  AdminDashboardCtrl.$inject = ['Auth'];
  /* @ngInject */
  function AdminDashboardCtrl(Auth) {
    var vm = this;

    //Page.setTitle('Admin');

    /**
     * Determines if the user is authenticated
     *
     * @returns {boolean}
     */

  }
})();
