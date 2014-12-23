(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name topshelf.core.controller:NavbarCtrl
   *
   * @description
   *
   */


  function NavbarCtrl(Navbar, Auth) {
    var vm = this;

    vm.Auth = Auth;

    return Navbar;
  }

  angular
    .module('topshelf.core')
    .controller('NavbarCtrl', NavbarCtrl);
})();
