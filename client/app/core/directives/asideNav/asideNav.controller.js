(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.core.controller:AsideNavCtrl
     *
     * @description Controller for the Navbar
     *
     */

    function AsideNavCtrl(Auth, $scope, $rootScope, $aside, $location) {
        var vm = this;

        vm.Auth = Auth;

        vm.isCollapsed = false;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.isActive = function(route) {
            return route === $location.path();
        };

        $rootScope.showSide = function() {
            var showNavAside = $aside({
                scope: $scope,
                template: 'app/core/directives/asideNav/asideNav.tpl.html',
                show: false
            });
            showNavAside.$promise.then(function() {
                showNavAside.show();
            });

            vm.showNavAside = showNavAside;

        }
    }
    angular
        .module('app.core.directives')
        .controller('AsideNavCtrl', AsideNavCtrl);
})();
