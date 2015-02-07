(function () {
    'use strict';

  /**
   * @ngdoc directive
   * @name core.directive:navbar
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   *
   */
    angular
        .module('app.core.directives')
        .directive('navbar', navbar);

    function navbar() {
        return {
          restrict: 'EA',
          templateUrl: 'app/core/directives/navbar/core.navbar.tpl.html',
          controller: 'NavbarCtrl',
          controllerAs: 'vm'
      };
    }
})();
