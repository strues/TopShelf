(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.core.controller:TopBarCtrl
     *
     * @description Controller for the Navbar
     *
     */

    angular
        .module('app.core.directives')
        .controller('TopBarCtrl', TopBarCtrl);

    function TopBarCtrl(Auth, $scope, $rootScope, $aside, $location) {
        var vm = this;

        vm.Auth = Auth;

        vm.isCollapsed = false;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.isActive = function(route) {
            return route === $location.path();
        };

        vm.toggleAside = function () {
          $rootScope.visible = true;
        };

    }
})();
