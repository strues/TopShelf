(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name topshelf.core.controller:NavbarCtrl
   *
   * @description
   *
   */


  function NavbarCtrl($scope, Navbar, Auth) {
    $scope.Auth = Auth;

    return Navbar;
  }

  angular
    .module('topshelf.core')
    .controller('NavbarCtrl', NavbarCtrl);
})();
