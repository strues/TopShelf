(function () {
    'use strict';

  /**
   * @ngdoc directive
   * @name admin.directive:navbar
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   *
   */

    function adminNavbar() {
        return {
      restrict: 'EA',
      templateUrl: 'app/admin/directives/admin.navbar/admin.navbar.tpl.html',
      controller: 'AdminNavbarCtrl',
      controllerAs: 'adminNav'
    };
    }

    angular
        .module('topshelf.admin.directives')
        .directive('adminNavbar', adminNavbar);
})();
