(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.admin.controller:AsideNavCtrl
     *
     * @description Controller for the Navbar
     *
     */
    angular
        .module('app.admin.directives')
        .controller('AsideNavCtrl', AsideNavCtrl);
    /* @ngInject */
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
                template: 'app/admin/directives/asideNav/asideNav.tpl.html',
                show: false
            });
            showNavAside.$promise.then(function() {
                showNavAside.show();
            });

            vm.showNavAside = showNavAside;

        };
    }

})();
