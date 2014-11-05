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
     <example module="core">
       <file name="index.html">
        <navbar></navbar>
       </file>
     </example>
   *
   */
  angular
    .module('topshelf.core')
    .directive('navbar', navbar);

  function navbar() {
     return {
      controller: 'NavbarCtrl',
      controllerAs: 'Navbar',
      templateUrl: 'core/navbar/navbar.tpl.html',
      restrict: 'EA'
    };
  }

})();
