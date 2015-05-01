(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name app.core.controller:NavbarCtrl
       *
       * @description Controller for the Navbar
       *
       */
    angular
      .module('app.core')
      .controller('NavbarCtrl', NavbarCtrl);
    /* @ngInject */
    function NavbarCtrl(Auth, $scope, $rootScope, $location) {
        var vm = this;
        vm.Auth = Auth;
        vm.isCollapsed = false;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.isActive = function (route) {
            return route === $location.path();
        };
    }
}());
