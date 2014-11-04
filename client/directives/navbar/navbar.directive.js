(function () {
'use strict';

angular
  .module('app')
  .directive('navbar', navbar);

  function navbar () {
    return {
      controller: 'NavbarCtrl',
      controllerAs: 'Navbar',
      templateUrl: 'directives/navbar/navbar.html',
      restrict: 'EA'
    };
  };
})();

