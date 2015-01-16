(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name topshelf.core.controller:AdminNavbarCtrl
   *
   * @description
   *
   */

    function AdminNavbarCtrl(Auth) {
        var adminNav = this;

        adminNav.Auth = Auth;
    }

    angular
        .module('topshelf.admin.directives')
        .controller('AdminNavbarCtrl', AdminNavbarCtrl);
})();
