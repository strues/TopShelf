(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.core.controller:NavbarCtrl
     *
     * @description Controller for the Navbar
     *
     */

    function NavbarCtrl(Auth, $location) {
        var vm = this;

        vm.Auth = Auth;

        vm.isCollapsed = true;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.isActive = function(route) {
            return route === $location.path();
        };
    }

    angular
        .module('app.core.directives')
        .controller('NavbarCtrl', NavbarCtrl);
})();
