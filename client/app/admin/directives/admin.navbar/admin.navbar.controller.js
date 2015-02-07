(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name app.core.controller:AdminNavbarCtrl
   *
   * @description
   *
   */

    function AdminNavbarCtrl(Auth) {
        var adminNav = this;

        adminNav.Auth = Auth;
    }

    angular
        .module('app.admin.directives')
        .controller('AdminNavbarCtrl', AdminNavbarCtrl);
})();
