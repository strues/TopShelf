(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name topshelf.core.controller:NavbarCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.core')
    .controller('NavbarCtrl', NavbarCtrl);

  function NavbarCtrl($scope, Navbar, Auth) {
    $scope.Auth = Auth;

    return Navbar;
  }

})();
